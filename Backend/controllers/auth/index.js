const registerController = require('./registerController');
const loginController = require('./loginController');
const profileController = require('./profileController');


module.exports = {
  ...registerController,
  ...loginController,
  ...profileController,
};