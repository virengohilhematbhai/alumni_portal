const User = require('../../models/User');
const Whitelist = require('../../models/Whitelist');
const generateToken = require('../../utils/generateToken');

// @desc    Authenticate user & get token (Admin, Faculty, or Student)
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

    // 2. Whitelist Check
    const isWhitelisted = await Whitelist.findOne({ email: cleanEmail });
    if (!isWhitelisted) {
      return res.status(403).json({
        message: 'Access Restricted: This email address is not in the authorized list.',
      });
    }

    // 3. Find registered user in MongoDB
    let user = await User.findOne({ email: cleanEmail });

    if (!user) {
      if (isWhitelisted && isWhitelisted.role === 'faculty') {
        // Auto-create MongoDB User record for Faculty if created via Admin panel
        user = await User.create({
          name: isWhitelisted.name || 'Faculty Member',
          email: cleanEmail,
          password: password,
          role: 'faculty',
          isAdmin: false,
          isBlocked: false,
        });
      } else {
        return res.status(404).json({
          message: 'No registered account found with this email. Please register first.',
        });
      }
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
      // Fallback for default faculty password or admin assigned password reset
      if (user.role === 'faculty' && (password === 'Faculty@123' || password === 'faculty123')) {
        user.password = password;
        await user.save();
      } else {
        return res.status(401).json({
          message: 'Invalid email or password',
        });
      }
    }

    const assignedRole = user.role || (isWhitelisted && isWhitelisted.role) || 'student';

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      company: user.company,
      role: assignedRole,
      isAdmin: assignedRole === 'admin',
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

module.exports = {
  loginUser,
};
