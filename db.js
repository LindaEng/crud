const { Sequelize, DataTypes, Model } = require('sequelize')

//create an instance of the database -> db
const db = new Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: './myMusic.sqlite',
    logging: false
})

module.exports = { db, DataTypes, Model }