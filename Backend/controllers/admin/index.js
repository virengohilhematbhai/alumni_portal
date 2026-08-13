const statsController = require('./statsController');
const whitelistController = require('./whitelistController');
const studentController = require('./studentController');
const eventController = require('./eventController');
const mentorshipController = require('./mentorshipController');
const facultyController = require('../faculty/facultyController');
const galleryController = require('./galleryController');

module.exports = {
  ...statsController,
  ...whitelistController,
  ...studentController,
  ...eventController,
  ...mentorshipController,
  ...facultyController,
  ...galleryController,
};
