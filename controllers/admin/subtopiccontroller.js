const Subtopic = require("../../models/Subtopic");

// @desc Get all subtopics
// @route GET /api/admin/subtopics
// @access Private/Admin
const getAllSubtopics = async (req, res) => {
    try {
        const subtopics = await Subtopic.find().populate("topicId", "name");
        res.status(200).json(subtopics);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc Create subtopic
// @route POST /api/admin/subtopics
// @access Private/Admin
const createSubtopic = async (req, res) => {
  try {
    const { topicId, name, promptModifier, taskPrompt } = req.body;
    const subtopic = await Subtopic.create({ topicId, name, promptModifier, taskPrompt });
    res.status(201).json(subtopic);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Update subtopic
// @route PUT /api/admin/subtopics/:id
// @access Private/Admin
const updateSubtopic = async (req, res) => {
  try {
    const { topicId, name, promptModifier, taskPrompt } = req.body;
    const subtopic = await Subtopic.findByIdAndUpdate(
      req.params.id,
      { topicId, name, promptModifier, taskPrompt },
      { new: true }
    );
    res.status(200).json(subtopic);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Delete subtopic
// @route DELETE /api/admin/subtopics/:id
// @access Private/Admin
const deleteSubtopic = async (req, res) => {
    try {
        await Subtopic.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Subtopic deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const getSubtopicsByTopic = async (req, res) => {
  try {
    const subtopics = await Subtopic.find({ topicId: req.params.topicId }).populate("topicId");
    res.status(200).json(subtopics);
  } catch (error) {
    console.error("Error fetching subtopics by topic:", error);
    res.status(500).json({ error: "Failed to fetch subtopics" });
  }
};

module.exports = { getAllSubtopics, createSubtopic, updateSubtopic, deleteSubtopic, getSubtopicsByTopic };
