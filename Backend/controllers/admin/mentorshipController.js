const Mentorship = require('../../models/Mentorship');

// @desc    Get all mentorship requests
// @route   GET /api/admin/mentorships
// @access  Private/Admin
const getMentorships = async (req, res) => {
  try {
    const mentorships = await Mentorship.find().sort({ createdAt: -1 });
    res.json(mentorships);
  } catch (error) {
    console.error('getMentorships error:', error.message);
    res.status(500).json({ message: 'Error fetching mentorship requests' });
  }
};

// @desc    Create new mentorship request
// @route   POST /api/admin/mentorships
// @access  Private/Admin
const createMentorship = async (req, res) => {
  try {
    const { studentName, studentEmail, mentorName, mentorEmail, topic, message } = req.body;
    if (!studentName || !studentEmail || !mentorName || !topic) {
      return res.status(400).json({ message: 'Student name, email, mentor name, and topic are required' });
    }

    const mentorship = await Mentorship.create({
      studentName,
      studentEmail,
      mentorName,
      mentorEmail: mentorEmail || '',
      topic,
      message: message || '',
      status: 'pending',
    });

    res.status(201).json(mentorship);
  } catch (error) {
    console.error('createMentorship error:', error.message);
    res.status(500).json({ message: 'Error creating mentorship request' });
  }
};

// @desc    Update mentorship status & notes
// @route   PATCH /api/admin/mentorships/:id/status
// @access  Private/Admin
const updateMentorshipStatus = async (req, res) => {
  try {
    const { status, notes, mentorName } = req.body;
    const mentorship = await Mentorship.findById(req.params.id);
    if (!mentorship) {
      return res.status(404).json({ message: 'Mentorship request not found' });
    }

    if (status) mentorship.status = status;
    if (notes !== undefined) mentorship.notes = notes;
    if (mentorName) mentorship.mentorName = mentorName;

    await mentorship.save();
    res.json(mentorship);
  } catch (error) {
    console.error('updateMentorshipStatus error:', error.message);
    res.status(500).json({ message: 'Error updating mentorship status' });
  }
};

// @desc    Delete mentorship record
// @route   DELETE /api/admin/mentorships/:id
// @access  Private/Admin
const deleteMentorship = async (req, res) => {
  try {
    const mentorship = await Mentorship.findById(req.params.id);
    if (!mentorship) {
      return res.status(404).json({ message: 'Mentorship record not found' });
    }

    await mentorship.deleteOne();
    res.json({ message: 'Mentorship record deleted', id: req.params.id });
  } catch (error) {
    console.error('deleteMentorship error:', error.message);
    res.status(500).json({ message: 'Error deleting mentorship record' });
  }
};

module.exports = {
  getMentorships,
  createMentorship,
  updateMentorshipStatus,
  deleteMentorship,
};
