const seq = require('sequelize')
const configuration = require('../config/configuration')

const sequelize = new seq(
    configuration.db.schema,
    configuration.db.username,
    configuration.db.password,
    {
        host: configuration.db.host,
        dialect: configuration.db.dialect,
        time_zone: configuration.db.timezone,
        logging: configuration.db.logging
    }
)

module.exports = sequelize