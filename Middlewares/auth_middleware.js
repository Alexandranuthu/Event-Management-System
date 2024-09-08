// const jwt = require('jsonwebtoken');
// const JWT_SECRET = 'your_jwt_secret_key';

// const authMiddleware = (req, res, next) => {
//   // Check for token in the Authorization header
//   const token = req.header('Authorization');
  
//   if (!token) {
//     return res.status(401).json({ error: 'No token, authorization denied' });
//   }

//   try {
//     // Verify the token
//     const decoded = jwt.verify(token, JWT_SECRET);
//     // Attach the decoded user to the request object
//     req.user = decoded;
//     next(); // Proceed to the next middleware or route handler
//   } catch (error) {
//     res.status(401).json({ error: 'Token is not valid' });
//   }
// };

// module.exports = authMiddleware;
