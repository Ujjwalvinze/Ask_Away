const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
  isSatisfactory: {
    type: Boolean,
    default: false,
  },
  activity: {
    saves: {
      type: Number,
      default: 0,
    },
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
  theQuestion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const Answer = mongoose.model("Answer", answerSchema);

module.exports = Answer;
