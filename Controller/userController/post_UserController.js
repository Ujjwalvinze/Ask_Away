const bcrypt = require("bcryptjs");
const User = require("../../Model/User");
const userExists = require("../../utils/userUtils/userExists");
const verifyPassword = require("../../utils/userUtils/verifyPassword");
const generateToken = require("../../utils/jwt/generateToken");

const createUserCtrl = async (req, res) => {
  const { email, username, password, profilePicture, about, socials, tags } =
    req.body;

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    const user = await User.create({
      email,
      username,
      password: hashPassword,
      profilePicture,
      about,
      socials,
      tags,
    });

    return res.json({
      msg: "User Created",
      user: user,
    });
  } catch (error) {
    console.log("Error while creating user", error);
    return res.sendStatus(400);
  }
};

const loginUsernameCtrl = async (req, res) => {
  const { username, password } = req.body;
  if (!(await userExists(username))) {
    return res.json({ message: "User doesn't exist" });
  }

  const user = await verifyPassword(username, password);

  if (!user) {
    return res.json({ message: "Wrong password" });
  }

  const token = generateToken(user);

  return res.json({
    message: "Login Success",
    User: { message: "Login Success", token, user },
  });
};

const loginEmailCtrl = async (req, res) => {
  const { email, password } = req.body;
  if (!(await userExists(undefined, email))) {
    return res.json({ message: "User doesn't exist" });
  }

  const user = await verifyPassword(undefined, password, email);

  if (!user) {
    return res.json({ message: "Wrong password" });
  }

  const token = generateToken(user);

  return res.json({
    message: "Login Success",
    User: { message: "Login Success", email, token },
  });
};

module.exports = {
  createUserCtrl,
  loginUsernameCtrl,
  loginEmailCtrl,
};
