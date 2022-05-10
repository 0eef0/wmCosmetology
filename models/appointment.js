const mongoose = require('mongoose');

const appointment = new mongoose.Schema({
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
      required: [false, 'Must provide a date']
    },
    time: {
      type: String,
      required: [false, 'Must provide a time']
    },
    hairServices: {
      type: Array,
      required: [false, 'Must provide list of hair services']
    },
    colorServices: {
      type: Array,
      required: [false, 'Must provide list of color services']
    },
    chemicalServices: {
      type: Array,
      required: [false, 'Must provide list of chemical services']
    },
    addOnServices: {
      type: Array,
      required: [false, 'Must provide list of add-on services']
    },
    notes: {
      type: String,
      required: [false, '']
    }
});

module.exports = mongoose.model('appointmentSchema', appointment);