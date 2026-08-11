const User = require('../models/User');
const Whitelist = require('../models/Whitelist');
const generateToken = require('../utils/generateToken');

// @desc    Register a new student user
// @route   POST /api/auth/register
// @access  Public (Whitelisted Students Only)
const registerUser = async (req, res) => {
  try {
    const { name, email, company, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Please fill in all required fields (name, email, password)',
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    if (password.length < 6) {
      return res.status(400).json({
        message: 'Password must be at least 6 characters',
      });
    }

    // 1. Check Whitelist in MongoDB
    const isWhitelisted = await Whitelist.findOne({ email: cleanEmail });
    if (!isWhitelisted) {
      return res.status(403).json({
        message: 'Access Restricted: This email address is not in the authorized alumni list.',
      });
    }

    // 2. Prevent duplicate registration
    const userExists = await User.findOne({ email: cleanEmail });
    if (userExists) {
      return res.status(400).json({
        message: 'An account with this email is already registered. Please log in.',
      });
    }

    // 3. Create student user
    const user = await User.create({
      name: name.trim(),
      email: cleanEmail,
      company: company && company.trim() ? company.trim() : 'Gardi Vidyapith Alumni',
      password,
      role: 'student',
      isAdmin: false,
      isBlocked: false,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      company: user.company,
      role: user.role,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Register error:', error.message);
    res.status(500).json({ message: 'Server error during registration. Please try again.' });
  }
};

// @desc    Authenticate user & get token (Admin or Whitelisted Student)
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Please provide both email and password',
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    // 1. Admin Login Handler (viren@gmail.com)
    if (cleanEmail === 'viren@gmail.com') {
      let adminUser = await User.findOne({ email: cleanEmail });

      if (!adminUser) {
        // Auto create admin if missing
        adminUser = await User.create({
          name: 'Viren Gohil (Admin)',
          email: cleanEmail,
          company: 'Gardi Vidyapith Administration',
          password: password,
          role: 'admin',
          isAdmin: true,
          isBlocked: false,
        });
      } else {
        const isMatch = await adminUser.matchPassword(password);
        if (!isMatch) {
          // If default password Viren@123 or entered password matches
          if (password === 'Viren@123' || password === 'viren123') {
            adminUser.password = password;
            await adminUser.save();
          } else {
            return res.status(401).json({ message: 'Invalid Admin credentials' });
          }
        }
      }

      return res.json({
        _id: adminUser._id,
        name: adminUser.name,
        email: adminUser.email,
        company: adminUser.company,
        role: 'admin',
        isAdmin: true,
        token: generateToken(adminUser._id),
      });
    }

    // 2. Whitelist Check for Students
    const isWhitelisted = await Whitelist.findOne({ email: cleanEmail });
    if (!isWhitelisted) {
      return res.status(403).json({
        message: 'Access Restricted: This email address is not in the authorized alumni list.',
      });
    }

    // 3. Find registered user in MongoDB
    const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      return res.status(404).json({
        message: 'No registered account found with this email. Please register first.',
      });
    }

    // 4. Check Blocked Status
    if (user.isBlocked) {
      return res.status(403).json({
        message: 'Your account has been blocked by the Administrator. Contact support for assistance.',
      });
    }

    // 5. Password Verification
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
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
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Server error during login. Please try again.' });
  }
};

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

module.exports = { registerUser, loginUser, getMe, updateProfile };
