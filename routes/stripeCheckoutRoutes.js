const express = require("express");
const { createCheckoutSession } = require("../controllers/stripeCheckoutController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/create-checkout-session", protect, createCheckoutSession);

module.exports = router;
