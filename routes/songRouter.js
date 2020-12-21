const express = require('express');
const songRouter = express.Router();
const songSchema = require('../models/song');
const multer = require('multer');
const upload = multer({ dest: '../src/assets/audio' })


// Upload song
songRouter.post('/upload', upload.single('songFile'), (req, res) => {

})


// Create one song
songRouter.post('/', async (req, res) => {
  try {
    const newSong = await songSchema.save()
    res.status(201).json(newSong)
  } catch (err) {
    res.status(400).json({message: err.message})
  }
})


// Get all songs
songRouter.get('/', async (req, res) => {
  try {
    const songs = await songSchema.find()
    res.json(songs)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
})

// Get one song
songRouter.get('/id/:id', async (req, res) => {
  try {
    const song = await songSchema.find({id: req.params.id })
    res.json(song)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
})


// Update one song
songRouter.patch('/:id', (req, res) => {
})

// Delete one song
songRouter.delete('/:id', (req, res) => {
})


module.exports = songRouter;
