const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home_controller');

// request to home page
router.get('/', homeController.home);

// routes all request starting with /users/
router.use('/users', require('./users'));

// routes all api request starting with /api/
router.use('/api', require('./api'));


module.exports = router;