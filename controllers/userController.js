const userSchema = require('../models/users');

const getAllUsers = async (req, res) => {
    try {
        const users = await userSchema.find({});
        res.status(201).json({ users });
    } catch (error) { res.status(500).json({ msg: error }) }
}

const createUser = async (req, res) => {
    try {
        const user = await userSchema.create(req.body)
        res.status(201).json({user})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const deleteAllUsers = async (req, res) => {
    try {
        await userSchema.deleteMany({});
        res.status(201).json({ success: true, message: "all users deleted" });
    } catch (error) { res.status(500).json({ msg: error }) }
}

const getUserByID = async (req, res) => {
    try {
        const user = await userSchema.findById(req.params.id).exec();
        res.status(201).json({ user });
    } catch (error) { res.status(500).json({ msg: error || 'There has been an error, try again later' }) }
}

const updateUserByID = async (req, res) => {
    try {
        const { id } = req.params;
        const newUser = req.body;
        await userSchema.findOneAndUpdate({ _id: id }, newUser);
        res.status(201).json({ newUser });
    } catch (error) { res.status(500).json({ msg: error }) }
}

const deleteUserByID = async (req, res) => {
    try {
        await userSchema.findByIdAndRemove(req.params.id);
        res.status(201).json({ success: true, message: `user with id ${req.params.id} deleted` });
    } catch (error) { res.status(500).json({ msg: error || 'There has been an error, try again later' }) }
}

module.exports = { getAllUsers, createUser, deleteAllUsers, getUserByID, updateUserByID, deleteUserByID };

