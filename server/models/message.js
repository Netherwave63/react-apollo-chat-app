const message = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })

    Message.associate = (models) => {
        Message.belongsTo(models.User, {
            foreignKey: 'userId',
        })
    }

    return Message
}

module.exports = message