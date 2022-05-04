const express = require('express');
const navigation = express.Router();
const axios = require('axios');
//authentication middleware
const {ensureAuthenticated} = require('../middleware/auth.js');

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

//admin home page
navigation.get('/adminHome', ensureAuthenticated, (req, res) => {
  res.render('pages/adminHome')
})

module.exports = navigation;