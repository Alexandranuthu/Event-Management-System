const axios = require('axios');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const apiBaseUrl = 'https://ap-south-1.aws.data.mongodb-api.com/app/application-0-kucgxyr/endpoint/usersdata';

module.exports = {
    // Login a user
    loginUser: asyncHandler(async (req, res) => {
        const { email, password } = req.body;

        try {
            // Make a POST request to MongoDB API endpoint to authenticate the user
            const response = await axios.post
            
            
            (`${apiBaseUrl}/login`, {
                email,
                password
            });

            const user = response.data;

            // If the user is valid, return the user details
            res.status(200).json({
                _id: user._id,
                userName: user.userName,
                email: user.email,
                role: user.role,
                profilePicture: user.profilePicture,
                bio: user.bio
            });

        } catch (error) {
            if (error.response && error.response.status === 401) {
                res.status(401).json({ message: 'Invalid email or password' });
            } else {
                res.status(500).json({ message: 'Login failed', error: error.message });
            }
        }
    }),

    // Register a new user
    registerUser: asyncHandler(async (req, res) => {
        const { userName, email, password, role, profilePicture, bio } = req.body;

        try {
            // Check if the user exists locally
            const userExists = await User.findOne({ email });
            if (userExists) {
                res.status(400).json({ message: 'User already exists' });
                return;
            }

            // Hash the password before sending to MongoDB API
            const salt = await bcrypt.genSalt(12);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Make a POST request to MongoDB API endpoint to register the user
            const response = await axios.post(apiBaseUrl, {
                userName: userName,
                email: email,
                password: hashedPassword,  // Send hashed password
                role: role || 'attendee',  // Default role is 'attendee'
                profilePicture: profilePicture || '/images/userprofile.jpg', // Default profile picture
                bio: bio || '',  // Optional bio
            });

            // Assuming the API returns the created user object
            const user = response.data;

            // Save the user to the local database (optional)
            await User.create({
                userName,
                email,
                password: hashedPassword,
                role: user.role,
                profilePicture: user.profilePicture,
                bio: user.bio,
                registeredEvents: user.registeredEvents,
                organizedEvents: user.organizedEvents
            });

            // Return the user details in the response
            res.status(201).json({
                _id: user._id,
                userName: user.userName,
                email: user.email,
                role: user.role,
                profilePicture: user.profilePicture,
                bio: user.bio
            });

        } catch (error) {
            if (error.response && error.response.status === 400) {
                res.status(400).json({ message: 'User already exists or Invalid data' });
            } else {
                res.status(500).json({ message: 'User registration failed', error: error.message });
            }
        }
    })
};
