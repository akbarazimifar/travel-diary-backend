const express = require('express');
const router = express.Router();

// Mock data for travel entries
const mockTravelEntries = [
  {
    id: 1,
    destination: 'Paris',
    dates: '2023-06-01 to 2023-06-05',
    activities: 'Visited the Eiffel Tower, Louvre Museum',
    highlights: 'Eiffel Tower night view',
  },
  {
    id: 2,
    destination: 'Tokyo',
    dates: '2023-07-10 to 2023-07-15',
    activities: 'Explored Shibuya, Akihabara',
    highlights: 'Sushi at Tsukiji Market',
  },
];

// GET /api/travel-entries - Get all travel entries
router.get('/travel-entries', (req, res) => {
  res.json(mockTravelEntries);
});

// GET /api/travel-entries/:id - Get a single travel entry by ID
router.get('/travel-entries/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const entry = mockTravelEntries.find((entry) => entry.id === id);
  if (!entry) {
    res.status(404).json({ error: 'Travel entry not found' });
  } else {
    res.json(entry);
  }
});

// POST /api/travel-entries - Create a new travel entry
router.post('/travel-entries', (req, res) => {
  // Here you can access the request body to get the data for the new travel entry
  // For now, we'll just return a success message with the hardcoded mock data
  const newEntry = {
    id: mockTravelEntries.length + 1,
    destination: 'New Destination',
    dates: '2023-08-01 to 2023-08-07',
    activities: 'Explored attractions',
    highlights: 'Memorable experience',
  };

  mockTravelEntries.push(newEntry);

  res.json({ message: 'Travel entry created successfully', entry: newEntry });
});

// DELETE /api/travel-entries/:id - Delete a travel entry by ID
router.delete('/travel-entries/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const entryIndex = mockTravelEntries.findIndex((entry) => entry.id === id);
  if (entryIndex === -1) {
    res.status(404).json({ error: 'Travel entry not found' });
  } else {
    const deletedEntry = mockTravelEntries.splice(entryIndex, 1);
    res.json({ message: 'Travel entry deleted successfully', entry: deletedEntry[0] });
  }
});

module.exports = router;
