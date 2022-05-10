const express = require('express');
const router = express.Router();

const { getAllAppointments, createAppointment, deleteAllAppointments, getAppointmentByID, deleteAppointmentByID } = require('../controllers/appointmentController');

router.route('').get(getAllAppointments).post(createAppointment).delete(deleteAllAppointments)
router.route('/:id').get(getAppointmentByID).delete(deleteAppointmentByID)

module.exports = router;