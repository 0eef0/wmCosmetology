const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must provide a name']
    },
    email: {
        type: String,
        required: [true, 'Must provide a email']
    },
    date: {
      type: String,
      required: [true, 'Must provide a date']
    },
    time: {
      type: String,
      required: [true, 'Must provide a time']
    },
    services: {
      type: Array,
      required: [true, 'Must provide a time']
    },
    price: {
        type: Number,
        required: [true, 'Must provide an estimated price']
    },
    notes: {
      type: String,
      maxLength: 1000,
      default: null
    }
});

module.exports = mongoose.model('appointmentSchema', adminSchema);
