// helpers/jwtHelper.js
// What it does: The signAccessToken function generates a JWT access token for a given user ID. This token contains the userId in the payload, is signed with a secret, and has an expiration time.
//Why it's useful: JWT tokens allow your application to securely authenticate users. When a user logs in, they receive this token, which they will use in future API requests. The server can verify the token to confirm the user’s identity.

const JWT = require('jsonwebtoken');
const config = require('../config/config');
const user = require('../models/userModel');
const createError = require('http-errors');

module.exports = {
    signAccessToken: (userId) => {
        //This function returns a Promise that resolves with a JWT token if the signing process is successful, or rejects with an error if it fails.
        return new Promise((resolve, reject) => {
           //the data to be encoded in the JWT
        const payload = { 
            user: userId,
        };
            const secret = process.env.ACCESS_TOKEN_SECRET;
            const options = {
                expiresIn: config.accessTokenExpiration,
                issuer: 'event-management-system.com', //helps identify who generated the token
                audience: userId, //specifies who the token is provided for in this case user with that id
            };
            // now we creating the JWT
            JWT.sign(payload, secret, options, (error, token) => {
                if (error) {
                    console.error(error.message);
                    reject(createError.InternalServerError());
                }
                resolve(token);
            })
        })
    },
    //middleware function to verify the access token
    verifyAccessToken: (req, res, next) => {
        
        if (!req.headers['authorization']) {
            return next(createError.Unauthorized()
            )};
        
        const authHeader = req.headers['authorization']; //get auth header

        const bearerToken = authHeader.split(' '); // Splitting the Authorization header value by space to extract 'Bearer' and the token
        const token = bearerToken[1];

        if (bearerToken.length !== 2 || bearerToken[0] !== 'Bearer') {
            return next(createError.Unauthorized());
        }

        JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if (err) {
                console.error('Error verifying access token', err.message);
                return next(createError.Unauthorized());
            }
            console.log('Token Payload:', payload);

            const userId = payload.userId;

            if (!userId) {
                return next(createError.Unauthorized('Invalid token payload'));
            }

            req.user = { id: userId };
            next();
        });
    },
};