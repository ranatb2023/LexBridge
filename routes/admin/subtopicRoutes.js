const express = require("express");
const { getAllSubtopics, createSubtopic, updateSubtopic, deleteSubtopic } = require("../../controllers/admin/subtopiccontroller");
const { protect, adminOnly } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.use(protect, adminOnly);

router.get("/", getAllSubtopics);
router.post("/", createSubtopic);
router.put("/:id", updateSubtopic);
router.delete("/:id", deleteSubtopic);

module.exports = router;
