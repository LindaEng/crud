//Express
const express = require('express')
const app = express()
const PORT = 3000

const seed = require('./seed')
const { db } = require('./db')
const { Music } = require('./Models/Music')

//invoke our seed function
seed()

//ROUTES

//C

//R

//U

//D


app.listen(PORT, () => {
    console.log(`Your server is now listening to port: ${PORT}`)
})