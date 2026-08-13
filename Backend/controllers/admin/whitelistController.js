const User = require('../../models/User');
const Whitelist = require('../../models/Whitelist');

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

module.exports = {
  getWhitelist,
  addWhitelist,
  addBulkWhitelist,
  updateWhitelist,
  removeWhitelist,
  deleteWhitelistBulk,
};
