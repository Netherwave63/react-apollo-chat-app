const { v4: uuidv4 } = require('uuid')

const userResolvers = {
    Query: {
        me: (parent, args, { me }) => {
            return me
        },
        user: (parent, { id }, { models }) => {
            return models.users[id]
        },
        users: (parent, args, { models }) => {
            return Object.values(models.users)
        },
    },

    Mutation: {
        createUser: (parent, { username }, { models }) => {
            const id = uuidv4()

            const user = {
                id,
                username,
            }

            models.users[id] = user

            return user
        },
        deleteUser: (parent, { id }, { models }) => {
            const { [id]: user, ...otherUsers } = models.users

            if (!user) return false

            models.users = otherUsers
            models.messages = Object.values(models.messages).filter(message => {
                return message.userId !== id
            }).reduce((obj, message) => ({
                ...obj,
                [message.id]: message
            }), {})

            return true
        },
    },

    User: {
        messages: (user, args, { models }) => {
            return Object.values(models.messages).filter(message => message.userId === user.id)
        }
    },
}

module.exports = userResolvers