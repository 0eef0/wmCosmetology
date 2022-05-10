const appointmentSchema = require('../models/appointment');

const getAllAppointments = async (req, res) => {
    try {
        const appointments = await appointmentSchema.find({});
        res.status(201).json({ appointments });
    } catch (error) { res.status(500).json({ msg: error }) }
}

const createAppointment = async (req, res) => {
    try {
        console.log(req.body)
        const appointment = await appointmentSchema.create(req.body)
        res.status(201).json({appointment})
    } catch (error) {
        res.status(500).json({msg: 'there has been an error: ' + error})
    }
}

const deleteAllAppointments = async (req, res) => {
    try {
        await appointmentSchema.deleteMany({});
        res.status(201).json({ success: true, message: "all appointments deleted" });
    } catch (error) { res.status(500).json({ msg: error }) }
}

const getAppointmentByID = async (req, res) => {
    try {
        console.log(req.params.id)
        const appointment = await appointmentSchema.findById(req.params.id).exec();
        res.status(201).json({ appointment });
    } catch (error) { res.status(500).json({ msg: error || 'There has been an error, try again later' }) }
}

const deleteAppointmentByID = async (req, res) => {
    try {
        await appointmentSchema.findByIdAndRemove(req.params.id);
        res.status(201).json({ success: true, message: `appointment with id ${req.params.id} deleted` });
    } catch (error) { res.status(500).json({ msg: error || 'There has been an error, try again later' }) }
}

module.exports = { getAllAppointments, createAppointment, deleteAllAppointments, getAppointmentByID, deleteAppointmentByID };

