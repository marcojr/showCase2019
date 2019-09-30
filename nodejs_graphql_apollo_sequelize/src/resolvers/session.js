import jwt from 'jsonwebtoken'
import Sequelize from 'sequelize'
import uuidv4 from "uuid/v4"
import md5 from 'md5'
import { UserInputError } from 'apollo-server-express'
import ErrorTypes from '../errorTypes'
import { JWT_SECRET } from '../secrets'
import User from '../models/user'
import SysInvalidSession from '../models/sysInvalidSession'
import SysVerify from '../models/sysVerify'
import SvcGoogle from '../services/svcGoogle'
import SvcFacebook from '../services/svcFacebook'
import { cleanExpiredRecords, generateJwtToken } from '../libs/utils'
export default {
    Mutation: {
        login: async (root, arg) => {
            const validProviders = ['UEP', 'OGO', 'OFB']
            if (validProviders.filter(flt => flt === arg.provider).length === 0) {
                throw new UserInputError(ErrorTypes.ERROR_INVALID_LOGIN_PROVIDER)
            }
            let user
            if (arg.provider === 'UEP') {
                const pass = md5(arg.password)
                user = await User.findOne({
                    where: {
                        email: arg.email,
                        password: pass,
                        loginProvider: 'UEP'
                    }
                })
                if (!user) { throw new UserInputError(ErrorTypes.ERROR_INVALID_CREDENTIALS) }
                const jwtString = generateJwtToken(720,user.id)
                return {
                    user,
                    token: jwtString,
                    expiresOn: '720h',
                    loginCompleted: true,
                    USER_id: user.id
                }
            }
            if (arg.provider === 'OGO' || arg.provider === 'OFB') {
                let response
                if(arg.provider === 'OGO') {
                    response = await SvcGoogle(arg.token)
                }
                if(arg.provider === 'OFB') {
                    response = await SvcFacebook(arg.token)
                }
                if(!response.successfully) {
                    throw new UserInputError(ErrorTypes.ERROR_INVALID_CREDENTIALS)
                }
                if (response.oauth2Id) {
                    const check = await User.findOne({
                        where: {
                            loginProvider: arg.provider ,
                            oauth2Id: response.oauth2Id
                        }
                    })
                    if (check) {
                        await User.update(
                            {
                                firstName: response.firstName,
                                lastName: response.lastName,
                                displayName: response.displayName,
                                password: response.password,
                                email: response.email,
                                picture: response.picture
                            }, { where: { id: check.id } 
                        })
                        user = await User.findOne({id: check.id})
                    } else {
                        const newId = uuidv4()
                        user = await User.create(
                            {
                                id: newId,
                                loginProvider: arg.provider ,
                                oauth2Id: response.oauth2Id,
                                firstName: response.firstName,
                                lastName: response.lastName,
                                displayName: response.displayName,
                                email: response.email,
                                picture: response.picture
                            }
                        )
                    }
                } else {
                    throw new UserInputError(ErrorTypes.ERROR_INVALID_CREDENTIALS)
                }
            }
            const jwtString = generateJwtToken(720,user.id)
            return {
                user,
                token: jwtString,
                expiresOn: '720h',
                loginCompleted: true,
                USER_id: user.id
            }
        },
        completeLogin: async (root, arg) => {
            await cleanExpiredRecords()
            const checkUser = await SysVerify.findOne({
                where: {
                    USER_id: arg.USER_id,
                    code: arg.code,
                    expiresOn: {
                        [Sequelize.Op.gte]: new Date(Date.now()).toISOString()
                    }
                }
            })
            if (checkUser) {
                const user = await User.findOne({
                    where: {
                        id: arg.USER_id,
                        loginProvider: 'UEP'
                    }
                })
                SysVerify.destroy({ where: { USER_Id: user.id } })
                const jwtString = generateJwtToken(720,user.id)
                return { user, token: jwtString, expiresOn: '720h' }
            } else {
                throw new UserInputError(ErrorTypes.ERROR_INVALID_CREDENTIALS)
            }
        },
        logoff: async (root, arg, context) => {
            if (!context.USER_id) {
                return false
            } else {
                const jwtDecoded = await jwt.verify(context.authToken, JWT_SECRET)
                const expiresOn = new Date(jwtDecoded.exp * 1000).toISOString()
                // Perform table maintenance by deleting expired sessions.
                cleanExpiredRecords()
                SysInvalidSession.create({ token: context.authToken, expiresOn })
                return true
            }
        }
    }
}
