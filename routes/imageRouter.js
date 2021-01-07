const express = require('express');
const imageRouter = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb)  => {
    cb(null, 'src/assets/images');
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, originalname);
  }
})

const upload = multer({ storage });

// Upload image
imageRouter.post('/', upload.single('image'), (req, res) => {
  return res.json(req.file)
})


module.exports = imageRouter;
