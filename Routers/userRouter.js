const express = require("express");
const userRouter = express.Router();
const isLoggedIn = require("../middlewares/userMiddlewares/isLoggedIn");

const {
  createUserCtrl,
  loginUsernameCtrl,
  loginEmailCtrl,
} = require("../Controller/userController/post_UserController");
const {
  checkUsernameCtrl,
  checkEmailCtrl,
  getUserByIdCtrl,
  getAllUsers,
  getUserByUsernameCtrl,
  getUsersByPhraseCtrl,
  getUserByToken,
} = require("../Controller/userController/get_UserController");
const {
  updateUsernameCtrl,
  updatePasswordCtrl,
  updateAboutCtrl,
  updateSocialsCtrl,
  updateTagsCtrl,
} = require("../Controller/userController/update_UserController");
const {
  deleteUserCtrl,
} = require("../Controller/userController/delete_UserController");

// post
userRouter.post("/", createUserCtrl);
userRouter.post("/login-username", loginUsernameCtrl);
userRouter.post("/login-email", loginEmailCtrl);

//get
userRouter.get("/check-username/:username", checkUsernameCtrl);
userRouter.get("/allusers", getAllUsers);
userRouter.get("/check-email/:email", checkEmailCtrl);
userRouter.get("/", getUsersByPhraseCtrl);
// userRouter.get("/:username", getUserByUsernameCtrl);
userRouter.get("/:id", getUserByIdCtrl);
userRouter.get("/fromtoken/:token", getUserByToken);

//update
userRouter.put("/update-username", isLoggedIn, updateUsernameCtrl);
userRouter.put("/update-password", isLoggedIn, updatePasswordCtrl);
userRouter.put("/update-about", isLoggedIn, updateAboutCtrl);
userRouter.put("/update-socials", isLoggedIn, updateSocialsCtrl);
userRouter.put("/update-tags", isLoggedIn, updateTagsCtrl);
// userRouter.put("/update-profilepic", isLoggedIn);

//delete
userRouter.delete("/", isLoggedIn, deleteUserCtrl);

module.exports = userRouter;

/* *left -
 * update- * MAYBE CREATE OPEARATIONS API TO HAVE ALL OPERATIONS COMMON TO ALL DOCUMENTS SUCH AS SCORE,SAVES, FOLLOWING
 * update score (calculated by comments, answers, questions) (after every updation, calculate badges)
 * update questions followed
 * update answers followed
 * update questions saved (also update question's saves count)
 * update answers saved
 * update last visited
 *
 * delete
 * delete user (delete all related questions, answers & comments)
 *
 *
 *
 *
 *
 *  all routes needed-
 * create user(signup)
 * login user
 *
 * delete user
 *
 *
 *
 * updation -
 * username
 * password
 * social
 * about
 * tag
 * profile pic
 *
 *
 * get -
 * get user (personal/admin) // protected by isloggedin
 * user by id
 * user by username
 * all users
 * all users having a common string
 */
