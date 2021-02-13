const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  uname: {
    type: String,
    required: [true, "Please Enter Name"],
    minlength: [6, "Must be 6 char"],
  },
  uaddress: {
    type: String,
    required: [true, "Please Enter Address"],
    minlength: [3, "Must be 6 char"],
  },
  uclass: {
    type: String,
    required: [true, "Please Enter Class"],
    minlength: [3, "Must be 6 char"],
  },
  uphone: {
    type: String,
    required: [true, "Please Enter Phone"],
    minlength: [11, "Must be 11 char"],
    maxlength: [11, "Must be 11 char"],
  },
}, {
  timestamps: true,
});

const User = mongoose.model('users', userSchema);

module.exports = User;