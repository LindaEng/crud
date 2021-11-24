//Express
const express = require('express')
const app = express()
const PORT = 3000
const { body, validationResult } = require('express-validator') 

const seed = require('./seed')
const { db } = require('./db')
const { Music } = require('./Models/Music')


app.use(express.json())
//invoke our seed function
seed()


//ROUTES

//EXERCISE: 
    //1. Check if routes are RESTful [x]
    //2. Req.body is not referencing the payload from the client side... it's currently {} [x]
    //3. A user only wants a specific genre of music, write a RESTful route/endpoint that will return the specified genre

//C - post
app.post('/music', async (req, res) => {
    let newSong = req.body
    await Music.create(newSong)
    res.send(`New song added~`)
})

//Express validator - Provides functions/methods that will help us validate specific types of information that comes from the client side. 
//Demo - Create a new user - username - password
//Check - username has the correct email format xyz@email.com
//Check - password needs to be at least 5 characters long
//Fails - Returns an error message
//Passes - Returns a 201 status, return json with the new user

//C-Create-POST R U D

app.post('/user',
    body('username').isEmail(),
    body('password').isLength({ min: 5 }),
    async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const newUser = {
        username: req.body.username,
        password: req.body.password
    }
    res.send(`A new user has been created`).json({newUser})
})

//Exercise 
// 1. create a User model
// 2. create a user.json file
// 3. make sure you seed the user information into your db
// 4. Write a RESTful route that will validate the new user info and add it to the DB.

//R - get
app.get('/music', async (req, res) => {
    let allMusic = await Music.findAll()
    res.json({allMusic})
})

app.get('/music/:id', async (req, res) => {
    let id = req.params.id
    let oneSong = await Music.findByPk(id)
    res.json({oneSong})
})

//Challenge: A user only wants a specific genre of music, write a RESTful route/endpoint that will return the specified genre
app.get('/music/genre/:name', async (req, res) => {
    let name = req.params.name
    let songs = await Music.findAll({
        where: {
            "genre": name
        }
    })
    res.json({songs})
})


//U - put
app.put('/music/:id', async (req, res) => {
    let id = req.params.id
    let songToUpdate = await Music.findByPk(id)
    let updatedSong = await songToUpdate.update(req.body)
    if(updatedSong) {
        res.status(201).send(`Song has been updated!`)
    } 
})

//D - delete
app.delete('/music/:id', async (req, res) => {
    let id = req.params.id
    let songToDelete = await Music.findByPk(id)
    await songToDelete.destroy()
    res.status(201).send(`Song has been deleted!`)
})


app.listen(PORT, () => {
    console.log(`Your server is now listening to port: ${PORT}`)
})