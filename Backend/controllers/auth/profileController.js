const User = require('../../models/User');

// @desc    Get current logged-in user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.isBlocked) {
      return res.status(403).json({ message: 'Account blocked by Administrator' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      company: user.company,
      role: user.role || 'student',
      isAdmin: user.isAdmin || false,
      profilePhoto: user.profilePhoto || '',
      phone: user.phone || '',
      college: user.college || '',
      studentId: user.studentId || '',
      department: user.department || '',
      course: user.course || '',
      batchYear: user.batchYear || '',
      graduationYear: user.graduationYear || '',
      bio: user.bio || '',
    });
  } catch (error) {
    console.error('GetMe error:', error.message);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// @desc    Update current logged-in user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.isBlocked) {
      return res.status(403).json({ message: 'Account blocked by Administrator' });
    }

    const {
      name,
      company,
      profilePhoto,
      phone,
      college,
      studentId,
      department,
      course,
      batchYear,
      graduationYear,
      bio,
    } = req.body;

    if (name !== undefined) user.name = name.trim();
    if (company !== undefined) user.company = company.trim();
    if (profilePhoto !== undefined) user.profilePhoto = profilePhoto;
    if (phone !== undefined) user.phone = phone.trim();
    if (college !== undefined) user.college = college.trim();
    if (studentId !== undefined) user.studentId = studentId.trim();
    if (department !== undefined) user.department = department.trim();
    if (course !== undefined) user.course = course.trim();
    if (batchYear !== undefined) user.batchYear = batchYear.toString().trim();
    if (graduationYear !== undefined) user.graduationYear = graduationYear.toString().trim();
    if (bio !== undefined) user.bio = bio.trim();

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      company: updatedUser.company,
      role: updatedUser.role || 'student',
      isAdmin: updatedUser.isAdmin || false,
      profilePhoto: updatedUser.profilePhoto || '',
      phone: updatedUser.phone || '',
      college: updatedUser.college || '',
      studentId: updatedUser.studentId || '',
      department: updatedUser.department || '',
      course: updatedUser.course || '',
      batchYear: updatedUser.batchYear || '',
      graduationYear: updatedUser.graduationYear || '',
      bio: updatedUser.bio || '',
    });
  } catch (error) {
    console.error('Update profile error:', error.message);
    res.status(500).json({ message: 'Server error updating profile. Please try again.' });
  }
};

module.exports = {
  getMe,
  updateProfile,
};
