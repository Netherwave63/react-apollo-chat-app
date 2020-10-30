const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')

const users = {
    1: {
        id: 1,
        username: 'John Doe'
    }
}

const schema = gql`
    type Query {
        me: User
    }

    type User {
        id: ID!
        username: String!
    }
`

const resolvers = {
    Query: {
        me: () => {
            return users[1]
        }
    }
}

const app = express()

const server = new ApolloServer({
    typeDefs: schema,
    resolvers
})

server.applyMiddleware({ app, path: '/graphql' })

// Start the server
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`)
})
