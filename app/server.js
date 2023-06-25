const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const passportJWT = require('./config/passport');

// Import routes
const travelEntriesRouter = require('./routes/travelEntries');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

// Apply authentication middleware to protected routes
app.use('/api/protected', authenticate);

// Base API route
const baseRoute = '/api';
app.use(baseRoute, travelEntriesRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong' });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
