const { v4: uuidv4 } = require('uuid')

const messageResolvers = {
    Query: {
        message: (parent, { id }, { models }) => {
            return models.messages[id]
        },
        messages: (parent, args, { models }) => {
            return Object.values(models.messages)
        }
    },

    Mutation: {
        createMessage: (parent, { text }, { me, models }) => {
            const id = uuidv4()

            const message = {
                id,
                text,
                userId: me.id,
            }

            models.messages[id] = message

            return message
        },
        deleteMessage: (parent, { id }, { models }) => {
            const { [id]: message, ...otherMessages } = models.messages

            if (!message) return false

            models.messages = otherMessages

            return true
        },
    },

    Message: {
        user: (message, args, { models }) => {
            return models.users[message.userId]
        },
    },
}

module.exports = messageResolvers