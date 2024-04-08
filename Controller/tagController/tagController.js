const Tag = require("../../Model/Tag");

const getTagById = async (req, res) => {
  const tagId = req.params.id;

  try {
    const newTag = await Tag.findById(tagId);

    res.json({ msg: "Success", newTag });
  } catch (error) {
    res.json("Error findind tag");
  }
};

const getAllTags = async (req, res) => {
  try {
    const allTags = await Tag.aggregate([{ $limit: 100 }]);

    return res.json({ msg: "Success", allTags });
  } catch (error) {
    res.json("Error finding all tags");
  }
};

module.exports = { getTagById, getAllTags };
