const createUsersWithMessages = async (models) => {
    await models.User.create(
        {
            username: 'John Doe',
            Messages: [
                { text: 'Read a book' },
                { text: 'Watch a movie' },
            ],
        },
        {
            include: [models.Message]
        }
    )

    await models.User.create(
        {
            username: 'Jane Doe',
            Messages: [
                { text: 'Walk a dog' }
            ]
        },
        {
            include: [models.Message]
        },
    )
}

module.exports = createUsersWithMessages