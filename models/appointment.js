const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must provide a name']
    },
    appointmentDateTime: {
      type: Date,
      required: [true, 'Must provide appointment date']
    },
    address: {
      type: String,
      default: "N/A",
      required: [false, 'Must provide an address']
    },
    city: {
      type: String,
      default: "N/A",
      required: [false, 'Must provide a city']
    },
    state: {
      type: String,
      default: "N/A",
      required: [false, 'Must provide a state']
    },
    zipCode: {
      type: String,
      default: "N/A",
      required: [false, 'Must provide a zip code']
    },
    phone: {
      type: String,
      default: "N/A",
      required: [false, 'Must provide a phone number']
    },
    email: {
        type: String,
        default: "N/A",
        required: [false, 'Must provide a email']
    },
    dateOfBirth: {
      type: Date,
      required: [false, 'Must provide a date of birth']
    },
    serviceRequest: {
      type: String,
      default: "N/A",
      required: [false, 'Must provide a service request']
    },
    hairCondition: {
      type: String,
      default: "N/A",
      required: [false, 'Must provide a hair condition']
    },
    hairClassification: {
      type: String,
      default: "N/A",
      required: [false, 'Must provide a hair classification']
    },
    scalpCondition: {
      type: String,
      default: "N/A",
      required: [false, 'Must provide a scalp condition']
    },
    hairTexture: {
      type: String,
      default: "N/A",
      required: [false, 'Must provide a hair texture']
    },
    growthPattern: {
      type: String,
      default: "N/A",
      required: [false, 'Must provide a growth pattern']
    },
    hairDensity: {
      type: String,
      default: "N/A",
      required: [false, 'Must provide a hair density']
    },
    hairPorosity: {
      type: String,
      default: "N/A",
      required: [false, 'Must provide a hair porosity']
    },
    hairElasticity: {
      type: String,
      default: "N/A",
      required: [false, 'Must provide a hair elasticity']
    },
    hairLength: {
      type: String,
      default: "N/A",
      required: [false, 'Must provide a hair length']
    },
    notes: {
      type: String,
      default: "N/A",
      required: [false, '']
    },
    imageUrls: {
      type: Array,
      default: "N/A",
      required: [false, '']
    },
    services: {
      type: Array,
      default: "N/A",
      required: [false, 'Must provide a time']
    },
    price: {
      type: Number,
      required: [false, '']
    },
    completedBy: {
      type: String,
      required: [false, 'Must provide the id of employee']
    },
    walkIn: {
      type: Boolean,
      required: [true, 'Must specify if service was walk-in']
    }
});

module.exports = mongoose.model('appointments', adminSchema);
