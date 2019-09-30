import Sequelize from 'sequelize'
import { DbConnection } from '../config'
export default new Sequelize(
    DbConnection[DbConnection.use].database,
    DbConnection[DbConnection.use].user,
    DbConnection[DbConnection.use].password, {
        host: DbConnection[DbConnection.use].server,
        dialect: 'mssql',
        dialectOptions: {
            options: {
                encrypt: true
            }
        }
    })