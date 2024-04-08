const Question = require("../../Model/Question");
const User = require("../../Model/User");
const Tag = require("../../Model/Tag");

const createQuestionCtrl = async (req, res) => {
  const userFound = await User.findById(req.params.userId);
  if (userFound === null) {
    return res.status(400).send({ msg: "User not found" });
  }

  const { title, body, tags } = req.body;

  let newTags;
  try {
    newTags = await Promise.all(
      tags.map(async (newTag) => {
        const tagExists = await Tag.findOne({ name: newTag });
        if (!tagExists) {
          return await Tag.create({ name: newTag });
        } else return tagExists;
      })
    );
  } catch (error) {
    return res.json({ msg: "Error creating tags" });
  }
  console.log("Tags Created", newTags);
  try {
    const question = await Question.create({
      author: userFound,
      title,
      body,
      tags: newTags,
      usersFollowing: {
        count: 1,
        allUsers: [userFound],
      },
    });

    userFound.userQuestions.push(question._id);
    await userFound.save();

    return res.status(200).send({ msg: "Question created", question });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ msg: "Invalid request" });
  }
};

const getAllQuestions = async (req, res) => {
  const limit = 10;
  try {
    const questionsFound = await Question.aggregate([{ $limit: 100 }]);

    return res.json(questionsFound);
  } catch (error) {
    console.log(error);
    return res.json({ message: "Error while getting questions by phrase" });
  }
};

const getQuestionByPhraseCtrl = async (req, res) => {
  const phrase = req.body.phrase;
  const limit = 10;
  try {
    const questionsFound = await Question.find({
      title: { $regex: phrase, $options: "i" },
    }).limit(limit);

    return res.json(questionsFound);
  } catch (error) {
    console.log(error);
    return res.json({ message: "Error while getting questions by phrase" });
  }
};

const getQuestionByIdCtrl = async (req, res) => {
  const quesId = req.params.id;

  try {
    const questionsFound = await Question.find({
      _id: quesId,
    });

    return res.json(questionsFound);
  } catch (error) {
    console.log(error);
    return res.json({ message: "Error while getting questions by id" });
  }
};

const deleteQuestionCtrl = async (req, res) => {
  const quesId = req.params.id;

  try {
    const questionFound = await Question.findByIdAndDelete(quesId);

    const userFound = await User.findById(questionFound.author);

    userFound.userQuestions = userFound.userQuestions.filter(
      (ques) => ques._id != quesId
    );

    await userFound.save();

    res.json({ msg: "Question deleted", questionFound });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Error while getting questions by id" });
  }
};

// this updates - score, views
const updateQuestionStatsCtrl = async (req, res) => {
  const quesId = req.params.id;
  const views = req.params.views;

  const score = req.body.score;
  let newActivity = req.body.activity;

  newActivity.views = views;
  newActivity.lastModified = Date.now();

  try {
    const questionFound = await Question.findOneAndUpdate(
      { _id: quesId },
      {
        score: score,
        activity: newActivity,
      },
      { new: true }
    );

    if (!questionFound) return res.json("Question not found");

    return res.json({ msg: "Question stats updated", questionFound });
  } catch (error) {
    console.log("Error Updating question stats", error);
    return res.send(400);
  }
};

const updateQuestionFollowingCtrl = async (req, res) => {
  const quesId = req.params.id;
  const userId = req.params.userId;
  const action = req.params.action;

  let newUserFollowing = req.body.usersFollowing;

  if (action == 1) {
    newUserFollowing.count = newUserFollowing.count + 1;
    newUserFollowing.allUsers.push(userId);
  } else {
    newUserFollowing.count = newUserFollowing.count - 1;
    newUserFollowing.allUsers.filter((user) => {
      return user != userId;
    });
  }

  try {
    const questionFound = await Question.findOneAndUpdate(
      { _id: quesId },
      {
        usersFollowing: newUserFollowing,
      },
      { new: true }
    );

    if (!questionFound) return res.json("Question not found");

    return res.json({ msg: "Question stats updated", questionFound });
  } catch (error) {
    console.log("Error Updating question stats", error);
    return res.send(400);
  }
};

const updateQuestionCtrl = async (req, res) => {
  const { newTitle, newBody, newTags } = req.body;
  let oldActivity = req.body.activity;
  const quesId = req.params.id;

  oldActivity.lastModified = Date.now();

  try {
    const updatedQuestion = await Question.findOneAndUpdate(
      { _id: quesId },
      {
        title: newTitle,
        body: newBody,
        tags: newTags,
        activity: oldActivity,
      },
      { new: true }
    );

    if (!updatedQuestion) return res.json({ msg: "No question found" });

    return res.json({ msg: "Question updated", question: updatedQuestion });
  } catch (error) {
    console.log("Error Updating question", error);
    return res.send(400);
  }
};

module.exports = {
  createQuestionCtrl,
  getAllQuestions,
  getQuestionByPhraseCtrl,
  getQuestionByIdCtrl,
  deleteQuestionCtrl,
  updateQuestionCtrl,
  updateQuestionStatsCtrl,
  updateQuestionFollowingCtrl,
};
