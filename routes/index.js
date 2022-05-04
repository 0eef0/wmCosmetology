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

//admin create user page
navigation.get('/create-user', (req, res) => {
  res.render('pages/admin/create-user')
})

// ALL ADMIN PAGES HERE

//admin home page
navigation.get('/adminHome', ensureAuthenticated, (req, res) => {
  res.render('pages/adminHome')
})

module.exports = navigation;