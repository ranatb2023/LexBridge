const express = require("express");
const { getAllJurisdictions, createJurisdiction, updateJurisdiction, deleteJurisdiction } = require("../../controllers/admin/jurisdictionController");
const { protect, adminOnly } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.use(protect, adminOnly);

router.get("/", getAllJurisdictions);
router.post("/", createJurisdiction);
router.put("/:id", updateJurisdiction);
router.delete("/:id", deleteJurisdiction);

module.exports = router;
