const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')

const models = require('./models')
const schema = require('./schema')
const resolvers = require('./resolvers')

const app = express()

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: {
        models,
        me: models.users[1]
    }
})

server.applyMiddleware({ app, path: '/graphql' })

// Start the server
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`)
})