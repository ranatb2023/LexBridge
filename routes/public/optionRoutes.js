const express = require("express");
const { getAllTopics } = require("../../controllers/admin/topicController");
const { getAllSubtopics, getSubtopicsByTopic } = require("../../controllers/admin/subtopiccontroller");
const { getAllDifficulties } = require("../../controllers/admin/difficultyController");
const { getAllJurisdictions } = require("../../controllers/admin/jurisdictionController");

const router = express.Router();

// No auth middleware – public access
router.get("/topics", getAllTopics);
router.get("/subtopics", getAllSubtopics);
router.get("/subtopics/by-topic/:topicId", getSubtopicsByTopic);
router.get("/difficulties", getAllDifficulties);
router.get("/jurisdictions", getAllJurisdictions);

module.exports = router;
