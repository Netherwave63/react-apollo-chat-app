const userResolvers = {
    Query: {
        me: (parent, args, { me }) => {
            return me
        },
        user: async (parent, { id }, { models }) => {
            return await models.User.findOne({ where: { id } })
        },
        users: async (parent, args, { models }) => {
            return await models.User.findAll()
        },
    },

    Mutation: {
        createUser: async (parent, { username }, { models }) => {
            return await models.User.create({ username })
        },
        deleteUser: async (parent, { id }, { models }) => {
            return await models.User.destroy({ where: { id } })
        },
    },

    User: {
        messages: async (user, args, { models }) => {
            return await models.Message.findAll({
                where: {
                    userId: user.id
                }
            }) 
        }
    },
}

module.exports = userResolvers