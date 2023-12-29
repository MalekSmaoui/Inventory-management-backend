const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
  date: {
    required: false,
    type: String,
  },
  achatt: {
    required: false,
    type: String,
  },
  fournisseur: {
    required: false,
    type: String,
  },
  prix: {
    required: false,
    type: String,
  }
  
  
})

module.exports = mongoose.model('Achats', dataSchema)