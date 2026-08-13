const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      if (req.user.isBlocked) {
        return res.status(403).json({ message: 'Access denied. Account is blocked.' });
      }

      next();
    } catch (error) {
      console.error('Auth middleware error:', error.message);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user && (req.user.isAdmin || req.user.role === 'admin')) {
    next();
  } else {
    return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
  }
};

const facultyOrAdmin = (req, res, next) => {
  if (
    req.user &&
    (req.user.isAdmin ||
      req.user.role === 'admin' ||
      req.user.role === 'faculty' ||
      req.user.role === 'Faculty' ||
      req.user.isFaculty)
  ) {
    return next();
  }
  next();
};

module.exports = { protect, adminOnly, facultyOrAdmin };
