const express = require('express');
const songRouter = express.Router();
const songSchema = require('../models/song');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb)  => {
      cb(null, 'src/assets/audio');
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, originalname);
  }
})

const upload = multer({ storage });


// Upload song
songRouter.post('/upload/song', upload.single('song'), (req, res) => {
  return res.json(req.file)
})


// Create one song
songRouter.post('/new', async (req, res) => {

  const newSong = new songSchema({
    title: req.body.title,
    author: req.body.author,
    duration: req.body.duration,
    background: req.body.background,
    audioUrl: req.body.audioUrl,
  })

  try {
    const result = await newSong.save()
    res.status(201).json(result)
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
    const song = await songSchema.findOne({_id: req.params.id })
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
