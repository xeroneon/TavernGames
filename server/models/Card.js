const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new mongoose.Schema({
  decks: [{ type: Schema.Types.ObjectId, ref: 'Deck' }],
  isDeleted: {
    type: String,
    default: ''
  },

  artist: String,
  cmc: Number,
  colorIdentity: Array,
  colors: Array,
  foreignNames: Array,
  id: String,
  imageUrl: String,
  layout: String,
  legalities: Array,
  manaCost: String,
  multiverseid: Number,
  name: String,
  names: Array,
  number: String,
  originalText: String,
  originalType: String,
  printings: Array,
  rarity: String,
  rulings: Array,
  set: String,
  setName: String,
  subtypes: Array,
  supertypes: Array,
  text: String,
  type: String,
  supertypes: Array,
  types: Array,
  subtypes: Array,
  power: String,
  toughness: String
});

module.exports = mongoose.model('Card', CardSchema);