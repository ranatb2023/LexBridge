const express = require("express");
const { handleStripeWebhook } = require("../controllers/stripeWebhookControllers");

const router = express.Router();

// Stripe requires raw body parsing
router.post("/", express.raw({ type: "application/json" }), handleStripeWebhook);

module.exports = router;
