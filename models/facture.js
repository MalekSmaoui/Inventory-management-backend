const mongoose = require('mongoose')

const Facture = new mongoose.Schema({
  date: {
    required: false,
    type: String,
  },
  client: {
    required: false,
    type: String,
  },
  etat: {
    required: false,
    type: Boolean,
  },
  clientid: 
  {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client"
  }
})

module.exports = mongoose.model('Facture', Facture)