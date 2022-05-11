// const passport = require("passport")
// const express = require("express")
// const Router = express.Router()
const express = require('express')
const app = express.Router()
const bcrypt = require('bcrypt')
const passport = require('passport');
const cloudinary = require('cloudinary').v2;
const stream = require('stream');
const { ensureAuthenticated } = require('../middleware/auth');
require('dotenv').config();

// Cloudinary account info
const apiSecret = process.env.CLOUDINARY_SECRET;
const cloudName = 'west-mec-coding';
const apiKey = '416953374243466';

cloudinary.config({
    cloud_name: cloudName, // add your cloud_name
    api_key: apiKey, // add your api_key
    api_secret: apiSecret, // add your api_secret
    secure: true
});

(async () => {
    try {
        console.log((await cloudinary.api.resources({
            type: 'upload',
            prefix: 'test2' // add your folder
        })).resources);
    } catch (error) { console.log(error) }
})()
//

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
                res.sendStatus(403)
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
                                    res.render('pages/admin/schedule')
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
    try {
        passport.authenticate('local', {
            successRedirect: '/schedule',
            failureRedirect: '/login'
        })(req, res, next)
    }
    catch (error) {
        console.error(error)
    }
})

app.get('/current', async (req, res) => {
    try {
        if (req.user === undefined) {
            // The user is not logged in
            res.json({});
        } else {
            res.json({
                user: req.user
            });
        }
    } catch (error) {
        console.error(error)
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

app.get('/:id', async (req, res) => {
    try {
        const user = await UserSchema.find({ _id: req.params.id });
        res.status(201).json({ user });
    } catch (err) {
        res.status(500).json({ msg: error })
    }
})

app.delete('/', async (req, res) => {
    try {
        await UserSchema.deleteMany({});
        res.status(201).json({ success: true, msg: "all users deleted" });
    } catch (error) { res.status(500).json({ msg: error }) }
})

app.post("/newVisit", (req, res) => {
    if (!req.files.images.length) {
        const cloudinaryStream = cloudinary.uploader.upload_stream({
            folder: req.body.name
        });
        stream.Readable.from(req.files.images.data).pipe(cloudinaryStream);
    } else {
        const cloudinaryStream = cloudinary.uploader.upload_stream({
            folder: req.body.name
        });
        req.files.images.forEach(img => {
            stream.Readable.from(img.data).pipe(cloudinaryStream);
        })
    }
    res.redirect('/newVisit');
})

module.exports = app;