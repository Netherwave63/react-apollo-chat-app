const messageResolvers = {
    Query: {
        message: async (parent, { id }, { models }) => {
            return await models.Message.findOne({ where: { id } })
        },
        messages: async (parent, args, { models }) => {
            return await models.Message.findAll()
        }
    },

    Mutation: {
        createMessage: async (parent, { text }, { me, models }) => {
            return await models.Message.create({ 
                text,
                userId: me.id,
            })
        },
        deleteMessage: async (parent, { id }, { models }) => {
            return await models.Message.destroy({ where: { id } })
        },
    },

    Message: {
        user: async (message, args, { models }) => {
            return await models.User.findOne({ where: { id: message.userId } })
        },
    },
}

module.exports = messageResolvers