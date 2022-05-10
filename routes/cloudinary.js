const express = require('express');
const app = express();
const cloudinary = require('cloudinary').v2;
const { ensureAuthenticated } = require('../middleware/auth');
require('dotenv').config();

// Cloudinary account info
const apiSecret = process.env.CLOUDINARY_SECRET;
const cloudName = 'west-mec-coding';
const apiKey = '416953374243466';
//

// using this API should require authentication
app.post('/api/signuploadwidget', (req, res, next) => {
	console.log(req.files.img)
})

module.exports = app