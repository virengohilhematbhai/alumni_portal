const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: 'Campus Memory',
    },
    category: {
      type: String,
      default: 'Campus Life',
    },
    imageUrl: {
      type: String,
      required: true,
    },
    uploader: {
      type: String,
      default: 'Faculty / Admin',
    },
    date: {
      type: String,
      default: () => new Date().toISOString().split('T')[0],
    },
    status: {
      type: String,
      default: 'Published',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Gallery', gallerySchema);
