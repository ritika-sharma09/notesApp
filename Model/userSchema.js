const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'userName is mandatory'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'password is mandatory'],
  },
});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;
