const appointmentModel = require('../models/appointment')

const getAllAppointments = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({});
        res.status(201).json({appointments});
    } catch (error) { res.status(500).json({msg: error}) }
}

const createAppointment = async (req, res) => {
    // console.log(req.body)
    try {
        const appointments = await appointmentModel.create(req.body);
        // console.log(application)
        res.status(201).json({appointments});
    } catch (error) { res.status(500).json({msg: error}) }
}

const getAppointment = async (req, res) => {
    try {
        const appointments = await appointmentModel.findById(req.params.id).exec();
        res.status(201).json({appointments});
    } catch (error) { res.status(500).json({msg: error}) }
}

const updateAppointment = async (req, res) => {
    try {
        const {id} = req.params;
        const newAppointment = req.body;
        const appointments = await appointmentModel.findOneAndUpdate({ _id: id }, newAppointment);
        res.status(201).json({newAppointment});
    } catch (error) { res.status(500).json({msg: error}) }
}

const deleteAppointment = async (req, res) => {
    try {
        const appointment = await appointmentModel.findByIdAndRemove(req.params.id);
        res.status(201).json({appointment});
    } catch (error) { res.status(500).json({msg: error}) }
}

const deleteAll = async (req, res) => {
    try {
        await appointmentModel.deleteMany({});
        res.status(201).json({success: true, msg: "all applications deleted"})
    }catch (error) {res.status(500).json({msg: error})}
}

module.exports = { getAllAppointments, createAppointment, getAppointment, updateAppointment, deleteAppointment, deleteAll };