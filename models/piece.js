const mongoose = require('mongoose')
const finition = require('./finition')

const dataSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  modele: {
    required: true,
    type: String,
  },
  annee: {
    required: true,
    type: String,
  },
  ref: {
    required: false,
    type: String,
  },
  num: {
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
  description: {
    required: false,
    type: String,
  },
  images:[{
    type: String,
    required: false,
  }],
  categorie: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categorie"
    },
  finition:
    {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Finition"
    }
  
  
})

module.exports = mongoose.model('Pieces', dataSchema)