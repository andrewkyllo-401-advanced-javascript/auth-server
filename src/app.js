'use strict';

// Third part resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
// Prepare the express app
const app = express();
// App-level middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static)



// Routes
const authRouter = require('./routes/authRouter');
app.use(authRouter);






// Catch alls
const notFound = require('./middleware/notFound');
app.use(notFound);
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);
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
      console.error('Server is already running!');
    }
  },
};
