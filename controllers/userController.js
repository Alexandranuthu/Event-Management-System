const axios = require('axios');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const apiBaseUrl = 'https://ap-south-1.aws.data.mongodb-api.com/app/application-0-kucgxyr/endpoint/usersdata';

module.exports = {
    // @desc registering a new user
    // @route POST /api/users
    // @access Public
    registerUser: asyncHandler(async (req, res) => {
        const { userName, email, password, role, profilePicture, bio } = req.body;

        try {
            // Check if the user exists locally
            const userExists = await User.findOne({ email });
            if (userExists) {
                res.status(400);
                throw new Error('User already exists');
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
                res.status(400);
                throw new Error('User already exists or Invalid data.');
            } else {
                res.status(500);
                throw new Error('User registration failed.');
            }
        }
    }),

    // @desc Authenticate the user
    // @route POST /api/users/login
    // @access public
    loginUser: asyncHandler(async (req, res) => {
        const { email, password } = req.body;

        try {
            // Make a POST request to the MongoDB API endpoint for login
            const response = await axios.post(`${apiBaseUrl}/login`, {
                email: email,
                password: password
            });

            // Assuming the API returns the user object on successful login
            const user = response.data;

            // Check if the password is correct using bcrypt
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                res.status(401);
                throw new Error('Invalid email or password');
            }

            // Return the user details
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
                res.status(401);
                throw new Error('Invalid email or password.');
            } else {
                res.status(500);
                throw new Error('Login failed.');
            }
        }
    })
};
