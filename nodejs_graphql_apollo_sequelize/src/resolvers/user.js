import User from '../models/user'
import uuidv4 from "uuid/v4"
import SysVerify from '../models/sysVerify'
import ErrorTypes from '../errorTypes'
import { UserInputError } from 'apollo-server-express'
import { generateJwtToken, generateNumericCode } from '../libs/utils'
export default {
    Query: {
        getUser:(root, arg, context) => { 
            if(!context.USER_id) {
                throw new UserInputError(ErrorTypes.ERROR_INVALID_SESSION)
            }
            return User.findOne({ where : { id: context.USER_id }})
        },
        countUsers: async(root, arg, context) => {
            let countEmail
            let countPhone
            if(arg.email) {
                const find = { where : { email: arg.email }}
                countEmail = User.count(find)
            }
            if(arg.phone) {
                const find = { where : { phone: arg.phone }}
                countPhone = User.count(find)
            }
            return {
                emailFound: countEmail,
                phoneFound: countPhone
            }
        }
    },
    Mutation: {
        createUser: async(root, arg) => {
            arg.id = uuidv4()
            arg.loginProvider = 'UEP'
            const user = await User.create(arg)
            if(user) {
                const jwtString = generateJwtToken(720,arg.id)
                return {
                    user,
                    token: jwtString,
                    expiresOn: '720h',
                    loginCompleted: true,
                    USER_id: arg.id
                }
            }
        },
        terminateUser : async (root, arg, context, info) => {
            if(!context.USER_id) {
                throw new UserInputError(ErrorTypes.ERROR_INVALID_SESSION)
            }
            await SysInvalidSession.create({ token: context.authToken, expiresOn })
            await User.destroy({where: {id: context.USER_id}})
            return true
        },
        createPhoneChallenge : async (root, arg) => {
            const user = await User.findOne({where: {phone: arg.phone}})
            if(user) {
                const code = generateNumericCode(4)
                const expiresOn = new Date().getTime() + 60 * 60000
                await SysVerify.destroy({where : {USER_Id: user.id}})
                SysVerify.create({
                    USER_id: user.id,
                    verificationType: "P",
                    target: arg.phone,
                    status : "AWA",
                    code, expiresOn: new Date(expiresOn).toISOString()
                })
                return {
                    USER_id: user.id,
                    expiresOn: new Date(expiresOn).toISOString()
                }
            } else {
                throw new UserInputError(ErrorTypes.ERROR_INVALID_CREDENTIALS)
            }  
        }
    }
}