const express = require('express');
const navigation = express.Router();
//authentication middleware
const {ensureAuthenticated} = require('../middleware/auth.js')

//home page
navigation.get('/', (req, res) => {
  res.render('pages/index')
})
//log in page
navigation.get('/login', (req, res) => {
  res.render('pages/login')
})
//sign up page
navigation.get('/sign-up', (req, res) => {
  res.render('pages/signUp')
})

/* ALL ADMIN PAGES HERE */
// Accounts
navigation.get('/accounts', /* ensureAuthenticated, */ (req, res) => {
    res.render('pages/admin/accounts')
})
// Create User
navigation.get('/createUser', /* ensureAuthenticated, */(req, res) => {
    res.render('pages/admin/createUser')
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