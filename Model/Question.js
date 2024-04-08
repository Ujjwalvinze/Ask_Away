const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
  score: {
    total: {
      type: Number,
      default: 0,
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
    },
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
    views: {
      type: Number,
      default: 0,
    },
  },
  usersFollowing: {
    count: {
      type: Number,
      default: 0,
    },
    allUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
