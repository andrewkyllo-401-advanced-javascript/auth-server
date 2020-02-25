'use strict';

// require express
const express = require('express');

// App-level middleware
const app = express();
app.use(express.json());
const basicAuth = require('./middleware/basic-auth');

// models
const User = require('./models/user');

// Routes
app.post('/signup', async (req, res) => {
  const newUser = new User(req.body);
});







app.get('/this_will_error', (req, res) => {
  throw new Error('Internal server error.');
});


// exports the server
let isRunning = false;
module.exports = {
  server: app,
  start: function (port) {
    if (!isRunning) {
      app.listen(port, () => {
        isRunning = true;
        console.log(`Server is listening on port ${port}`);
      });
    } else {
      console.error('Server is already running!')
    }
  },
};
