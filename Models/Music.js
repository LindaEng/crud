const { db, DataTypes, Model } = require('../db')

//create a Music child class from the Model parent class
class Music extends Model {

}

Music.init({
    name: DataTypes.STRING,
    genre: DataTypes.STRING
},{
    sequelize: db
})

module.exports = { Music }