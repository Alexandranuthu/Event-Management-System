// userController
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');


module.exports = {
    

    // @desc registering a new user
    // @route POST /api/users
    // @access Public

    registerUser: asyncHandler(async (req, res) => {
        const { userName, email, password } = req.body;

        // checking if the user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400);
            throw new Error('This User already exists, Please choose another userName or Email');
        }

        // create a user 
        const user = await User.create({
            userName,
            email,
            password
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                userName: user.userName,
                email: user.email,
            });
        } else {
            res.status(400);
            throw new Error('Invalid user Data, Has not been created!')
        }
    }),

    // @desc Authenticate the user
    // @route Get /api/users/login
    // @access public

    loginUser : asyncHandler(async (req, res) => {
        const { email, password } = req.body //just need the email and password to login a user
    
        // check if the user email is valid 
        const user = await User.findOne({ email }).select('+password');

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                userName: user.userName,
                email: user.email
            });
        } else {
            res.status(401);
            throw new Error('Invalid email or password! Try again');
        }
    })


}
