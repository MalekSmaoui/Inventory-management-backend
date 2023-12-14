const mongoose = require('mongoose')

const Catalogue = new mongoose.Schema({
  name: {
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
  }

})

module.exports = mongoose.model('Catalogue', Catalogue)