// authentication Controller
const User = require ('../models/userModel.js')
const { signAccessToken, verifyAccessToken, signRefreshToken, verifyRefreshToken } = require('../helpers/jwtHelper');
const { authSchema, loginSchema } = require('../auth/auth_schema.js');
const createHttpError = require('http-errors');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

module.exports = {
        // @desc registering a new user
        // @route POST /api/auth/register
        // @access Public
    register: asyncHandler(async (req, res) => {
        try {
            const { userName, email, password } = req.body;

            const result = await authSchema.validateAsync({
                userName, email, password
            });

            const exists = await User.findOne({ email });
            if (exists) {
                throw createHttpError(400, `${email} already exists`);

            }
            const userNameExists = await User.findOne({ userName });
            if (userNameExists) {
                throw createHttpError(400, `${userName} is already taken`);
            }

            

            const user = new User(result);
            const savedUser = await user.save();

            const accessToken = await signAccessToken(savedUser.id, savedUser.userName, true);
            const refreshToken = await signRefreshToken(savedUser.id);

            console.log('user has been created successfully', savedUser);

            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'Lax' : 'Strict',
                maxAge: 24 * 60 * 60 * 1000 // 1 day
            });

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'Lax' : 'Strict',
                maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
            });

            // Send success response with tokens
            res.status(201).json({
                message: "Thank you for registering with us. Your account has been successfully created.",
                user: savedUser
            });
        } catch (error) {
            if (error.isJoi === true) {
                return res.status(422).json({ success: false, error: error.message });
            }
            console.error('Registration not complete, there is an error', error);
            res.status(error.status || 500).json({ success: false, error: error.message ||'Internal Server Error' });
        }
    }),

        // @desc Authenticate the user to login
        // @route POST /api/auth/login
        // @access public

     login : asyncHandler(async (req, res) => {
        const { email, password } = req.body //just need the email and password to login a user
    
         try {
            await loginSchema.validateAsync({ email, password });

             const user = await User.findOne({ email }).select('+password');
             if (!user) {
                 throw createHttpError(401, 'Invalid email/password combination');
             }

             const validPassword = await bcrypt.compare(password, user.password);

             if (!validPassword) {
                 throw createHttpError(401, 'Invalid email/password combination');
             }

             //  if valid create and assign a token to the user
             const accessToken = await signAccessToken(
                 user.id,
                user.userName,
                 true
             );

             const refreshToken = await signRefreshToken(user.id);

             res.cookie('accessToken', accessToken, {
                 httpOnly: true,
                 secure: process.env.NODE_ENV === 'production',
                 sameSite: process.env.NODE_ENV === 'production' ? 'Lax' : 'Strict',
                 maxAge: 24 * 60 * 60 * 1000 // 1 day
             })

             res.cookie('refreshToken', refreshToken, {
                 httpOnly: true,
                 secure: process.env.NODE_ENV === 'production',
                 sameSite: process.env.NODE_ENV === 'production' ? 'Lax' : 'Strict',
                 maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
             })

             res.status(200).json({
                 user: {
                     id: user.id,
                     userName: user.userName
                 },
                 message: 'You have successfully logged in',
             });

             console.log(`User ${user.userName} logged in successfully`);
         } catch (error) {
             if (error.isJoi === true) {
                 return res.status(400).json({ success: false, error: error.message });
             }
             console.error('Login failed:', error.message);
             res.status(error.status || 500).json({ success: false, error: error.message || 'Internal Server Error' });
        }
     }),

     // @desc Authenticate the user to logout
        // @route POST /api/auth/logout
        // @access public

    logout: asyncHandler(async (req, res) => {
        try {
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');

            res.status(200).json({ message: 'Logout is successful' });
        } catch (error) {
            console.error('Error during logout:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
     }),
     
}