const express = require('express');
const { v4: uuid } = require('uuid');
const authenticate = require('../middleware/auth');

const router = express.Router();

const travelEntries = [
  {
    id: '1',
    userId: '12345',
    title: 'My Trip to Paris',
    location: 'Paris, France',
    description: 'I had an amazing time exploring the beautiful city of Paris.',
  },
  // Other travel entries
];

// Protected route: Create a new travel entry
router.post('/', authenticate, (req, res) => {
  const userId = req.user.id;
  const travelEntryId = uuid();

  const newTravelEntry = {
    id: travelEntryId,
    userId: userId,
    title: req.body.title,
    location: req.body.location,
    description: req.body.description,
  };

  travelEntries.push(newTravelEntry);
  res.status(201).json(newTravelEntry);
});

// Protected route: Retrieve all travel entries
router.get('/', authenticate, (req, res) => {
  const userId = req.user.id;

  const userTravelEntries = travelEntries.filter(entry => entry.userId === userId);
  res.json(userTravelEntries);
});

// Protected route: Retrieve a specific travel entry
router.get('/:id', authenticate, (req, res) => {
  const userId = req.user.id;

  const travelEntry = travelEntries.find(entry => entry.id === req.params.id && entry.userId === userId);

  if (!travelEntry) {
    res.status(404).json({ error: 'Travel entry not found' });
  } else {
    res.json(travelEntry);
  }
});

// Protected route: Update a travel entry
router.put('/:id', authenticate, (req, res) => {
  const userId = req.user.id;

  const travelEntry = travelEntries.find(entry => entry.id === req.params.id && entry.userId === userId);

  if (!travelEntry) {
    res.status(404).json({ error: 'Travel entry not found' });
  } else {
    travelEntry.title = req.body.title;
    travelEntry.location = req.body.location;
    travelEntry.description = req.body.description;

    res.json(travelEntry);
  }
});

// Protected route: Delete a travel entry
router.delete('/:id', authenticate, (req, res) => {
  const userId = req.user.id;

  const index = travelEntries.findIndex(entry => entry.id === req.params.id && entry.userId === userId);

  if (index === -1) {
    res.status(404).json({ error: 'Travel entry not found' });
  } else {
    const deletedEntry = travelEntries.splice(index, 1);
    res.json(deletedEntry[0]);
  }
});

module.exports = router;
