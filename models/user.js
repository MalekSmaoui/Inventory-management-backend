const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
    unique:true,
  },
  password: {
    required: true,
    type: String,
  },
  accountStatus: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    required: false,
  },
  roles: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
    }
  ]
  
})

module.exports = mongoose.model('Users', dataSchema)