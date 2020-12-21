const express = require('express');
const userRouter = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// get all users

userRouter.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
})

// get users id
userRouter.get('/id/:id', async (req, res) => {
  try {
    const user = await User.findOne({_id: req.params.id })
    res.json(user)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
})

// login
userRouter.post('/login', async (req, res) => {
  const user = await User.findOne({username: req.body.username});

  if (user) {
    const validPass = await bcrypt.compare(req.body.password, user.password);

    if (validPass) {
      const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);

      const verifiedUser = await jwt.verify(token, process.env.TOKEN_SECRET);
      const userId = verifiedUser._id;

      res.header('user-id', userId).send(userId);

    } else return res.status(400).send('Password is incorrect');

  } else return res.status(400).send('Username incorrect');
})


// Create new user
userRouter.post('/', async (req, res) => {

  // checking if Name is unique
  const nameExists = await User.findOne({username: req.body.username});
  if (nameExists) return res.status(400).send('Name already exists')

  // Hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = new User({
    username: req.body.username,
    password: hashedPassword,
  })

  try {
    const result = await newUser.save()
    res.status(201).json(result)
  } catch (err) {
    res.status(400).json({message: err.message})
  }
})


module.exports = userRouter;
