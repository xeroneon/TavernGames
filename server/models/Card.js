const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const CardSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  decks: [{ type: Schema.Types.ObjectId, ref: 'Deck' }],
  isDeleted: {
    type: String,
    default: ''
  },
});

module.exports = mongoose.model('Card', CardSchema);