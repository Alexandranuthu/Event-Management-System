const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const Mailgen = require('mailgen');
const asyncHandler = require('express-async-handler');
require('dotenv').config();

module.exports = {
    generateResetToken: asyncHandler(async (email) => {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('User not found');
        }

        const passwordResetToken = crypto.randomBytes(20).toString('hex');
        const passwordResetTokenExpiration = Date.now() + 3600000; //1 hour

        user.passwordResetToken = passwordResetToken;
        user.passwordResetTokenExpiration = passwordResetTokenExpiration;
        await user.save();

        return passwordResetToken;
    }),

    sendResetEmail: asyncHandler(async (email, passwordResetToken, userName) => {
        console.log('DEBUG: Username in sendResetEmail:', userName);

        const config = {
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
            debug: true,
        };
        const transporter = nodemailer.createTransport(config);

        const mailGenerator = new Mailgen({
            theme: "default",
            product: {
                name: "event-management-system",
                link: "https://mailgen.js/"
            }
        });


        const response = {
            body: {
                name: userName || "User",
                intro: `You can reset your password here`,
                action: {
                    instructions: 'Click the button below to reset your password:',
                    button: {
                        color: "#Ffc0cb",
                        text: "RESET PASSWORD",
                        link: `http://localhost:5000/api/auth/reset-password/${passwordResetToken}`
                    }
                },
                outro: "If you did not request this, please ignore this email.",
            }
        };
        
        const mail = mailGenerator.generate(response);

        const message = {
            from: `"Event-management-system" <${process.env.EMAIL}`,
            to: email,
            subject: "Reset Password",
            html: mail
        };

        await transporter.sendMail(message);
        console.log('Email has been sent successfully');
    }),

    resetPassword: asyncHandler(async (token, newPassword) => {
        console.log('Debug Token:', token); // Log the token received

        const user = await User.findOne({
            passwordResetToken: token,
            passwordResetTokenExpiration: { $gt: Date.now() },
        });

        console.log('Found User:', user); // Log the found user

        if (!user) {
            throw new Error('Invalid or expired token');
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        user.passwordResetToken = undefined;
        user.passwordResetTokenExpiration = undefined;

        await user.save();
        return true;
    })

}