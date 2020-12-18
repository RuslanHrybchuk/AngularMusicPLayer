const express = require('express');
const router = express.Router();
const songSchema = require('../models/song');


// Get all songs
router.get('/', async (req, res) => {
  try {
    const songs = await songSchema.find()
    res.json(songs)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


// Create one song
router.post('/', async (req, res) => {
  try {
    const newSong = await songSchema.save()
    res.status(201).json(newSong)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})



// Update one song
router.patch('/:id', (req, res) => {
})

// Delete one song
router.delete('/:id', (req, res) => {
})


module.exports = router;
