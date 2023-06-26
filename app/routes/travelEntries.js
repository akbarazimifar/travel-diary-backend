const express = require('express');
const { authenticate } = require('../middleware/auth');
const { getDatabase } = require('../db/mongo');

const router = express.Router();

// Get all travel entries
router.get('/', authenticate, async (req, res) => {
  try {
    const collection = getDatabase().collection('travelEntries');
    const entries = await collection.find({ userId: req.user._id }).toArray();
    res.json(entries);
  } catch (error) {
    console.error('Error retrieving travel entries:', error);
    res.status(500).json({ message: 'Failed to retrieve travel entries' });
  }
});

// Get a specific travel entry by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const collection = getDatabase().collection('travelEntries');
    const entry = await collection.findOne({ _id: req.params.id, userId: req.user._id });

    if (!entry) {
      return res.status(404).json({ message: 'Travel entry not found' });
    }

    res.json(entry);
  } catch (error) {
    console.error('Error retrieving travel entry:', error);
    res.status(500).json({ message: 'Failed to retrieve travel entry' });
  }
});

// Create a new travel entry
router.post('/', authenticate, async (req, res) => {
  try {
    console.log(req.user)
    const collection = getDatabase().collection('travelEntries');
    const newEntry = { ...req.body, userId: req.user._id };
    console.log(newEntry)
    const result = await collection.insertOne(newEntry);
    console.log(result)
    res.status(201).json({ _id: result.insertedId });
  } catch (error) {
    console.error('Error creating travel entry:', error);
    res.status(500).json({ message: 'Failed to create travel entry' });
  }
});

// Update a travel entry
router.put('/:id', authenticate, async (req, res) => {
  try {
    const collection = getDatabase().collection('travelEntries');
    const updatedEntry = { ...req.body };
    const result = await collection.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { $set: updatedEntry },
      { returnDocument: 'after' }
    );

    if (!result.value) {
      return res.status(404).json({ message: 'Travel entry not found' });
    }

    res.json(result.value);
  } catch (error) {
    console.error('Error updating travel entry:', error);
    res.status(500).json({ message: 'Failed to update travel entry' });
  }
});

// Delete a travel entry
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const collection = getDatabase().collection('travelEntries');
    const result = await collection.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });

    if (!result.value) {
      return res.status(404).json({ message: 'Travel entry not found' });
    }

    res.json(result.value);
  } catch (error) {
    console.error('Error deleting travel entry:', error);
    res.status(500).json({ message: 'Failed to delete travel entry' });
  }
});

module.exports = router;
