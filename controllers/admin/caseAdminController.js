const Case = require("../../models/Case");
const User = require("../../models/User");

// @desc Admin view: Get all generated cases
// @route GET /api/admin/cases
// @access Private/Admin
const getAllGeneratedCases = async (req, res) => {
  try {
    const cases = await Case.find()
      .sort({ createdAt: -1 })
      .populate("userId", "name email")
      .populate("topicId subtopicId difficultyId jurisdictionId", "name level");

    res.status(200).json(cases);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Admin: Get any case by ID
// @route GET /api/cases/admin/:id
// @access Admin only
const getCaseByAdmin = async (req, res) => {
  try {
    const singleCase = await Case.findById(req.params.id)
      .populate("topicId subtopicId difficultyId jurisdictionId userId");

    if (!singleCase) {
      return res.status(404).json({ message: "Case not found" });
    }

    res.status(200).json(singleCase);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


module.exports = { getAllGeneratedCases, getCaseByAdmin };
