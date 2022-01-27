require('dotenv').config()
const express = require('express');

const cookieParser = require('cookie-parser');
const fetch = require("isomorphic-fetch");

const port = 8000;

const app = express();

const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
// require all the authentication libraries
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo');

// for notification
const flash = require('connect-flash');

// for hashing the password
const bcrypt = require('bcrypt');

const customMware = require('./config/middleware');


// to get the data from body of request(post)
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// contains all css files for styling the app
app.use(express.static('./assets'));

// provide common layout 
app.use(expressLayouts);

// extract style and script from sub pages into layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// setup the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name : process.env.NAME,
    secret : process.env.SECRET,
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000* 60 * 100)
    },
    store : MongoStore.create({
         //mongooseConnection : db,
         mongoUrl: process.env.MONGO_URL,
         autoRemove : 'disabled', 
        }, function(err){
            if(err){
                console.log(err);
            }
            console.log('connection to mongoDB ok');
        })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);


// use express router
app.use('/', require('./routes/index'));


app.listen(port, function(err){
    if(err){
        console.log(`error in running the server: ${err}`)
    }

    console.log(`server is running on port: ${port}`);
})