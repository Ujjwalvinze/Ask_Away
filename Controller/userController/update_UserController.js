const User = require("../../Model/User");
const getTokenFromHeader = require("../../utils/jwt/getTokenFromHeader");
const verifyToken = require("../../utils/jwt/verifyToken");

const updateUsernameCtrl = async (req, res) => {
  const token = getTokenFromHeader(req);
  const userDetails = verifyToken(token);
  const newUserName = req.body.username;
  try {
    const userId = userDetails.id;
    const userFound = await User.findOneAndUpdate(
      { _id: userId },
      { username: newUserName },
      { new: true }
    );

    if (!userFound) return res.json({ msg: "No user found" });

    return res.json({ msg: "User updated", user: userFound });
  } catch (error) {
    console.log("Error Updating user", error);
    return res.send(400);
  }
};

const updatePasswordCtrl = async (req, res) => {
  const token = getTokenFromHeader(req);
  const userDetails = verifyToken(token);
  const newPassword = req.body.password;
  try {
    const userId = userDetails.id;
    const userFound = await User.findOneAndUpdate(
      { _id: userId },
      { password: newPassword },
      { new: true }
    );

    if (!userFound) return res.json({ msg: "No user found" });

    return res.json({ msg: "User updated", user: userFound });
  } catch (error) {
    console.log("Error Updating user", error);
    return res.send(400);
  }
};

const updateAboutCtrl = async (req, res) => {
  const token = getTokenFromHeader(req);
  const userDetails = verifyToken(token);
  const newAbout = req.body.about;
  try {
    const userId = userDetails.id;
    const userFound = await User.findOneAndUpdate(
      { _id: userId },
      { about: newAbout },
      { new: true }
    );

    if (!userFound) return res.json({ msg: "No user found" });

    return res.json({ msg: "User updated", user: userFound });
  } catch (error) {
    console.log("Error Updating user", error);
    return res.send(400);
  }
};
const updateSocialsCtrl = async (req, res) => {
  const token = getTokenFromHeader(req);
  const userDetails = verifyToken(token);
  const newSocial = req.body.social;
  try {
    const userId = userDetails.id;
    const userFound = await User.findOneAndUpdate(
      { _id: userId },
      { social: newSocial },
      { new: true }
    );

    if (!userFound) return res.json({ msg: "No user found" });

    return res.json({ msg: "User updated", user: userFound });
  } catch (error) {
    console.log("Error Updating user", error);
    return res.send(400);
  }
};

const updateTagsCtrl = async (req, res) => {
  const token = getTokenFromHeader(req);
  const userDetails = verifyToken(token);
  const newTags = req.body.tags;
  try {
    const userId = userDetails.id;
    const userFound = await User.findOneAndUpdate(
      { _id: userId },
      { tags: newTags },
      { new: true }
    );

    if (!userFound) return res.json({ msg: "No user found" });

    return res.json({ msg: "User updated", user: userFound });
  } catch (error) {
    console.log("Error Updating user", error);
    return res.send(400);
  }
};

module.exports = {
  updateUsernameCtrl,
  updatePasswordCtrl,
  updateAboutCtrl,
  updateSocialsCtrl,
  updateTagsCtrl,
};
