const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  background: {
    type: String,
    required: true
  },
  audioUrl: {
    type: String,
    required: true
  }
})


module.exports = mongoose.model('Song', songSchema)
