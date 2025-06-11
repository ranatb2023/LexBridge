const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");

const { getUsers, getUserById } = require("../controllers/userControllers");

const router = express.Router();

//Auth Routes
router.get("/", protect, adminOnly, getUsers); // Get All Users admin-only
router.get("/:id", protect, getUserById); // Get a specific user

module.exports = router;