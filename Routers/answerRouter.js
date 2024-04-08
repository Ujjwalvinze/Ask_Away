const express = require("express");
const answerRouter = express.Router();
const isLoggedIn = require("../middlewares/userMiddlewares/isLoggedIn");

const {
  createAnswerCtrl,
  deleteAnswerCtrl,
  updateAnswerCtrl,
  updateAnswerStatsCtrl,
  updateAnswerFollowingCtrl,
  getAllAnswers,
} = require("../Controller/answerController/answerController");

// get
answerRouter.get("/:quesId", getAllAnswers);
// post
answerRouter.post("/:userId", isLoggedIn, createAnswerCtrl);

// delete
answerRouter.delete("/:id", deleteAnswerCtrl);

// update
// needs isLoggedin for the author
answerRouter.put("/:id", isLoggedIn, updateAnswerCtrl); // updates the question content
// Doesn't need auth
answerRouter.put("/:id/:views", updateAnswerStatsCtrl); // updates the view and score
// needs isLoggedin for the user calling the update
answerRouter.put("/:id/:userId/:action", updateAnswerFollowingCtrl); // updates the followers of the question.

module.exports = answerRouter;
