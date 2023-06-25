const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config');
const users = require('../config/users');

const router = express.Router();

router.post('/signin', (req, res) => {
  const { username, password } = req.body;

  // Find the user in the mock user data
  const user = users.find(user => user.username === username && user.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate a JWT with the user's information
  const token = jwt.sign({ username: user.username }, config.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
});

module.exports = router;
