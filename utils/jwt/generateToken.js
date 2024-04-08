const jwt = require("jsonwebtoken");
require("dotenv").config();
const generateToken = (user) => {
  try {
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1D" }
    );
    return token;
  } catch (error) {
    console.log("Problem generating tokens", error);
    return false;
  }
};

module.exports = generateToken;
