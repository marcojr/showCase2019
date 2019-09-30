import Sequelize from 'sequelize'
import { UserInputError } from 'apollo-server-express'
import DB from '../libs/db'
import SvcSendCode from '../services/svcSendCode'
import ErrorTypes from '../errorTypes'
export default DB.define('SYS_VERIFY',
    {
        USER_id: { type: Sequelize.STRING, allowNull: false, validate : { len: 36 } },
        code: { type: Sequelize.STRING, allowNull: false, validate: { len: 4 } },
        expiresOn: { type: Sequelize.STRING, allowNull: false },
        status: { type: Sequelize.STRING, allowNull: false },
        target : { type: Sequelize.STRING, allowNull: false, validate : { len: [4,120] } }
    },
    {
        freezeTableName: true,
        timestamps: false,
        hooks : {
            beforeCreate(ver, options) {
                SvcSendCode(ver.code, ver.target, "MantarayLight", "Your code is $code").then(res => {
                 }).catch(() =>{
                    throw new UserInputError(ErrorTypes.ERROR_SENDING_SMS)
                 })
            }
        }
    })