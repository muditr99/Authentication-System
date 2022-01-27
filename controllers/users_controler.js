const User = require('../models/user');
const passwordMailer = require("../mailers/users_mailer");
const bcrypt = require('bcrypt');

// renders the page where user enters his email to reset the password
module.exports.resetPassword = function(req, res){
    // return res.end('<h1>profile page</h1>')
    return res.render('user_reset_pass', {
        title : 'Reset Password',
    });
}

// render the sign up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.end('<h1>please validate captcha!</h1>');
    }
    return res.render('user_sign_up', {
        title : 'Sign Up',
    });

}

// render the sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.end('<h1>please validate captcha!</h1>');
    }
    return res.render('user_sign_in', {
        title : 'Sign In',
    });

}

// get the sign up data , also encrypts the password
module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        req.flash('error', 'Passwords does not match!');
        return res.redirect('back');
    }

    User.findOne({email : req.body.email}, function(err, user){
        if(err){
            console.log('error in finding user in signing up', err);
            return;
        }

        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log('error in creating user while signing up', err);
                    return;
                }
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(user.password, salt, function(err, hash) {
                        user.password = hash;
                        user.save();
                    });
                });
                return res.redirect('/users/sign-in');
            })
        }else{
            req.flash('error', 'Already Signed Up!');
            return res.redirect('back');
        }
    })
}

// sign in and create a session for the user
module.exports.createSession = function(req, res){
    
    const name = req.body.name;
    // getting site key from client side
    const response_key = req.body["g-recaptcha-response"];

    const secret_key = process.env.CAPTCHA_SECRET_KEY;
    // Hitting POST request to the URL, Google will
    // respond with success or error scenario.
     const url =`https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${response_key}`;

     fetch(url, {
        method: "post",
      })
        .then((response) => response.json())
        .then((google_response) => {
     
          // google_response is the object return by
          // google as a response
          if (google_response.success == true) {
            //   if captcha is verified
             req.flash('success', 'Logged In Successfully');
             return res.redirect('/');
          } 
          else{
            req.flash('error', 'captcha validation required');
            return res.render('user_sign_in', {
                title : 'Sign In',
                prop : 0,
            });
          }
        })
        .catch((error) => {
            // Some error while verify captcha
          return res.json({ error });
        });
        
        
}

// will login the user with help of auth provided by google
module.exports.createSessionGoogle = function(req, res){
    req.flash('success', 'Logged In Successfully');
    return res.redirect('/');
}

// this action will logs out the user
module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'You Have Logged Out');
    return res.redirect('/');
}

// will send the mail to user
module.exports.createNewPassword = function(req, res){
    
    passwordMailer.newPassword(req.body);
    return res.redirect('/');
}

// will render the page to reset the password
module.exports.createPassword = function(req, res){
    return res.render('user_change_pass', {
        title : 'change Password',
    });
}

// will help the user to hash password as well as to reset his password
module.exports.setPassword = function(req, res){

    if(req.body.password != req.body.confirm_password){
        req.flash('error', 'Passwords does not match!');
        return res.redirect('back');
    }

    User.findOne({email : req.body.email}, function(err, user){
        if(err){
            console.log('error in finding user in signing up', err);
            return;
        }
       
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                user.password = hash;
                user.save();
            });
        });

        req.flash('success', 'Password Changed Successfully');

        return res.redirect('/');
        
    })

}

