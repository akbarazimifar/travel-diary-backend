const express = require('express');
const cors = require('cors');
const travelEntriesRoutes = require('./routes/travelEntries');
const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/travel-entries', travelEntriesRoutes);
app.use('/api/auth', authRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
