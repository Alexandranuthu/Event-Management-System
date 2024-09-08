const crypto = require('crypto');

// Generate a random secret key (32 bytes long, 256 bits)
const secretKey = crypto.randomBytes(32).toString('hex');

console.log('Generated Secret Key:', secretKey);
