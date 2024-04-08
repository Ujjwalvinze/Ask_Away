const Answer = require("../../Model/Answer");
const Question = require("../../Model/Question");
const User = require("../../Model/User");

const createAnswerCtrl = async (req, res) => {
  const userFound = await User.findById(req.params.userId);
  if (userFound === null) {
    return res.status(400).send({ msg: "User not found" });
  }

  const { quesId, body } = req.body;

  const question = await Question.findById(quesId);

  try {
    const tagsToSet = question.tags;
    // console.log("This is the question  = ", question);
    const answer = await Answer.create({
      author: userFound._id,
      body,
      tags: tagsToSet,
      usersFollowing: {
        count: 1,
        allUsers: [userFound],
      },
      theQuestion: question,
    });

    userFound.userAnswers.push(answer._id);
    await userFound.save();

    question.answers.push(answer._id);
    await question.save();

    return res.status(200).send({ msg: "Answer created", answer });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ msg: "Invalid request" });
  }
};
const updateAnswerCtrl = async (req, res) => {
  const ansId = req.params.id;
  const { newBody, newTags } = req.body;
  let oldActivity = req.body.activity;

  oldActivity.lastModified = Date.now();
  try {
    const answerFound = await Answer.findByIdAndUpdate(
      { _id: ansId },
      {
        body: newBody,
        tags: newTags,
        activity: oldActivity,
      },
      { new: true }
    );

    res.status(200).send({ msg: "Answer Updated", answerFound });
  } catch (error) {
    console.log("Error Updating answer", error);
    return res.send(400);
  }
};
const updateAnswerStatsCtrl = async (req, res) => {
  const ansId = req.params.id;
  const views = req.params.views;

  const score = req.body.score;
  let newActivity = req.body.activity;

  newActivity.views = views;
  newActivity.lastModified = Date.now();

  try {
    const answerFound = await Answer.findByIdAndUpdate(
      { _id: ansId },
      {
        score: score,
        activity: newActivity,
      },
      { new: true }
    );

    res.status(200).send({ msg: "Answer Updated", answerFound });
  } catch (error) {
    console.log("Error Updating answer", error);
    return res.send(400);
  }
};

const updateAnswerFollowingCtrl = async (req, res) => {
  const ansId = req.params.id;
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
    const answerFound = await Answer.findOneAndUpdate(
      { _id: ansId },
      {
        usersFollowing: newUserFollowing,
      },
      { new: true }
    );

    if (!answerFound) return res.json("Answer not found");

    return res.json({ msg: "Answer stats updated", answerFound });
  } catch (error) {
    console.log("Error Updating answer stats", error);
    return res.send(400);
  }
};

const deleteAnswerCtrl = async (req, res) => {
  const ansId = req.params.id;

  try {
    const answerFound = await Answer.findByIdAndDelete(ansId);

    const userFound = await User.findById(answerFound.author);

    userFound.userAnswers = userFound.userAnswers.filter(
      (ans) => ans._id != ansId
    );

    await userFound.save();

    const questionFound = await Question.findById(answerFound.theQuestion._id);

    questionFound.answers = questionFound.answers.filter(
      (ans) => ans._id != ansId
    );

    await questionFound.save();

    res.json({ msg: "Answer deleted", answerFound });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Error while getting answer by id" });
  }
};

const getAllAnswers = async (req, res) => {
  const quesId = req.params.quesId;
  let questionFound;
  try {
    questionFound = await Question.findById(quesId);
    if (!questionFound) {
      return res.json({ msg: "Question not found", id: quesId });
    }

    const allAnswers = await Promise.all(
      questionFound.answers.map(async (ansId) => {
        return await Answer.findById(ansId);
      })
    );

    return res.json({ allAnswers });
  } catch (error) {
    return res.json({ msg: "Error finding question", id: quesId });
  }
};

module.exports = {
  createAnswerCtrl,
  getAllAnswers,
  updateAnswerCtrl,
  updateAnswerStatsCtrl,
  updateAnswerFollowingCtrl,
  deleteAnswerCtrl,
};
