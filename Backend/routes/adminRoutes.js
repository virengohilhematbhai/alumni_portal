const express = require('express');
const router = express.Router();
const {
  getStats,
  getWhitelist,
  addWhitelist,
  addBulkWhitelist,
  updateWhitelist,
  removeWhitelist,
  deleteWhitelistBulk,
  getStudents,
  updateAlumniProfile,
  toggleBlock,
  deleteUser,
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getMentorships,
  createMentorship,
  updateMentorshipStatus,
  deleteMentorship,
} = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// All admin routes require JWT protection + admin privileges
router.use(protect, adminOnly);

// Stats & Overview
router.get('/stats', getStats);

// Whitelist Management Routes
router.get('/whitelist', getWhitelist);
router.post('/whitelist', addWhitelist);
router.post('/whitelist/bulk', addBulkWhitelist);
router.put('/whitelist/:id', updateWhitelist);
router.delete('/whitelist/:id', removeWhitelist);
router.post('/whitelist/delete-bulk', deleteWhitelistBulk);

// Alumni / Students Management Routes
router.get('/students', getStudents);
router.put('/students/:id', updateAlumniProfile);
router.patch('/block/:id', toggleBlock);
router.delete('/user/:emailOrId', deleteUser);
router.delete('/students/:emailOrId', deleteUser);

// Events Management Routes
router.get('/events', getEvents);
router.post('/events', createEvent);
router.put('/events/:id', updateEvent);
router.delete('/events/:id', deleteEvent);

// Mentorship Management Routes
router.get('/mentorships', getMentorships);
router.post('/mentorships', createMentorship);
router.patch('/mentorships/:id/status', updateMentorshipStatus);
router.delete('/mentorships/:id', deleteMentorship);

module.exports = router;
