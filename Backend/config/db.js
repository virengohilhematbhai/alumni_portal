const mongoose = require('mongoose');
const seedAdminAndWhitelist = require('./seedAdminAndWhitelist');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    // Initialize Admin account & 20 approved whitelist emails
    await seedAdminAndWhitelist();
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
