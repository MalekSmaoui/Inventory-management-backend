const mongoose = require('mongoose')

const FactureItems = new mongoose.Schema({
  piece: {
    required: false,
    type: String,
  },
  ref: {
    required: false,
    type: String,
  },
  quantite: {
    required: false,
    type: String,
  },
  prix: {
    required: false,
    type: String,
  },
  facture: 
  {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Facture"
  }
})

module.exports = mongoose.model('FactureItems', FactureItems)