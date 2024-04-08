const User = require("../../Model/User");

const userExists = async (username = undefined, email = undefined) => {
  let ifExists;
  if (username) ifExists = await User.count({ username: username });
  if (email) ifExists = await User.count({ email: email });

  if (ifExists) {
    return true;
  }

  return false;
};

module.exports = userExists;
