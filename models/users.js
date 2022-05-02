const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Must provide a name'],
    },
    userEmail: {
        type: String,
        required: [true, 'Must provide a email']
    },
    userAddress: { // encrypt
        type: String,
        required: [true, 'Must provide an address'],
    },
    userCity: { // encrypt
        type: String,
        required: [true, 'Must provide a city']
    },
    userState: { // encrypt
        type: String,
        required: [true, 'Must provide a state']
    },
    userZip: { // encrypt
        type: String,
        required: [true, 'Must provide a zip code']
    },
    userPhone: { // encrypt
        type: String,
        required: [true, 'Must provide a phone number']
    },
    userPassword: { // encrypt
        type: String,
        required: [true, 'Must provide a password']
    },
    userBDay: { // encrypt
        type: String,
        required: [true, 'Must provide a date of birth']
    },
    userHairInfo: { // encrypt
        type: Object,
        required: [true, 'Must provide hair info']
    },
    userLatestCut: {// encrypt
        type: Object,
    },
    userAppointments: { // encrypt
        type: Array,
        required: [true, 'Must provide appointment history']
    }
});

module.exports = mongoose.model('users', userSchema);