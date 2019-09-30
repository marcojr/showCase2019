import Sequelize from 'sequelize'
import DB from '../libs/db'

export default DB.define('SYS_INVALID_SESSION',
    {
        token: { type: Sequelize.STRING, allowNull: false, primaryKey: true , 
            validate : { 
                len: [10,512] 
            }
        },
        expiresOn: { type: Sequelize.STRING, allowNull: false }
    },
    {
        freezeTableName: true,
        timestamps: false
    })
