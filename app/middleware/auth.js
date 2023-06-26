const jwt = require('jsonwebtoken');
const { getDatabase } = require('../db/mongo');
const { JWT_SECRET } = require('../config');
const { ObjectId } = require('mongodb')

async function authenticate(req, res, next) {
  // Get the token from the request header
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded)

    // Get the user from the database based on the decoded token
    const usersCollection = getDatabase().collection('users');
    console.log(usersCollection.get)
    const user = await usersCollection.findOne({ _id: new ObjectId(decoded.userId) });
    console.log(user)

    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Attach the user object to the request for further use
    req.user = user;

    next();
  } catch (error) {
    console.error('Error authenticating:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = { authenticate };
