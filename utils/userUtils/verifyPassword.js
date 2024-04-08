const bcrypt = require("bcryptjs");
const User = require("../../Model/User");

const verifyPassword = async (username, password, email = undefined) => {
  let userFound;
  if (username) userFound = await User.findOne({ username: username });
  else if (email) userFound = await User.findOne({ email: email });

  const isPasswordValid = await bcrypt.compare(password, userFound.password);

  if (!isPasswordValid) {
    return false;
  }

  return userFound;
};

module.exports = verifyPassword;
