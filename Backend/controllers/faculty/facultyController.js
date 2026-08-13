const User = require('../../models/User');
const Whitelist = require('../../models/Whitelist');

let inMemoryFaculty = [
  {
    id: 'fac-1',
    name: 'Dr. Ramesh Sharma',
    email: 'ramesh.sharma@gardicollege.edu.in',
    department: 'Computer Engineering',
    designation: 'Professor & HOD',
    accessLevel: 'Full Access',
    status: 'Active',
    joinedDate: '2018-06-15',
    phone: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'fac-2',
    name: 'Prof. Sunita Patel',
    email: 'sunita.patel@gardicollege.edu.in',
    department: 'Information Technology',
    designation: 'Associate Professor',
    accessLevel: 'Event & Gallery Manager',
    status: 'Active',
    joinedDate: '2020-02-10',
    phone: '+91 98765 12345',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'fac-3',
    name: 'Dr. Rajesh Verma',
    email: 'rajesh.verma@gardicollege.edu.in',
    department: 'Mechanical Engineering',
    designation: 'Assistant Professor',
    accessLevel: 'Event Coordinator',
    status: 'Active',
    joinedDate: '2021-08-01',
    phone: '+91 98123 45678',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
];

const getFaculty = async (req, res) => {
  try {
    let facultyUsers = [];
    try {
      facultyUsers = await User.find({ role: 'faculty' }).select('-password');
    } catch (e) {
      console.log('MongoDB faculty search skipped');
    }

    const dbFormatted = (facultyUsers || []).map((f) => ({
      id: f._id.toString(),
      name: f.fullName || f.name,
      email: f.email,
      department: f.department || 'General',
      designation: f.designation || 'Faculty Member',
      accessLevel: f.accessLevel || 'Faculty Access',
      status: f.isBlocked ? 'Blocked' : 'Active',
      joinedDate: f.createdAt ? f.createdAt.toISOString().split('T')[0] : '2022-01-01',
      phone: f.phone || '+91 99000 00000',
      avatar: f.profilePicture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    }));

    const existingEmails = new Set(dbFormatted.map((f) => f.email.toLowerCase()));
    const filteredInMemory = inMemoryFaculty.filter((f) => !existingEmails.has(f.email.toLowerCase()));

    return res.json([...dbFormatted, ...filteredInMemory]);
  } catch (error) {
    console.error('Error fetching faculty:', error);
    res.status(500).json({ message: 'Failed to fetch faculty list', error: error.message });
  }
};

const createFaculty = async (req, res) => {
  try {
    const { name, email, password, department, designation, accessLevel, phone } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and Email are required' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const userPassword = password || 'Faculty@123';

    let createdUser = null;
    try {
      let existingUser = await User.findOne({ email: cleanEmail });
      if (existingUser) {
        existingUser.name = name.trim();
        existingUser.password = userPassword;
        existingUser.role = 'faculty';
        existingUser.department = department || 'Computer Engineering';
        existingUser.designation = designation || 'Assistant Professor';
        existingUser.accessLevel = accessLevel || 'Faculty Access';
        existingUser.phone = phone || '+91 99000 00000';
        existingUser.isBlocked = false;
        await existingUser.save();
        createdUser = existingUser;
      } else {
        createdUser = await User.create({
          name: name.trim(),
          email: cleanEmail,
          password: userPassword,
          role: 'faculty',
          department: department || 'Computer Engineering',
          designation: designation || 'Assistant Professor',
          accessLevel: accessLevel || 'Faculty Access',
          phone: phone || '+91 99000 00000',
          isAdmin: false,
          isBlocked: false,
        });
      }
    } catch (e) {
      console.log('MongoDB User create/update skipped:', e.message);
    }

    try {
      const existingWhitelist = await Whitelist.findOne({ email: cleanEmail });
      if (existingWhitelist) {
        existingWhitelist.role = 'faculty';
        existingWhitelist.name = name;
        existingWhitelist.department = department;
        await existingWhitelist.save();
      } else {
        await Whitelist.create({
          email: cleanEmail,
          role: 'faculty',
          name,
          department,
        });
      }
    } catch (e) {
      // Ignored if already whitelisted
    }

    const newFaculty = {
      id: createdUser ? createdUser._id.toString() : `fac-${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      department: department || 'Computer Engineering',
      designation: designation || 'Assistant Professor',
      accessLevel: accessLevel || 'Event & Gallery Manager',
      status: 'Active',
      joinedDate: new Date().toISOString().split('T')[0],
      phone: phone || '+91 99000 00000',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    };

    inMemoryFaculty.unshift(newFaculty);
    res.status(201).json(newFaculty);
  } catch (error) {
    console.error('Error creating faculty:', error);
    res.status(500).json({ message: 'Failed to create faculty member', error: error.message });
  }
};

const updateFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const index = inMemoryFaculty.findIndex((f) => f.id === id);
    if (index !== -1) {
      inMemoryFaculty[index] = { ...inMemoryFaculty[index], ...updates };
      return res.json(inMemoryFaculty[index]);
    }
    res.status(404).json({ message: 'Faculty record not found' });
  } catch (error) {
    console.error('Error updating faculty:', error);
    res.status(500).json({ message: 'Failed to update faculty member', error: error.message });
  }
};

const deleteFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    const index = inMemoryFaculty.findIndex((f) => f.id === id);
    if (index !== -1) {
      inMemoryFaculty.splice(index, 1);
    }
    res.json({ message: 'Faculty record deleted successfully', id });
  } catch (error) {
    console.error('Error deleting faculty:', error);
    res.status(500).json({ message: 'Failed to delete faculty member', error: error.message });
  }
};

module.exports = {
  getFaculty,
  createFaculty,
  updateFaculty,
  deleteFaculty,
};
