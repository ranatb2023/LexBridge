const express = require("express");
const { getAllGeneratedCases } = require("../../controllers/admin/caseAdminController");
const { protect, adminOnly } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.get("/", protect, adminOnly,  getAllGeneratedCases);

module.exports = router;
