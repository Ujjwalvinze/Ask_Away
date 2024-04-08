const express = require("express");
const questionRouter = express.Router();
const isLoggedIn = require("../middlewares/userMiddlewares/isLoggedIn");

const {
  createQuestionCtrl,
  getAllQuestions,
  getQuestionByPhraseCtrl,
  getQuestionByIdCtrl,
  deleteQuestionCtrl,
  updateQuestionCtrl,
  updateQuestionStatsCtrl,
  updateQuestionFollowingCtrl,
} = require("../Controller/questionController/questionController");

// post
questionRouter.post("/:userId", isLoggedIn, createQuestionCtrl);
// get
questionRouter.get("/allques", getAllQuestions);
questionRouter.get("/", getQuestionByPhraseCtrl);
questionRouter.get("/:id", getQuestionByIdCtrl);

// delete
questionRouter.delete("/:id", isLoggedIn, deleteQuestionCtrl);

// update
// needs isLoggedin for the author
questionRouter.put("/:id", isLoggedIn, updateQuestionCtrl); // updates the question content
// Doesn't need auth
questionRouter.put("/:id/:views", updateQuestionStatsCtrl); // updates the view and score
// needs isLoggedin for the user calling the update
questionRouter.put("/:id/:userId/:action", updateQuestionFollowingCtrl); // updates the followers of the question.

module.exports = questionRouter;

/**
  * post--
    * create question (isLoggedIn)
  
  * get --
    * get all author's questions - (isLoggedIn)
      * Normal
      * Sorted (By Score)
      * Sorted (By time of publish)
      * Sorted (By time of modification)  
    * get questions by title (limit = 10)
    * get questions by tags (limit = 50)
    * get most popular questions (desc: score, limit = 30)
    * get latest questions (desc : time of publish, limit = 30)
    * get all answers
    * get all comments
    * get users following count
    * get all users following
  
  * update -- 
    * update title (isLoggedIn)
    * update body (isLoggedIn)
    * update tag (isLoggedIn)
    * update last modified (isLoggedIn)
    * update views
    * * MAYBE CREATE OPEARATIONS API TO HAVE ALL OPERATIONS COMMON TO ALL DOCUMENTS SUCH AS SCORE,SAVES, FOLLOWING
    * update users following (count & users)
    * update score (upvotes, downvotes)(also call User's route for updating score of author, changeType = question)
    
  * delete (isLoggedIn)
    * delete question (delete all related answers & comments)
 *   
 */
