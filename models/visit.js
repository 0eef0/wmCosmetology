const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Must provide a name']
	},
	appointmentDate: {
		type: Date,
		required: [true, 'Must provide an appointment date']
	},
	address: {
		type: String,
		required: [true, 'Must provide an address']
	},
	city: {
		type: String,
		required: [true, 'Must provide a city']
	},
	state: {
		type: String,
		required: [true, 'Must provide a state']
	},
	zipCode: {
		type: String,
		required: [true, 'Must provide a zip code']
	},
	phone: {
		type: String,
		required: [true, 'Must provide a phone number']
	},
	email: {
		type: String,
		required: [true, 'Must provide an email']
	},
	dateOfBirth: {
		type: Date,
		required: [true, 'Must provide a date of birth']
	},
	serviceRequest: {
		type: String,
		required: [true, 'Must provide a service request']
	},
	hairCondition: {
		type: String,
		required: [true, 'Must provide a hair condition']
	},
	hairClassification: {
		type: String,
		required: [true, 'Must provide a hair classification']
	},
	scalpCondition: {
		type: String,
		required: [true, 'Must provide a scalp condition']
	},
	hairTexture: {
		type: String,
		required: [true, 'Must provide a hair texture']
	},
	growthPatterns: {
		type: String,
		required: [true, 'Must provide a growth pattern']
	},
	hairDensity: {
		type: String,
		required: [true, 'Must provide a hair density']
	},
	hairPorosity: {
		type: String,
		required: [true, 'Must provide a hair porosity']
	},
	hairElasticity: {
		type: String,
		required: [true, 'Must provide a hair elasticity']
	},
	hairLength: {
		type: String,
		required: [true, 'Must provide a hair length']
	},
	additionalInformation: {
		type: String,
		required: [false, '']
	},
});

module.exports = mongoose.model('visit', adminSchema);