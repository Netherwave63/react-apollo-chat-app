const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize(
    process.env.POSTGRES_DATABASE,
    process.env.POSTGRES_USERNAME,
    process.env.POSTGRES_PASSWORD,
    {
        dialect: 'postgres'
    },
)

const modelDefs = [
    require('./user'),
    require('./message'),
    // Add more model definitions here
]

for (let modelDef of modelDefs) {
    modelDef(sequelize, DataTypes)
}

const models = {
    ...sequelize.models
}

Object.keys(models).forEach((key) => {
    if ('associate' in models[key]) {
        models[key].associate(models)
    }
})

module.exports = {
    sequelize,
    models,
}