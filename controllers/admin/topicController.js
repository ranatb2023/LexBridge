const Topic = require("../../models/Topic");

// @desc Get all topics
// @route GET /api/admin/topics
// @access Private/Admin
const getAllTopics = async (req, res) => {
    try {
        const topics = await Topic.find();
        res.status(200).json(topics);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc Create a new topic
// @route POST /api/admin/topics
// @access Private/Admin
const createTopic = async (req, res) => {
    try {
        const { name, basePrompt } = req.body;
        const topic = await Topic.create({ name, basePrompt });
        res.status(201).json(topic);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc Update topic
// @route PUT /api/admin/topics/:id
// @access Private/Admin
const updateTopic = async (req, res) => {
    try {
        const { name, basePrompt } = req.body;
        const topic = await Topic.findByIdAndUpdate(
            req.params.id,
            { name, basePrompt },
            { new: true }
        );
        res.status(200).json(topic);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc Delete topic
// @route DELETE /api/admin/topics/:id
// @access Private/Admin
const deleteTopic = async (req, res) => {
    try {
        await Topic.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Topic deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = { getAllTopics, createTopic, updateTopic, deleteTopic };
