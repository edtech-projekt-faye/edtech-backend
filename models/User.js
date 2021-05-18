const mongoose = require('mongoose')
const { Schema } = mongoose

// Create Schema
const UserSchema = new Schema({
  googleId: String,
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  // password: {
  //   type: String,
  //   required: true
  // },
  photo: String,
  register_date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
