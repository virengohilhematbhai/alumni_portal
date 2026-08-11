const mongoose = require('mongoose');

const whitelistSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    addedBy: {
      type: String,
      default: 'Admin',
    },
  },
  {
    timestamps: true,
  }
);

const Whitelist = mongoose.model('Whitelist', whitelistSchema);

module.exports = Whitelist;
