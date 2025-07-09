const express = require("express");
const {
  generateCase,
  getUserCases,
  getSingleCase,
  exportCaseAsText,
} = require("../controllers/caseControllers");
const { protect } = require("../middlewares/authMiddleware");
const { requireSubscription } = require("../middlewares/subscriptionMiddleware");

const router = express.Router();

router.post("/generate", protect, requireSubscription, generateCase);
router.get("/", protect, getUserCases);               // Paginated dashboard
router.get("/:id", protect, getSingleCase);           // Case details
router.get("/:id/export", protect, exportCaseAsText); // Download

module.exports = router;
