const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// @desc    Get all public events
// @route   GET /api/events
// @access  Public
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    console.error('Public getEvents error:', error.message);
    res.status(500).json({ message: 'Error fetching public events' });
  }
});

// @desc    Get single event by ID
// @route   GET /api/events/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    console.error('Public getEventById error:', error.message);
    res.status(500).json({ message: 'Error fetching event details' });
  }
});

module.exports = router;
