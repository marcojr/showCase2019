import Sequelize from 'sequelize'
import { UserInputError } from 'apollo-server-express'
import DB from '../libs/db'
import ErrorTypes from '../errorTypes'
import md5 from 'md5'
export default DB.define('USER',
    {
        id: { type: Sequelize.UUIDV4, allowNull: false, primaryKey: true },
        oauth2Id: { type: Sequelize.STRING, allowNull: true, validate: { len: [4, 64] } },
        firstName: { type: Sequelize.STRING, allowNull: false, validate: { len: [2, 50] } },
        lastName: { type: Sequelize.STRING, allowNull: false, validate: { len: [2, 64] } },
        displayName: { type: Sequelize.STRING, allowNull: true,  validate: { len: [2, 100] } },
        password: { type: Sequelize.STRING, allowNull: true },
        phone: {
            type: Sequelize.STRING, allowNull: false,
            validate: {
                len: [4, 50]
            }
        },
        email: {
            type: Sequelize.STRING, allowNull: false,
            validate: {
                isEmail: true
            }
        },
        gender: {
            type: Sequelize.STRING, allowNull: true,
            validate: {
                isIn: {
                    args: [['M', 'F', 'U']],
                    msg: ErrorTypes.ERROR_INVALID_GENDER
                }
            }
        },
        dob: { type: Sequelize.DATEONLY, allowNull: true, 
            validate: { 
                is : {
                    args: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,
                    msg: ErrorTypes.ERROR_INVALID_FORMAT
                }
            }
         },
        picture: { type: Sequelize.STRING, allowNull: true, validate : { len: [12, 256]} },
        loginProvider: { type: Sequelize.STRING, allowNull: false, 
            validate : {
                isIn: {
                    args: [['UEP', 'OGO', 'OFB']],
                    msg : ErrorTypes.ERROR_INVALID_LOGIN_PROVIDER
                }
            }
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
        hooks: {
            async beforeCreate(user) {
                user.password = md5(user.password)
                if(!user.displayName) {
                    user.displayName = user.firstName + ' ' + user.lastName
                }
            }
        }
    })
