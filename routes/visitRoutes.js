const express = require('express');
const router = express.Router();

const { getAllVisits, createVisit } = require('../controllers/visitController')

//Controllers for Appointment
router.route('/').get(getAllVisits).post(createVisit);

module.exports = router;