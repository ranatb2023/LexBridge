const express = require("express");
const { getAllGeneratedCases , getCaseByAdmin} = require("../../controllers/admin/caseAdminController");
const { protect, adminOnly } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.get("/", protect, adminOnly,  getAllGeneratedCases);
router.get("/:id", protect, adminOnly,  getCaseByAdmin);

module.exports = router;
