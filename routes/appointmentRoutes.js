const express = require('express');
const router = express.Router();

const { getAllAppointments, createAppointment, getAppointment, updateAppointment, deleteAppointment, deleteAll } = require('../controllers/appointmentsController.js')

//Controllers for Appointment
router.route('/').get(getAllAppointments).post(createAppointment).delete(deleteAll);
router.route('/:id').get(getAppointment).patch(updateAppointment).delete(deleteAppointment);

module.exports = router;