// authentication Controller
const User = require ('../models/userModel.js')
const { signAccessToken, verifyAccessToken, signRefreshToken, verifyRefreshToken } = require('../helpers/jwtHelper');
const { authSchema } = require('../auth/auth_schema.js');
const createHttpError = require('http-errors');

module.exports = {
        // @desc registering a new user
        // @route POST /api/auth/register
        // @access Public
    register: async (req, res) => {
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

            // Send success response with tokens
            res.status(201).json({
                accessToken,
                refreshToken,
                message: 'User registration completed successfully',
                user: savedUser
            });
        } catch (error) {
            if (error.isJoi === true) {
                return res.status(422).json({ success: false, error: error.message });
            }
            console.error('Registration not complete, there is an error', error);
            res.status(error.status || 500).json({ success: false, error: error.message ||'Internal Server Error' });
        }
    },

        // @desc Authenticate the user to login
        // @route Get /api/auth/login
        // @access public

}