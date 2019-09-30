import { gql } from 'apollo-server-express'
export default gql`
    extend type Mutation {
        login(
                email: String, 
                password: String, 
                token: String,
                provider: String) : LoginResult!
        completeLogin(
            code: String!,
            USER_id: String!
        ) : LoginResult
        logoff : Boolean!
    }
    type LoginResult {
        user: User,
        USER_id: String,
        loginCompleted: Boolean!,
        expiresOn: String,
        token: String
    }
    type PartialLogin {
        USER_id: String!,
        expiresOn: String
    }
`