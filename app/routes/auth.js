const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getDatabase } = require('../db/mongo');
const { JWT_SECRET } = require('../config')

const router = express.Router();

// User sign-in route
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Retrieve user from the database
    const usersCollection = getDatabase().collection('users');
    const user = await usersCollection.findOne({ email });

    // Check if the user exists and the password is correct
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate and return a JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.json({ token });
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).json({ message: 'Failed to sign in' });
  }
});

// User sign-up route
router.post('/signup', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the email is already registered
      const usersCollection = getDatabase().collection('users');
      const existingUser = await usersCollection.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
      }
  
      // Create a new user
      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = {
        email,
        password: hashedPassword,
      };
  
      const result = await usersCollection.insertOne(newUser);
      console.log(result)
  
      // Generate and return a JWT token
      const token = jwt.sign({ userId: result.insertedId }, JWT_SECRET);
      res.json({ token });
    } catch (error) {
      console.error('Error signing up:', error);
      res.status(500).json({ message: 'Failed to sign up' });
    }
});

module.exports = router;
