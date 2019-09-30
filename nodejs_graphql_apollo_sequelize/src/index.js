import { ApolloServer } from 'apollo-server-express'
import { UserInputError } from 'apollo-server-express'
import DB from './libs/db'
import jwt from 'jsonwebtoken'
import express from 'express'
import { JWT_SECRET } from './secrets'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import ErrorTypes from './errorTypes'
import SysInvalidSession from './models/sysInvalidSession'
import { generateBlobUrl } from './libs/utils'
const IN_PROD = process.env.NODE_ENV === 'production'

const port = IN_PROD ? 5000 : 3000

const app = express()

app.disable('x-powered-by')

app.get('/setPictureForUpload', function (req, res) {
  const format = req.query.format.toLowerCase()
  if(format !== 'jpg' && format !== 'png') {
    res.send(403,ErrorTypes.ERROR_INVALID_PICTURE_FORMAT)
  } else {
    res.json({uri: generateBlobUrl(format)})
  }
})


/*
  I don't advice... Relational databases must be formated to business, not to applications
  Also...Sequelize made a lot of bizarre mistakes when working with MSSQL. For example...
  UUID ---> Become Char(36) on Database
  And you will need to ammend the model to be compatible.
  Use the mssql.sql file to generate the database instead.
  DB.sync({force: true}, err => {
    console.log(err)
})*/

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  context: async ({ req }) => {
    const token = req.headers.authorization
    const noToken  = {
        USER_id: undefined,
        CLIENT_id: undefined,
        authToken: undefined
      }
    if (!token) { return noToken }
    const splitToken = token.split(' ')[1] || undefined
    if(!splitToken) { return noToken }
    let jwtDecoded
    try { jwtDecoded = await jwt.verify(splitToken, JWT_SECRET) }
    catch { return noToken }
    if (Date.now() >= jwtDecoded.exp * 1000) {
      throw new UserInputError(ErrorTypes.ERROR_INVALID_SESSION)
    }
    const invalid = await SysInvalidSession.findOne({ where : { token : splitToken }})
    return invalid ? noToken : {
      USER_id: jwtDecoded.USER_id,
      authToken: splitToken
    }
  }
})
server.applyMiddleware({ app }); 
app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
)


