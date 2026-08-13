const User = require('../../models/User');

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

module.exports = {
  getStudents,
  updateAlumniProfile,
  toggleBlock,
  deleteUser,
};
