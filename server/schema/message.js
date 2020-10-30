const { gql } = require('apollo-server-express')

const messageSchema = gql`
    extend type Query {
        message(id: ID!): Message
        messages: [Message!]
    }

    extend type Mutation {
        createMessage(text: String!): Message!
        deleteMessage(id: ID!): Boolean!
    }

    type Message {
        id: ID!
        text: String!
        user: User!
    }
`

module.exports = messageSchema