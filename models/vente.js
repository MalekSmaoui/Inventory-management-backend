const mongoose = require('mongoose')


const dataSchema = new mongoose.Schema({
  nom: {
    required: true,
    type: String,
  },
  date: {
    required: true,
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
  user: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
  piece:
    {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Pieces"
    }
  
  
})

module.exports = mongoose.model('Ventes', dataSchema)