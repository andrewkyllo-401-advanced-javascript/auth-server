'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const usersSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String },
  role: { type: String, required: true, default: 'user', enum: ['admin', 'user']},
});

usersSchema.pre('save', async function() {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

usersSchema.methods.generateToken = function() {
  return jwt.sign({ username: this.username, email: this.email }, process.env.SECRET);
};

usersSchema.statics.authenticateBasic = (username, password) => {
  console.log(usersSchema.findOne({ username: username }));
  // return bcrypt.compare(password, )
}


module.exports = mongoose.model('User', usersSchema);