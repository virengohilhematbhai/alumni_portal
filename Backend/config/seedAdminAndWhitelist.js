const User = require('../models/User');
const Whitelist = require('../models/Whitelist');

const DEFAULT_20_APPROVED_EMAILS = [


];

const seedAdminAndWhitelist = async () => {
  try {
    // Seed Admin Account (viren@gmail.com)
    const adminEmail = 'viren@gmail.com';
    let adminUser = await User.findOne({ email: adminEmail });

    if (!adminUser) {
      adminUser = await User.create({
        name: 'Viren Gohil (Admin)',
        email: adminEmail,
        company: 'Gardi Vidyapith Administration',
        password: 'Viren@123',
        role: 'admin',
        isAdmin: true,
        isBlocked: false,
      });
      console.log('✅ Admin user created: viren@gmail.com (Password: Viren@123)');
    } else if (!adminUser.isAdmin || adminUser.role !== 'admin') {
      adminUser.isAdmin = true;
      adminUser.role = 'admin';
      adminUser.isBlocked = false;
      await adminUser.save();
      console.log('✅ Admin user role updated: viren@gmail.com');
    }

    // Seed 20 Approved Emails in Whitelist
    for (const email of DEFAULT_20_APPROVED_EMAILS) {
      const exists = await Whitelist.findOne({ email: email.toLowerCase() });
      if (!exists) {
        await Whitelist.create({
          email: email.toLowerCase(),
          addedBy: 'System Default',
        });
      }
    }
    console.log(`✅ Whitelist initialized with 20 approved college student email IDs`);
  } catch (error) {
    console.error('⚠️ Seeding error:', error.message);
  }
};

module.exports = seedAdminAndWhitelist;
