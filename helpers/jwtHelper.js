// helpers/jwtHelper.js - is a module designed to manage JSON Web Tokens (JWT) in your application for user authentication and authorization.



const JWT = require('jsonwebtoken');
const config = require('../config/config');
const createError = require('http-errors');

//Handles the signing of JWTs with provided payload, secret, and options.
const signToken = (payload, secret, options) => {
    return new Promise((resolve, reject) => {
        JWT.sign(payload, secret, options, (error, token) => {
            if (error) {
                console.error('Error signing token:', error.message);
                return reject(createError.InternalServerError());
            }
            resolve(token);
        })
    })
};

//Handles the verification of JWTs and returns the decoded payload.
const verifyToken = (token, secret) => {
    return new Promise((resolve, reject) => {
        JWT.verify(token, secret, (err, payload) => {
            if (err) {
                console.error('Error verifying token:', err.message);
                if (err.name === 'TokenExpiredError') {
                    return reject(createError.Unauthorized('Token expired')); // Specific error for expired tokens
                }
                return reject(createError.Unauthorized('Invalid token')); // General error for token issues
            }
            resolve(payload);
        });
    });
};


module.exports = {
    //Generates an access token with user-specific payload and options.
    signAccessToken: (userId) => {
        const payload = {
            user: userId,
        };
        const secret = process.env.ACCESS_TOKEN_SECRET;
        const options = {
            expiresIn: config.accessTokenExpiration,
            issuer: 'event-management-system.com', //helps identify who generated the token
            audience: userId, //specifies who the token is provided for in this case user with that id
        };
        if (!secret) throw new Error('ACCESS_TOKEN_SECRET is not defined');
        return signToken(payload, secret, options);
    },

    //middleware function to verify the access token
    verifyAccessToken: (req, res, next) => {
        const authHeader = req.headers['authorization']; //get auth header
        if (!authHeader) return next(createError.Unauthorized('Authorization header missing'));

        const [scheme, token] = authHeader.split(' '); // Splitting the Authorization header value by space to extract 'Bearer' and the token
        if (scheme.toLowerCase() !== 'bearer' || !token) {
            return next(createError.Unauthorized('Invalid authorization format'));
        }

        verifyToken(token, process.env.ACCESS_TOKEN_SECRET)
            .then(payload => {
                req.user = { id: payload.user };
                next();
            })
            .catch(next);
    },

    //Generates a refresh token with general payload and options.
    signRefreshToken: async (userId) => {
        const payload = {user: userId};
        const options = {
            expiresIn: config.refreshTokenExpiration,
            issuer: 'event-management-system.com',
            audience: userId,
        };
        if (!process.env.REFRESH_TOKEN_SECRET) throw new Error('REFRESH_TOKEN_SECRET is not defined');
        try {
            return await signToken(payload, process.env.REFRESH_TOKEN_SECRET, options);

        } catch (error) {
            console.error('Error signing refresh token:', error.message);
            throw createError.InternalServerError();
        }
    },
    //Verifies the refresh token and extracts the user ID from the payload.
    verifyRefreshToken: async (refreshToken) => {
        return await verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET)
            .then(payload => payload.user)
            .catch(() => {
                throw createError.Unauthorized('Invalid or expired refresh token');
            });
    },
    //Middleware function to verify the access token and set the user information on the request object
    authenticateToken: (req, res, next) => {
        const authHeader = req.headers['authorization'];
        if (!authHeader) return next(createError.Unauthorized('Authorization header missing'));

        const [scheme, token] = authHeader.split(' ');
        if (scheme.toLowerCase() !== 'bearer' || !token) {
            return next(createError.Unauthorized('Invalid authorization format'));
        }

        verifyToken(token, process.env.ACCESS_TOKEN_SECRET)
            .then(payload => {
                req.user = payload;
                next();
            })
            .catch(next);
    }

};