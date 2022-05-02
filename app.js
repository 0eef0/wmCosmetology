const express = require('express');
const app = express();


//middleware
app.use(express.json())
require('dotenv').config()
const session = require('express-session');
const passport = require('passport');
require('./middleware/Passport.js')(passport)
// important packages
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json({ limit: '16MB' }));
app.use(express.urlencoded({ extended: true }));

//other imported functions
const populateProducts = require('./populate')
const connectDB = require('./db/connect.js');

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use("/styles",express.static(__dirname + "/views/styles"));
app.use("/scripts",express.static(__dirname + "/views/scripts"));
app.use("/assets",express.static(__dirname + "/views/assets"));


const port = process.env.PORT || 5000;

//navigation routing
app.use('/', require('./routes/index'));
app.use('/api/v1/users', require('./routes/loginRoutes'));
app.use('/api/v1/admins', require('./routes/adminRoutes'));
//api routing

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        // await populateProducts()
        app.listen(port, console.log(`server is listening on port ${port}, http://localhost:5000`));
    } catch (error) { console.log(error) }
}
start();