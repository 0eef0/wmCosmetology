const express = require('express');
const navigation = express.Router();
//authentication middleware
const {ensureAuthenticated} = require('../middleware/auth.js')

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


// ALL ADMIN PAGES HERE

//admin schedule page
navigation.get('/schedule', ensureAuthenticated, (req, res) => {
  res.render('pages/admin/schedule')
})
//admin new visit
navigation.get('/new-visit', ensureAuthenticated, (req, res) => {
  res.render('pages/admin/new-visit', {hairDescriptions: hairDescriptions})
})

module.exports = navigation;