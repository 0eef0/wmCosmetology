// const passport = require("passport")
// const express = require("express")
// const Router = express.Router()
const express = require('express')
const app = express.Router()
const bcrypt = require('bcrypt')
const passport = require('passport');

const { updateAdminCutsByID } = require('../controllers/adminController');

const UserSchema = require('../models/admin');

app.use(express.json());

app.patch('/:id', updateAdminCutsByID);

app.post('/', async (req, res) => { //create user
    const { name, email, password, accountType, serviceHistory } = req.body;
    console.log(req.body)
    let errors = [];
    try {
        UserSchema.findOne({ email: email }).exec((err, user) => {
            //console.log(username);
            if (user) {
                console.log('username already in use')
                errors.push({ msg: 'user already registered' })
            } else if (!/@west-mec.org\s*$/.test(email)) {
                console.log('not a west-mec user')
                errors.push({ msg: 'user not from west-mec' })
            } else {
                const newUser = new UserSchema({
                    name,
                    email,
                    password,
                    accountType,
                    serviceHistory
                })
                newUser.serviceHistory = [];

                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(newUser.password, salt,
                        (err, hash) => {
                            if (err) throw err;
                            //same pass to hash
                            newUser.password = hash;
                            //save user
                            newUser.save()
                                .then((value) => {
                                    console.log(value)
                                    res.sendStatus(200)
                                })
                                .catch(value => console.log(value))
                        }
                    )
                )
            }
        })
    } catch (error) {
        console.error(error)
    }
})

app.post('/login', async (req, res, next) => { //login
    passport.authenticate('local', {
        successRedirect: '/schedule',
        failureRedirect: '/login'
    })(req, res, next)
})

app.get('/current', async(req, res) => {
    if (req.user === undefined) {
        // The user is not logged in
        res.json({});
    } else {
        res.json({
            user: req.user
        });
    }
})

app.post('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
})

app.get('/', async (req, res) => {
  try {
      const allUsers = await UserSchema.find({});
      res.status(201).json({ allUsers });
  } catch (error) { res.status(500).json({ msg: error }) }
})
app.delete('/', async (req, res) => {
  try {
      await UserSchema.deleteMany({});
      res.status(201).json({ success: true, msg: "all users deleted" });
  } catch (error) { res.status(500).json({ msg: error }) }
})

module.exports = app;