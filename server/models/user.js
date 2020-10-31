const user = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })

    User.associate = (models) => {
        User.hasMany(models.Message, {
            onDelete: 'CASCADE',
            foreignKey: 'userId',
        })
    }

    User.findByLogin = async (login) => {
        let user = await User.findOne({ where: { username: login }})

        if (!user) {
            user = await User.findOne({ where: { email: login }})
        }

        return user
    }

    return User
}

module.exports = user