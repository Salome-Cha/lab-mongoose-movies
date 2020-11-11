const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const Celebrity = new Schema (
  { 
    name: {
        type: String,
        required: true,
     },
    occupation: {
        type: String,
        required: true
    },
    catchphrase: String,
  },
  {
    timestamps: true,
  }
  )

  
  module.exports = model('Celebrity', Celebrity);