const express = require('express');

const passport = require('passport');

const router = express.Router();

const usersApi = require('../../../controllers/api/v1/users_api');

router.get('/', usersApi.index);
router.get('/:id', passport.authenticate('jwt', {session : false}), usersApi.delete);

router.post('/create-session', usersApi.createSession);


module.exports = router;