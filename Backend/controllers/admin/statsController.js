const User = require('../../models/User');
const Whitelist = require('../../models/Whitelist');
const Event = require('../../models/Event');
const Mentorship = require('../../models/Mentorship');

// @desc    Get Admin Dashboard Stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getStats = async (req, res) => {
  try {
    const totalStudents = await Whitelist.countDocuments();
    const registeredStudents = await User.countDocuments({ role: 'student' });
    const activeUsers = await User.countDocuments({ role: 'student', isBlocked: false });
    const blockedUsers = await User.countDocuments({ role: 'student', isBlocked: true });
    const totalEvents = await Event.countDocuments();
    const activeMentorships = await Mentorship.countDocuments({ status: { $in: ['pending', 'approved'] } });

    res.json({
      totalStudents,
      registeredStudents,
      activeUsers,
      blockedUsers,
      totalEvents,
      activeMentorships,
    });
  } catch (error) {
    console.error('getStats error:', error.message);
    res.status(500).json({ message: 'Error loading admin stats' });
  }
};

module.exports = {
  getStats,
};
