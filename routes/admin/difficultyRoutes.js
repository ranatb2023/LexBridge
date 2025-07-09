const express = require("express");
const { getAllDifficulties, createDifficulty, updateDifficulty, deleteDifficulty } = require("../../controllers/admin/difficultyController");
const { protect, adminOnly } = require("../../middlewares/authMiddleware");
const router = express.Router();

router.use(protect, adminOnly);

router.get("/", getAllDifficulties);
router.post("/", createDifficulty);
router.put("/:id", updateDifficulty);
router.delete("/:id", deleteDifficulty);

module.exports = router;
