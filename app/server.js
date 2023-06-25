const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import routes
const travelEntriesRouter = require('./routes/travelEntries');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

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
