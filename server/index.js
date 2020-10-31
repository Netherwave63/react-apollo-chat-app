const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
require('dotenv').config()

const { models, sequelize } = require('./models')
const schema = require('./schema')
const resolvers = require('./resolvers')
const createUsersWithMessages = require('./seed')

const app = express()

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: async () => ({
        models,
        me: await models.User.findByLogin('John Doe')
    })
})

server.applyMiddleware({ app, path: '/graphql' })

// Connect to the database
// Then start the server
const PORT = process.env.PORT || 3000

const eraseDatabaseOnSync = process.env.NODE_ENV === 'DEVELOPMENT'

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
    if (eraseDatabaseOnSync) {
        createUsersWithMessages(models)
    }
    app.listen(PORT, () => {
        console.log(`App listening at port ${PORT}`)
    })
})