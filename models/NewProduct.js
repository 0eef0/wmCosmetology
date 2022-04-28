const mongoose = require('mongoose');
// import mongoose from 'mongoose'

const NewProductSchema = new mongoose.Schema({
  image: {
    type: 'string',
    required: [true, 'must provide an image url']
  },
  name: {
    type: 'string',
    required: [true, 'must provide a name']
  },
  price: {
    type: 'number',
    required: [true, 'must provide a price']
  },
  rating: {
    type: 'number',
    required: [true, 'must provide a rating']
  }
});

// This is basic validation not advanced
module.exports = mongoose.model('newProduct', NewProductSchema);