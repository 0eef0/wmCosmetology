const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    adminEmail: {
        type: String,
        required: [true, 'Must provide a email']
    },
    adminPassword: { // encrypt
        type: String,
        required: [true, 'Must provide a password']
    }
});

module.exports = mongoose.model('admins', adminSchema);