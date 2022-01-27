const passport = require('passport');

const JWTStrategy = require('passport-jwt').Strategy;

// will extract jwt from the header
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');



let opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(), // header is a list of keys
    secretOrKey : process.env.SECRET, // encryption/ decryption string
}

// find the user based on the information of jwt payload
passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){ // contains the actual encrypted information
    User.findById(jwtPayLoad._id, function(err, user){
        if(err){
            console.log('error in finding user from JWT');
               return done(err);
        }

        if(user){
            return done(null, user);
        }else{
            return done(null, false);
        }
    })
}))


module.exports = passport;