const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')
const User = require('../models/admin')

module.exports = function (passport) {
    //Serialization + deserialization for simultaneous logins
    passport.serializeUser(function (user, done) {
        // console.log("Serialize is running");
        done(null, user.id)
    })

    passport.deserializeUser(function (id, done) {
        // console.log("Deserialize is running");
        // console.log(User)
        User.findById(id, function (err, user) {
            // console.log("User.findById is running");
            done(err, user)
        })
    })

    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            User.findOne({ email: email })
                .then((user) => {

                    if (!user) {
                        return done(null, false, { message: 'User not found' });
                    }

                    //match pass
                    console.log(user._id)
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: 'password Incorrect' })
                        }
                    })
                })
                .catch((err) => { console.log(err) })
        })
    )
}