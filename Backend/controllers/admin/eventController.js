const Event = require('../../models/Event');

// @desc    Get all events
// @route   GET /api/admin/events
// @access  Private/Admin
const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    console.error('getEvents error:', error.message);
    res.status(500).json({ message: 'Error fetching events' });
  }
};

// @desc    Create new event
// @route   POST /api/admin/events
// @access  Private/Admin
const createEvent = async (req, res) => {
  try {
    const { title, date, time, location, category, description, image, featured } = req.body;
    if (!title || !date || !location || !description) {
      return res.status(400).json({ message: 'Title, date, location, and description are required' });
    }

    const event = await Event.create({
      title,
      date,
      time: time || '10:00 AM - 04:00 PM IST',
      location,
      category: category || 'General',
      description,
      image: image || 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
      featured: featured || false,
      createdBy: req.user ? req.user.email : 'Admin',
    });

    res.status(201).json(event);
  } catch (error) {
    console.error('createEvent error:', error.message);
    res.status(500).json({ message: 'Error creating event' });
  }
};

// @desc    Update existing event
// @route   PUT /api/admin/events/:id
// @access  Private/Admin
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const { title, date, time, location, category, description, image, featured, attendeesCount } = req.body;
    if (title) event.title = title;
    if (date) event.date = date;
    if (time) event.time = time;
    if (location) event.location = location;
    if (category) event.category = category;
    if (description) event.description = description;
    if (image) event.image = image;
    if (featured !== undefined) event.featured = featured;
    if (attendeesCount !== undefined) event.attendeesCount = attendeesCount;

    await event.save();
    res.json(event);
  } catch (error) {
    console.error('updateEvent error:', error.message);
    res.status(500).json({ message: 'Error updating event' });
  }
};

// @desc    Delete event
// @route   DELETE /api/admin/events/:id
// @access  Private/Admin
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    await event.deleteOne();
    res.json({ message: 'Event deleted successfully', id: req.params.id });
  } catch (error) {
    console.error('deleteEvent error:', error.message);
    res.status(500).json({ message: 'Error deleting event' });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
