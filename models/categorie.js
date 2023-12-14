const mongoose = require('mongoose')

const Categorie = new mongoose.Schema({
  name: {
    required: false,
    type: String,
  },
  images:[{
    type: String,
    required: false,
  }],

})

module.exports = mongoose.model('Categorie', Categorie)