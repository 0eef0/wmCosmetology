// const passport = require("passport")
// const express = require("express")
// const Router = express.Router()
const express = require('express')
const app = express.Router()
const bcrypt = require('bcrypt')
const passport = require('passport');

const UserSchema = require('../models/users');

app.use(express.json())
// Router.post('/login', passport.authenticate('local', { successRedirect: '/adminHome', failureRedirect: '/adminLogin' }));

app.post('/', async (req, res) => { //create user
    const { userName, userEmail, userAddress, userCity, userState, userZip, userPhone, userPassword, userBDay, userHairInfo, userLatestCut, userAppointments } = req.body;
    console.log(req.body)
    //console.log(username, name, password)
    let errors = [];
    try {
        // const salt = await bcrypt.genSalt(10)
        // console.log(`Salt ${salt}`);

        UserSchema.findOne({ userPhone: userPhone }).exec((err, user) => {
            //console.log(username);
            if (user) {
                console.log('username already in use')
                errors.push({ msg: 'user already registered' })
            } else {
                const newUser = new UserSchema({
                    userName,
                    userEmail,
                    userAddress,
                    userCity,
                    userState,
                    userZip,
                    userPhone,
                    userPassword,
                    userBDay,
                    userHairInfo,
                    userLatestCut,
                    userAppointments
            })

                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(newUser.userAddress, salt,
                        (err, hash) => {
                            if (err) throw err;
                            //same pass to hash
                            newUser.userAddress = hash;
                        }
                    )
                );
                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(newUser.userCity, salt,
                        (err, hash) => {
                            if (err) throw err;
                            //same pass to hash
                            newUser.userCity = hash;
                        }
                    )
                );
                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(newUser.userState, salt,
                        (err, hash) => {
                            if (err) throw err;
                            //same pass to hash
                            newUser.userState = hash;
                        }
                    )
                );
                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(newUser.userZip, salt,
                        (err, hash) => {
                            if (err) throw err;
                            //same pass to hash
                            newUser.userZip = hash;
                        }
                    )
                );
                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(newUser.userPhone, salt,
                        (err, hash) => {
                            if (err) throw err;
                            //same pass to hash
                            newUser.userPhone = hash;
                        }
                    )
                );
                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(newUser.userPassword, salt,
                        (err, hash) => {
                            if (err) throw err;
                            //same pass to hash
                            newUser.userPassword = hash;
                        }
                    )
                );
                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(newUser.userBDay, salt,
                        (err, hash) => {
                            if (err) throw err;
                            //same pass to hash
                            newUser.userBDay = hash;
                        }
                    )
                );
                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(JSON.stringify(newUser.userHairInfo), salt,
                        (err, hash) => {
                            if (err) throw err;
                            //same pass to hash
                            newUser.userHairInfo = hash;
                        }
                    )
                );
                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(JSON.stringify(newUser.userLatestCut), salt,
                        (err, hash) => {
                            if (err) throw err;
                            //same pass to hash
                            newUser.userLatestCut = hash;
                        }
                    )
                );
                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(JSON.stringify(newUser.userAppointments), salt,
                        (err, hash) => {
                            if (err) throw err;
                            //same pass to hash
                            newUser.userAppointments = hash;
                                                                    //save user

                            newUser.save()
                                .then((value) => {
                                    console.log(value)
                                    // req.flash('success_msg', 'You have now registered')
                                    res.sendStatus(200)
                                })
                                .catch(value => console.log(value))
                        }
                    )
                );
            }
        })
    } catch (error) {
        console.error(error)
    }
})

app.post('/login', async (req, res, next) => { //login
    passport.authenticate('local', {
        successRedirect: '/adminHome',
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