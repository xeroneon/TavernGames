const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    default: ''
  },
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  },
  role: {
    type: Number,
    default: 1
  },
  isDeleted: {
    type: String,
    default: ''
  },
  photo: {
    type: String,
    default: '/assets/img/placeholder-user.png'
  }
});


UserSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema); 