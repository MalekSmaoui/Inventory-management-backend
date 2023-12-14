const mongoose = require('mongoose')

const Annee = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  modele: 
  {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Modele"
  }

})

module.exports = mongoose.model('Annee', Annee)