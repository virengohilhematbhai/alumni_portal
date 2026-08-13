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

// All faculty routes require JWT protection + faculty/admin privileges
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

// Faculty Gallery API
router.get('/gallery', getGalleryAdmin);
router.post('/gallery', createGalleryItem);
router.delete('/gallery/:id', deleteGalleryItem);

module.exports = router;
