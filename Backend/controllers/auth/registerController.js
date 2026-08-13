const User = require('../../models/User');
const Whitelist = require('../../models/Whitelist');
const generateToken = require('../../utils/generateToken');

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

module.exports = {
  registerUser,
};
