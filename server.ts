require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const myRouter = require('./routes/router');

const PORT = process.env.PORT;

const app = express();
app.use(express.static(__dirname));

app.use(cors());
app.use(bodyParser.json());

app.use('/songs', myRouter);


mongoose.connect(process.env.DATABASE_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Database connection established'));


app.listen(PORT, () => console.log('Systems online'));


