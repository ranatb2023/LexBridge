// routes/adminRoutes.js
const express = require("express");
const { getAllCases } = require("../../controllers/caseControllers");
const { protect, adminOnly } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.get("/cases", protect, adminOnly, getAllCases); // <- specific route

module.exports = router;
