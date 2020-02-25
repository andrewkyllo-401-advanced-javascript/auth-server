'use strict';
// require .env variables
require('dotenv').config();
// require mongoose
const mongoose = require('mongoose');
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// Pull vairables from .env
const { MONGODB_URI, PORT } = process.env;
// connect to mongo
mongoose.connect(MONGODB_URI, mongooseOptions, () => {
  console.log('Connected to MongoDB.');
})

// start express server
const server = require('./src/app');
console.log(PORT)
server.start(PORT);
