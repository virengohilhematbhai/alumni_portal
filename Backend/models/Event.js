const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      default: '10:00 AM - 04:00 PM IST',
    },
    location: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['Reunion', 'Webinar', 'Networking', 'Workshop', 'General'],
      default: 'General',
    },
    attendeesCount: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    },
    description: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: String,
      default: 'Admin',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
