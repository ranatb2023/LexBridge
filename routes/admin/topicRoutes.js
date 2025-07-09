const express = require("express");
const { getAllTopics, createTopic, updateTopic, deleteTopic } = require("../../controllers/admin/topicController");
const { protect, adminOnly } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.use(protect, adminOnly);

router.get("/", getAllTopics);
router.post("/", createTopic);
router.put("/:id", updateTopic);
router.delete("/:id", deleteTopic);

module.exports = router;
