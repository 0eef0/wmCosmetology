const express = require('express');
const navigation = express.Router();
const axios = require('axios');
//authentication middleware
const {ensureAuthenticated} = require('../middleware/auth.js');

const hairDescriptions = require('../hair-descriptions.json');

//home page
navigation.get('/', (req, res) => {
  res.render('pages/index')
})
//account page
navigation.get('/account', (req, res) => {
  res.render('pages/account')
})
//log in page
navigation.get('/login', (req, res) => {
  res.render('pages/login')
})

//admin schedule page
navigation.get('/schedule', (req, res) => {
  res.render('pages/admin/schedule')
})
navigation.get('/accounts', async (req, res) => {
    try {
        const { data: { allUsers } } = await axios.get('http://localhost:5000/api/v1/admins');
        await res.render('pages/admin/accounts', {
            allUsers,
        });
    } catch (err) {
        console.error(err);
    }
})


// ALL ADMIN PAGES HERE
/* ALL ADMIN PAGES HERE */
// Accounts
navigation.get('/accounts', /* ensureAuthenticated, */ (req, res) => {
    res.render('pages/admin/accounts')
})
// Create User
navigation.get('/create-user', /* ensureAuthenticated, */(req, res) => {
    res.render('pages/admin/create-user')
})
// New Appointment
navigation.get('/newAppointment', /* ensureAuthenticated, */(req, res) => {
    res.render('pages/admin/newAppointment')
})
// New Visit
navigation.get('/newVisit', /* ensureAuthenticated, */ (req, res) => {
    res.render('pages/admin/newVisit')
})
// Schedule
navigation.get('/schedule', /* ensureAuthenticated, */ (req, res) => {
    res.render('pages/admin/schedule')


})

module.exports = navigation;