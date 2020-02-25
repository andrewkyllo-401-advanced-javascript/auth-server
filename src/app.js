'use strict';

// require express
const express = require('express');

// App-level middleware
const app = express();
app.use(express.json());

// exports the server
let isRunning = false;
module.exports = {
  server: app,
  start: function (port) {
    if (!isRunning) {
      app.listen(port, () => {
        isRunning = true;
        console.log(`Server is listening on port ${port}`);
      })
    } else {
      console.error('Server is already running!')
    }
  }
}