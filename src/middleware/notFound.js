'use strict';
function notFound (err, req, res, next) {
  console.error('___SERVER ERROR___', err)
  res.status(404).json({ error: err.message });
}

module.exports = notFound;