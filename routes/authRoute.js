// authentication routes
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// public routes for registering a user and logging in
router.post('/register', register);
router.post('/login', login);

module.exports = router;