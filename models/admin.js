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
    password: { // encrypt
        type: String,
        required: [true, 'Must provide a password']
    },
    accountType: {
        type: String,
        enum: ['admin','teacher','student'],
        required: [true, 'Must provide an account type']
    },
    serviceHistory: {
        type: Array,
    }
});

module.exports = mongoose.model('admins', adminSchema);