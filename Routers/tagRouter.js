const express = require("express");
const tagRouter = express.Router();

const {
  getTagById,
  getAllTags,
} = require("../Controller/tagController/tagController");

tagRouter.get("/", getAllTags);
tagRouter.get("/:id", getTagById);

module.exports = tagRouter;
