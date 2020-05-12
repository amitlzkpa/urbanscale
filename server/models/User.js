require('dotenv').config();
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  bio: String,
  image: String,
  permissions: [],
  hash: String,
  salt: String
}, {timestamps: true});

module.exports = mongoose.model('User', UserSchema);