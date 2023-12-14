const mongoose = require('mongoose')

const Modele = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  marque: 
  {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Marque"
  }

})

module.exports = mongoose.model('Modele', Modele)