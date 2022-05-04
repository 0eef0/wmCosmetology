const express = require('express');
const navigation = express.Router();
//authentication middleware
const {ensureAuthenticated} = require('../middleware/auth.js')

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

/* ALL ADMIN PAGES HERE */
// Admin Accounts
navigation.get('/accounts', /* ensureAuthenticated, */ (req, res) => {
    res.render('pages/admin/accounts')
})
// Admin New Visit
navigation.get('/newVisit', /* ensureAuthenticated, */ (req, res) => {
    res.render('pages/admin/newVisit')
})
// Admin Profile
navigation.get('/profile/:id', /* ensureAuthenticated, */ (req, res) => {
    res.render('pages/admin/profile')
})
// Admin Schedule
navigation.get('/schedule', /* ensureAuthenticated, */ (req, res) => {
    res.render('pages/admin/schedule')
})
//admin home page
navigation.get('/adminHome', /* ensureAuthenticated, */ (req, res) => {
  res.render('pages/adminHome')
})

module.exports = navigation;