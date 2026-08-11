const User = require('../models/User');
const Whitelist = require('../models/Whitelist');
const Event = require('../models/Event');
const Mentorship = require('../models/Mentorship');

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

// @desc    Get all Whitelist emails with registration status
// @route   GET /api/admin/whitelist
// @access  Private/Admin
const getWhitelist = async (req, res) => {
  try {
    const whitelist = await Whitelist.find().sort({ createdAt: -1 });
    const registeredUsers = await User.find({ role: 'student' }).select('-password');

    const mappedWhitelist = whitelist.map((item) => {
      const registered = registeredUsers.find(
        (u) => u.email.toLowerCase() === item.email.toLowerCase()
      );
      return {
        _id: item._id,
        email: item.email,
        addedBy: item.addedBy,
        createdAt: item.createdAt,
        isRegistered: !!registered,
        registeredUser: registered || null,
      };
    });

    res.json(mappedWhitelist);
  } catch (error) {
    console.error('getWhitelist error:', error.message);
    res.status(500).json({ message: 'Error loading whitelist' });
  }
};

// @desc    Add email to approved whitelist
// @route   POST /api/admin/whitelist
// @access  Private/Admin
const addWhitelist = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email address is required' });
    }

    const cleanEmail = email.trim().toLowerCase();

    const exists = await Whitelist.findOne({ email: cleanEmail });
    if (exists) {
      return res.status(400).json({ message: 'Email is already in the approved list' });
    }

    const item = await Whitelist.create({
      email: cleanEmail,
      addedBy: req.user ? req.user.email : 'Admin',
    });

    res.status(201).json(item);
  } catch (error) {
    console.error('addWhitelist error:', error.message);
    res.status(500).json({ message: 'Error adding email to whitelist' });
  }
};

// @desc    Add multiple emails to approved whitelist in bulk
// @route   POST /api/admin/whitelist/bulk
// @access  Private/Admin
const addBulkWhitelist = async (req, res) => {
  try {
    const { emails } = req.body;
    if (!emails) {
      return res.status(400).json({ message: 'Emails input is required' });
    }

    let emailArray = [];
    if (Array.isArray(emails)) {
      emailArray = emails;
    } else if (typeof emails === 'string') {
      emailArray = emails.split(/[\n,;]+/).map((e) => e.trim());
    }

    const cleanEmails = Array.from(
      new Set(
        emailArray
          .map((e) => e.trim().toLowerCase())
          .filter((e) => e.length > 3 && e.includes('@'))
      )
    );

    if (cleanEmails.length === 0) {
      return res.status(400).json({ message: 'No valid email addresses provided' });
    }

    const existingDocs = await Whitelist.find({ email: { $in: cleanEmails } });
    const existingEmails = new Set(existingDocs.map((doc) => doc.email));

    const newEntries = cleanEmails
      .filter((e) => !existingEmails.has(e))
      .map((e) => ({
        email: e,
        addedBy: req.user ? req.user.email : 'Admin',
      }));

    if (newEntries.length > 0) {
      await Whitelist.insertMany(newEntries);
    }

    res.status(201).json({
      message: `Bulk whitelist processing complete. Added ${newEntries.length} new approved emails. (${existingEmails.size} already existed)`,
      addedCount: newEntries.length,
      skippedCount: existingEmails.size,
    });
  } catch (error) {
    console.error('addBulkWhitelist error:', error.message);
    res.status(500).json({ message: 'Error performing bulk whitelist import' });
  }
};

// @desc    Update an existing Whitelist email
// @route   PUT /api/admin/whitelist/:id
// @access  Private/Admin
const updateWhitelist = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email address is required' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const item = await Whitelist.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Whitelist entry not found' });
    }

    const exists = await Whitelist.findOne({ email: cleanEmail, _id: { $ne: req.params.id } });
    if (exists) {
      return res.status(400).json({ message: 'Email is already in the approved whitelist' });
    }

    item.email = cleanEmail;
    await item.save();

    res.json({ message: 'Whitelist entry updated successfully', item });
  } catch (error) {
    console.error('updateWhitelist error:', error.message);
    res.status(500).json({ message: 'Error updating whitelist entry' });
  }
};

// @desc    Remove email from approved whitelist
// @route   DELETE /api/admin/whitelist/:id
// @access  Private/Admin
const removeWhitelist = async (req, res) => {
  try {
    const item = await Whitelist.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Approved email entry not found' });
    }

    await item.deleteOne();
    res.json({ message: 'Email removed from approved list' });
  } catch (error) {
    console.error('removeWhitelist error:', error.message);
    res.status(500).json({ message: 'Error deleting whitelist entry' });
  }
};

// @desc    Bulk delete selected Whitelist entries
// @route   POST /api/admin/whitelist/delete-bulk
// @access  Private/Admin
const deleteWhitelistBulk = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'Array of entry IDs is required' });
    }

    const result = await Whitelist.deleteMany({ _id: { $in: ids } });
    res.json({
      message: `Successfully deleted ${result.deletedCount} entries from approved whitelist.`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error('deleteWhitelistBulk error:', error.message);
    res.status(500).json({ message: 'Error bulk deleting whitelist entries' });
  }
};

// @desc    Get all registered students/alumni with search & filter
// @route   GET /api/admin/students
// @access  Private/Admin
const getStudents = async (req, res) => {
  try {
    const { search, status } = req.query;

    let query = { role: 'student' };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
      ];
    }

    if (status === 'active') {
      query.isBlocked = false;
    } else if (status === 'blocked' || status === 'blacklisted') {
      query.isBlocked = true;
    }

    const students = await User.find(query).select('-password').sort({ createdAt: -1 });

    res.json(students);
  } catch (error) {
    console.error('getStudents error:', error.message);
    res.status(500).json({ message: 'Error fetching registered students' });
  }
};

// @desc    Update alumni/student profile info
// @route   PUT /api/admin/students/:id
// @access  Private/Admin
const updateAlumniProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Alumni profile not found' });
    }

    const { name, company, batch, role } = req.body;
    if (name) user.name = name;
    if (company !== undefined) user.company = company;
    if (batch !== undefined) user.batch = batch;
    if (role) user.role = role;

    await user.save();
    res.json({ message: 'Alumni profile updated successfully', user });
  } catch (error) {
    console.error('updateAlumniProfile error:', error.message);
    res.status(500).json({ message: 'Error updating alumni profile' });
  }
};

// @desc    Toggle block/unblock student (Blacklist / Restore)
// @route   PATCH /api/admin/block/:id
// @access  Private/Admin
const toggleBlock = async (req, res) => {
  try {
    const { reason } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'Student user not found' });
    }

    if (user.role === 'admin' || user.isAdmin) {
      return res.status(400).json({ message: 'Cannot block an Administrator account' });
    }

    user.isBlocked = !user.isBlocked;
    if (user.isBlocked && reason) {
      user.blacklistReason = reason;
    } else if (!user.isBlocked) {
      user.blacklistReason = '';
    }
    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isBlocked: user.isBlocked,
      blacklistReason: user.blacklistReason,
      message: `Account ${user.name} (${user.email}) has been ${user.isBlocked ? 'blacklisted/blocked' : 'restored/unblocked'} successfully`,
    });
  } catch (error) {
    console.error('toggleBlock error:', error.message);
    res.status(500).json({ message: 'Error updating student access status' });
  }
};

// @desc    Permanently delete a student user account & profile from MongoDB
// @route   DELETE /api/admin/user/:emailOrId
// @access  Private/Admin
const deleteUser = async (req, res) => {
  try {
    const { emailOrId } = req.params;

    if (!emailOrId) {
      return res.status(400).json({ message: 'Email or User ID is required' });
    }

    const cleanInput = emailOrId.trim().toLowerCase();
    let query = { email: cleanInput };

    if (emailOrId.match(/^[0-9a-fA-F]{24}$/)) {
      query = { $or: [{ _id: emailOrId }, { email: cleanInput }] };
    }

    const user = await User.findOne(query);

    if (!user) {
      return res.status(404).json({ message: 'Registered user account not found in MongoDB' });
    }

    if (user.role === 'admin' || user.isAdmin) {
      return res.status(400).json({ message: 'Cannot delete an Administrator account' });
    }

    const deletedEmail = user.email;
    const deletedName = user.name;

    await User.deleteOne({ _id: user._id });

    res.json({
      message: `User account (${deletedName} - ${deletedEmail}) and profile data permanently deleted from MongoDB successfully`,
      email: deletedEmail,
      _id: user._id,
    });
  } catch (error) {
    console.error('deleteUser error:', error.message);
    res.status(500).json({ message: 'Error deleting student account from MongoDB' });
  }
};

// --- EVENTS MANAGEMENT CONTROLLERS ---

const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    console.error('getEvents error:', error.message);
    res.status(500).json({ message: 'Error fetching events' });
  }
};

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

// --- MENTORSHIP MANAGEMENT CONTROLLERS ---

const getMentorships = async (req, res) => {
  try {
    const mentorships = await Mentorship.find().sort({ createdAt: -1 });
    res.json(mentorships);
  } catch (error) {
    console.error('getMentorships error:', error.message);
    res.status(500).json({ message: 'Error fetching mentorship requests' });
  }
};

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
};
