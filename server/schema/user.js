const { gql } = require('apollo-server-express')

const userSchema = gql`
    extend type Query {
        me: User
        user(id: ID!): User
        users: [User!]
    }

    extend type Mutation {
        createUser(username: String!): User!
        deleteUser(id: ID!): Boolean!
    }

    type User {
        id: ID!
        username: String!
        messages: [Message!]!
    }
`

module.exports = userSchema