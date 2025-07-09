const Jurisdiction = require("../../models/Jurisdiction");

// @desc Get all jurisdictions
// @route GET /api/admin/jurisdictions
// @access Private/Admin
const getAllJurisdictions = async (req, res) => {
    try {
        const jurisdictions = await Jurisdiction.find();
        res.status(200).json(jurisdictions);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc Create jurisdiction
// @route POST /api/admin/jurisdictions
// @access Private/Admin
const createJurisdiction = async (req, res) => {
    try {
        const { name, legalFrameworkPrompt } = req.body;
        const jurisdiction = await Jurisdiction.create({ name, legalFrameworkPrompt });
        res.status(201).json(jurisdiction);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc Update jurisdiction
// @route PUT /api/admin/jurisdictions/:id
// @access Private/Admin
const updateJurisdiction = async (req, res) => {
    try {
        const { name, legalFrameworkPrompt } = req.body;
        const jurisdiction = await Jurisdiction.findByIdAndUpdate(
            req.params.id,
            { name, legalFrameworkPrompt },
            { new: true }
        );
        res.status(200).json(jurisdiction);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc Delete jurisdiction
// @route DELETE /api/admin/jurisdictions/:id
// @access Private/Admin
const deleteJurisdiction = async (req, res) => {
    try {
        await Jurisdiction.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Jurisdiction deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = { getAllJurisdictions, createJurisdiction, updateJurisdiction, deleteJurisdiction };
