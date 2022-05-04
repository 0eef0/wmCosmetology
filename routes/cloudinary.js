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

// Server-side function used to sign an Upload Widget upload.
const signuploadwidget = (folder) => {
	const timestamp = Math.round((new Date).getTime() / 1000);

	const signature = cloudinary.utils.api_sign_request({
		timestamp: timestamp,
		source: 'uw',
		folder
	}, apiSecret);

	return { timestamp, signature }
}

app.get('/cloudinaryTest', (req, res) => {
	res.render('pages/cloudinarytest')
})

// using this API should require authentication
app.get('/api/signuploadwidget', (req, res, next) => {
	ensureAuthenticated(req, res, next)
	const sig = signuploadwidget(req.body.folder);
	res.json({
		signature: sig.signature,
		timestamp: sig.timestamp,
		cloudname: cloudName,
		apikey: apiKey
	})
})

module.exports = app