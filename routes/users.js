const express = require('express');

const router = express.Router();

const passport = require('passport');

const usersController = require('../controllers/users_controler');

// requests coming to this route will render the signin/signup page.
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);

// calls the destroy session controller to logs out the user 
router.get('/sign-out', usersController.destroySession);

// user will be created at this route if hitted
router.post('/create', usersController.create);

// used local passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect : '/users/sign-in'}
), usersController.createSession);

// used google auth as a middleware to authenticate
router.get('/auth/google', passport.authenticate('google', {scope : ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate(
    'google',
    {failureRedirect : '/users/sign-in'}
), usersController.createSessionGoogle);

// routes used for resetting the password
router.get('/reset-password', passport.checkAuthentication, usersController.resetPassword);
router.post('/create-new-password', usersController.createNewPassword);

router.get('/create-password', usersController.createPassword);
router.post('/set-password', usersController.setPassword);

module.exports = router;