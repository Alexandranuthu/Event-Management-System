const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');
// const { protect } = require('../middleware/authMiddleware');


// public routes for registering a user and logging in
    router.post('/register', registerUser);
    router.post('/login', loginUser);




module.exports = router;


