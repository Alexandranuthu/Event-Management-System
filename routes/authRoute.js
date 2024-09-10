// authentication routes
const express = require('express');
const router = express.Router();
const { register } = require('../controllers/authController');

// public routes for registering a user and logging in
router.post('/register', register);
// router.post('/login', loginUser);

module.exports = router;