const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  body: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
  activity: {
    publishDate: {
      type: Date,
      default: Date.now(),
    },
    lastModified: {
      type: Date,
      default: Date.now(),
    },
  },
  theQuestion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
  },
  theAnswer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Answer",
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
