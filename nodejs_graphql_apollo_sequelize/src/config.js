import { PROD_DB_USERNAME, PROD_DB_PASSWORD, PROD_DB_NAME, PROD_DB_SERVER,
     NEXMO_KEY, NEXMO_SECRET } from './secrets'
export const ThisServer = 'http://localhost:3000'
export const DbConnection = {
    prod : {
        user: PROD_DB_USERNAME,
        password: PROD_DB_PASSWORD,
        server: PROD_DB_SERVER,
        database : PROD_DB_NAME,
        options: {
            encrypt: true
        }
    },
    dev : {
            user: 'mrdev',
            password: 'abc123',
            server: '192.168.46.174',
            database : 'Users_Light',
            options: {
                encrypt: true
            }
    },
    use: 'prod'
}
export const smsProviderUrl = 'https://rest.nexmo.com/sms/json?api_key=' + NEXMO_KEY + '&api_secret=' + NEXMO_SECRET