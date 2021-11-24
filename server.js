//Express
const express = require('express')
const app = express()
const PORT = 3000

const seed = require('./seed')
const { db } = require('./db')
const { Music } = require('./Models/Music')

//invoke our seed function
seed()

app.use(express.json())
//ROUTES

//EXERCISE: Clean up the code

//C - post
app.post('/getmusic', async (req, res) => {
    let newSong = req.body
    await Music.create(newSong)
    res.send(`New song added~`)
})

//Express validator


//R - get
app.get('/music', async (req, res) => {
    let allMusic = await Music.findAll()
    res.json({allMusic})
})

app.get('/music/id', async (req, res) => {
    let id = req.params.id
    let oneSong = await Music.findByPk(id)
    res.json({oneSong})
})

//Challenge: A user only wants a specific genre of music, write a RESTful route/endpoint that will return the specified genre



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