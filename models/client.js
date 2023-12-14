const mongoose = require('mongoose')

const Client = new mongoose.Schema({
  name: {
    required: false,
    type: String,
  },
  //libelles
  num: {
    required: false,
    type: String,
  },
  adresse: {
    required: false,
    type: String,
  },

})

module.exports = mongoose.model('Client', Client)