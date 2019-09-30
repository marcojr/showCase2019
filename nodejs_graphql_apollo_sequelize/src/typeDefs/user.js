import { gql } from 'apollo-server-express'
export default gql`
    extend type Query {
        getUser : User!
    },
    extend type Mutation {
        createUser(
            email: String!, 
            password: String!, 
            firstName: String!,
            lastName: String!,
            displayName: String,
            picture: String,
            phone: String!,
            gender: String!,
            dob: String!) : LoginResult
        terminateUser : Boolean
        createPhoneChallenge(
            phone: String!
        ) : PartialLogin!
    },
    type User {
        id: String!,
        email: String!,
        firstName: String!,
        lastName: String!,
        displayName: String!,
        createdOn: String!,
        dob:String,
        phone: String,
        gender: String,
        loginProvider: String!,
        picture: String
    }
`