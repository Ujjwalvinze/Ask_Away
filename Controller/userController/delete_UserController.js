const User = require("../../Model/User");
const getTokenFromHeader = require("../../utils/jwt/getTokenFromHeader");
const verifyToken = require("../../utils/jwt/verifyToken");
const userExists = require("../../utils/userUtils/userExists");

// ************** PENDING ***************************
// Needs to be done after all the ques,ans,comment routing is finished
// delete all user - ans, ques, comments when deleting user

const deleteUserCtrl = async (req, res) => {
  const token = getTokenFromHeader(req);
  const user = verifyToken(token);

  try {
    if (deletedUser == null || !(await userExists(deletedUser.username))) {
      return res.json({ message: "User doesn't exist" });
    }

    const deletedUser = await User.findByIdAndDelete(user.id);

    return res.json({ message: "User Deleted", deletedUser });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Problem deleting user" });
  }
};

module.exports = { deleteUserCtrl };
