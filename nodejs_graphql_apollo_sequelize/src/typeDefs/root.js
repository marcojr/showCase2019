import { gql } from 'apollo-server-express'
export default gql`
    type Query {
        dummy: String
    }
    type Mutation {
        dummy: String
    }
`