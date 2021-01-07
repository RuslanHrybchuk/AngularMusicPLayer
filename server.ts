require('dotenv').config();

const bson = require('bson');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const mySongRouter = require('./routes/songRouter');
const myUserRouter = require('./routes/userRouter');
const myImageRouter = require('./routes/imageRouter');

const PORT = process.env.PORT;

const app = express();
app.use(express.static(__dirname));

app.use(cors());
app.use(bodyParser.json());

app.use('/songs', mySongRouter);
app.use('/users', myUserRouter);
app.use('/upload/image', myImageRouter);


mongoose.connect(process.env.DATABASE_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Database connection established'));


app.listen(PORT, () => console.log('Systems online'));


