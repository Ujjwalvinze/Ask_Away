const User = require("../../Model/User");
const verifyToken = require("../../utils/jwt/verifyToken");

const checkUsernameCtrl = async (req, res) => {
  const username = req.params.username;

  if (await userExists(username)) {
    return res.json(false);
  }
  return res.json(true);
};
const checkEmailCtrl = async (req, res) => {
  const email = req.params.email;

  if (await userExists(undefined, email)) {
    return res.json(false);
  }
  return res.json(true);
};
const getUserByUsernameCtrl = async (req, res) => {
  const username = req.params.username;

  try {
    const userFound = await User.findOne({ username: username });

    if (userFound) {
      return res.json({ user: userFound });
    }

    return res.json({ msg: "User Doesn't exist" });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
const getUserByIdCtrl = async (req, res) => {
  const userId = req.params.id;
  console.log("this = ", userId);
  try {
    const userFound = await User.findById(userId);

    if (userFound) {
      return res.json({ user: userFound });
    }

    return res.json({ msg: "User Doesn't exist" });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

const getUsersByPhraseCtrl = async (req, res) => {
  const phrase = req.body.phrase;
  const limit = 20;
  try {
    const users = await User.find({
      username: new RegExp("^" + phrase),
    }).limit(limit);

    return res.json({ users });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Error while getting users by phrase" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const usersFound = await User.aggregate([
      { $sort: { username: 1 } },
      { $limit: 100 },
    ]);

    if (usersFound) {
      return res.json({ user: usersFound });
    }

    return res.json({ msg: "User Doesn't exist" });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

// /user/fromtoken/:token
const getUserByToken = async (req, res) => {
  const token = req.params.token;
  let userDataFromToken;
  try {
    userDataFromToken = await verifyToken(token);
    if (userDataFromToken)
      return res.json({ msg: "Success", userData: userDataFromToken });
  } catch (error) {
    return res.json({ msg: "Failed to get user from token" });
  }

  // const fullUser

  // console.log("userDataFrom token - ", userDataFromToken);
  return res.status(401);
};

module.exports = {
  checkUsernameCtrl,
  checkEmailCtrl,
  getAllUsers,
  getUserByIdCtrl,
  getUserByUsernameCtrl,
  getUserByToken,
  getUsersByPhraseCtrl,
};
