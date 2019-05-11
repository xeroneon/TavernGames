const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const DeckSchema = new mongoose.Schema({
  title: {
    type: String,
    default: ''
  },
  user: {
      type: Schema.Types.ObjectId
  },
  description: {
    type: String,
    default: ''
  },
  cards: [],
  isDeleted: {
    type: String,
    default: ''
  },
});

module.exports = mongoose.model('Deck', DeckSchema);