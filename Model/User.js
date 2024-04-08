const mongoose = require("mongoose");
const appRootPath = require("app-root-path").path;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: `/images/defaultProfile.png`,
  },
  about: {
    type: String,
  },
  socials: {
    github: {
      type: String,
    },
    x: {
      type: String,
    },
  },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
      // required: true,
    },
  ],
  reputation: {
    points: {
      type: Number,
      default: 0,
    },
    badges: {
      gold: {
        type: Number,
        default: 0,
      },
      silver: {
        type: Number,
        default: 0,
      },
      bronze: {
        type: Number,
        default: 0,
      },
    },
  },
  savedPosts: {
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    answers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer",
      },
    ],
  },
  followedPosts: {
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    answers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer",
      },
    ],
  },
  activity: {
    joinDate: {
      type: Date,
      default: Date.now(),
    },
    lastVisited: {
      type: Date,
      default: Date.now(),
    },
  },
  userQuestions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  userAnswers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer",
    },
  ],
  userComments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
