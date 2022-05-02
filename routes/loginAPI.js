
const express = require('express');
const router = express.Router();

const { getAllAccounts, getOneAccount, createNewAccount, deleteAccount, updateAccount } = require('../controllers/LoginControllers.js')

//Controllers for application
router.route('/').get(getAllAccounts).post(createNewAccount);
router.route('/:id').get(getOneAccount).delete(deleteAccount).patch(updateAccount);

module.exports = router;
