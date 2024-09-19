const Crypto = require('crypto');


// generating a 62 byte random key for access token and convert it into a hexadecimal string
const accessTokenSecret = Crypto.randomBytes(62).toString('hex');
// generating a 62 byte random key for refresh token and convert it into a hexadecimal string
const refreshTokenSecret = Crypto.randomBytes(62).toString('hex');

console.table({ accessTokenSecret, refreshTokenSecret });