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
    notes: {
      type: String,
      default: null
    }
});

module.exports = mongoose.model('appointmentSchema', adminSchema);
