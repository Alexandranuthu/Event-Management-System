const mongoose = require('mongoose');

const invalidatedTokensSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    invalidatedAt: {
        type: Date,
        required: true,
        default: Date.now, 
    }
});

const InvalidatedToken = mongoose.model('InvalidatedToken', invalidatedTokensSchema);

module.exports = InvalidatedToken;