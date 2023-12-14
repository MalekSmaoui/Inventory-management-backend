const mongoose = require('mongoose')

const Marque = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  images:[{
    type: String,
    required: false,
  }],
})

module.exports = mongoose.model('Marque', Marque)