const Difficulty = require("../../models/Difficulty");

// @desc Get all difficulty levels
// @route GET /api/admin/difficulties
// @access Private/Admin
const getAllDifficulties = async (req, res) => {
    try {
        const difficulties = await Difficulty.find();
        res.status(200).json(difficulties);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc Create difficulty level
// @route POST /api/admin/difficulties
// @access Private/Admin
const createDifficulty = async (req, res) => {
    try {
        const { level, description, complexityPrompt } = req.body;
        const difficulty = await Difficulty.create({ level, description, complexityPrompt });
        res.status(201).json(difficulty);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc Update difficulty level
// @route PUT /api/admin/difficulties/:id
// @access Private/Admin
const updateDifficulty = async (req, res) => {
    try {
        const { level, description, complexityPrompt } = req.body;
        const difficulty = await Difficulty.findByIdAndUpdate(
            req.params.id,
            { level, description, complexityPrompt },
            { new: true }
        );
        res.status(200).json(difficulty);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc Delete difficulty level
// @route DELETE /api/admin/difficulties/:id
// @access Private/Admin
const deleteDifficulty = async (req, res) => {
    try {
        await Difficulty.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Difficulty level deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = { getAllDifficulties, createDifficulty, updateDifficulty, deleteDifficulty };
