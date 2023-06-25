const jwt = require('jsonwebtoken');
const config = require('../config');

// Authentication middleware function
const authenticate = (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.headers.authorization.split(' ')[1];
  console.debug(token)

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded; // Add the decoded user information to the request object
    next();
  } catch (error) {
    console.debug(error)
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = authenticate
