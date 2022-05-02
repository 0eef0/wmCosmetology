const adminSchema = require('../models/admin');

const getAllAdmins = async (req, res) => {
    try {
        const admins = await adminSchema.find({});
        res.status(201).json({ admins });
    } catch (error) { res.status(500).json({ msg: error }) }
}

const createAdmin = async (req, res) => {
    try {
        const admin = await adminSchema.create(req.body)
        res.status(201).json({admin})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const deleteAllAdmins = async (req, res) => {
    try {
        await adminSchema.deleteMany({});
        res.status(201).json({ success: true, message: "all admins deleted" });
    } catch (error) { res.status(500).json({ msg: error }) }
}

const getAdminByID = async (req, res) => {
    try {
        const admin = await adminSchema.findById(req.params.id).exec();
        res.status(201).json({ admin });
    } catch (error) { res.status(500).json({ msg: error || 'There has been an error, try again later' }) }
}

const updateAdminByID = async (req, res) => {
    try {
        const { id } = req.params;
        const newAdmin = req.body;
        await adminSchema.findOneAndUpdate({ _id: id }, newAdmin);
        res.status(201).json({ newAdmin });
    } catch (error) { res.status(500).json({ msg: error }) }
}

const deleteAdminByID = async (req, res) => {
    try {
        await adminSchema.findByIdAndRemove(req.params.id);
        res.status(201).json({ success: true, message: `admin with id ${req.params.id} deleted` });
    } catch (error) { res.status(500).json({ msg: error || 'There has been an error, try again later' }) }
}

module.exports = { getAllAdmins, createAdmin, deleteAllAdmins, getAdminByID, updateAdminByID, deleteAdminByID };

