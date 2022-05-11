const visitSchema = require('../models/visit');

const getAllVisits = async (req, res) => {
    try {
        const visits = await visitSchema.find({});
        res.status(201).json({ visits });
    } catch (error) { res.status(500).json({ msg: error }) }
}

const createVisit = async (req, res) => {
    try {
        const visit = await visitSchema.create(req.body)
        res.status(201).json({visit})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

module.exports = { getAllVisits, createVisit };