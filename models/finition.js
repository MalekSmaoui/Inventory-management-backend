const mongoose = require('mongoose')

const Finition = new mongoose.Schema({
  modele: {
    required: false,
    type: String,
  },
  anneee: {
    required: false,
    type: String,
  },
  couleur: {
    required: false,
    type: String,
  },
  finition: {
    required: false,
    type: String,
  },
  boitev: {
    required: false,
    type: String,
  },
  typecarro: {
    required: false,
    type: String,
  },
  typemoteur: {
    required: false,
    type: String,
  },
  carburant: {
    required: false,
    type: String,
  },
  annee: 
  {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Annee"
  }

})

module.exports = mongoose.model('Finition', Finition)