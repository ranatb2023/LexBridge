// routes/adminRoutes.js
const express = require("express");
// const { getAllCases } = require("../../controllers/caseControllers");
const { getAdminStats } = require("../../controllers/admin/adminController");
const { protect, adminOnly } = require("../../middlewares/authMiddleware");

const router = express.Router();

// router.get("/cases", protect, adminOnly, getAllCases);
router.get("/stats", protect, adminOnly, getAdminStats);

module.exports = router;
