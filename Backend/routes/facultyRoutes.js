const express = require('express');
const router = express.Router();
const {
  getFaculty,
  createFaculty,
  updateFaculty,
  deleteFaculty,
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getGalleryAdmin,
  createGalleryItem,
  deleteGalleryItem,
} = require('../controllers/admin');
const { protect, facultyOrAdmin } = require('../middleware/authMiddleware');

// Public Gallery GET API (Accessible by all users and main gallery page)
router.get('/gallery', getGalleryAdmin);

// All other faculty routes require JWT protection + faculty/admin privileges
router.use(protect, facultyOrAdmin);

// Faculty Members API
router.get('/members', getFaculty);
router.post('/members', createFaculty);
router.put('/members/:id', updateFaculty);
router.delete('/members/:id', deleteFaculty);

// Faculty Events API
router.get('/events', getEvents);
router.post('/events', createEvent);
router.put('/events/:id', updateEvent);
router.delete('/events/:id', deleteEvent);

// Faculty Gallery API (Write / Delete operations)
router.post('/gallery', createGalleryItem);
router.delete('/gallery/:id', deleteGalleryItem);

module.exports = router;
