// authentication routes
const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authController');

// public routes for registering a user and logging in
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;