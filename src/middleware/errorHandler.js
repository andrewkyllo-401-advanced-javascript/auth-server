'use strict';
function errorHandler (err, req, res, next) {
  res.status(404).json({ error: 'Resource Not Found.' });
}

module.exports = errorHandler;