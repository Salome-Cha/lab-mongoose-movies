const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const Movie = new Schema (
  { 
    title: {
        type: String,
        required: true,
     },
    genre: {
        type: String,
        required: true
    },
    plot: {
        type: String,
        required: true
    },
    celebrity: {
        type: Schema.Types.ObjectId, // Foreign key.
        ref: 'Celebrity'  // Relates to the celibrity model.
      }
},
  {
    timestamps: true,
  }
  )

  
  module.exports = model('Movie', Movie)