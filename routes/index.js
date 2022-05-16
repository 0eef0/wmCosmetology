const express = require('express');
const navigation = express.Router();
const axios = require('axios');
//authentication middleware
const { ensureAuthenticated, ensureAdminAuthenticated } = require('../middleware/auth.js');

const hairDescriptions = require('../hair-descriptions.json');

//home page
navigation.get('/', (req, res) => {
    res.render('pages/index', { title: "Home" })
})
//account page
navigation.get('/account', (req, res) => {
    res.render('pages/account', { title: "Account" })
})
//log in page
navigation.get('/login', (req, res) => {
    res.render('pages/login', {title: "Login" })
})

//admin schedule page
navigation.get('/schedule', ensureAuthenticated, (req, res) => {
    res.render('pages/admin/schedule', { title: "Admin Schedule" })
})

/* ALL ADMIN PAGES HERE */
// Accounts
navigation.get('/accounts', ensureAuthenticated, async (req, res) => {
    try {
        const { data: { allUsers } } = await axios.get('http://localhost:5000/api/v1/admins');

        // const filterByType = async (type) => {
        //     console.log('hi')
        //     switch (type) {
        //         case 'student': 
        //             allUsers = allUsers.filter((user) => {user.accountType === 'student'});
        //             break;
        //         case 'teacher': 
        //             allUsers = allUsers.filter((user) => {user.accountType === 'teacher'});
        //             break;
        //         case 'admin': 
        //             allUsers = allUsers.filter((user) => {user.accountType === 'admin'});
        //             break;
        //         default:
        //             allUsers = allUsers;
        //     }
        // }

        await res.render('pages/admin/accounts', {
            allUsers,
            title: "Admin Accounts"
        });
    } catch (err) {
        console.error(err);
    }
})

/* ALL ADMIN PAGES HERE */
// Create User
navigation.get('/createUser', ensureAdminAuthenticated,(req, res) => {
    res.render('pages/admin/createUser', { title: "Create User" })
})
// New Appointment
navigation.get('/newAppointment', ensureAuthenticated, (req, res) => {
    res.render('pages/admin/newAppointment', { title: "New Appointment" })
})
// New Visit
navigation.get('/newVisit', ensureAuthenticated, (req, res) => {
    res.render('pages/admin/newVisit', { hairDescriptions: hairDescriptions, title: "New Visit" })

})
// Schedule
navigation.get('/schedule', ensureAuthenticated, (req, res) => {
    res.render('pages/admin/schedule', { title: "Admin Schedule" })
})

module.exports = navigation;