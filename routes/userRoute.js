const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');
// const { protect } = require('../middleware/authMiddleware');


// public routes for registering a user and logging in
try {
    router.post('/register', registerUser);
    router.post('/login', loginUser);
} catch (err) {
    console.error(err);
};



module.exports = router;


