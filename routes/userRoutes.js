const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User registration (public)
router.post('/register', userController.registerUser);

// // User login (public)
router.post('/login', userController.loginUser);

// // Get user by ID
// router.get('/:id', userController.getUserById);

// // Update user profile
// router.put('/:id', userController.updateUserProfile);

// // Delete user (admin only)
// router.delete('/:id', userController.deleteUser);

module.exports = router;
