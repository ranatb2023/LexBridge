const express = require("express");
const { handleStripeWebhook } = require("../controllers/stripeWebhookControllers");

const router = express.Router();

// Stripe requires raw body parsing
router.post("/webhook", express.raw({ type: "application/json" }), handleStripeWebhook);

module.exports = router;
