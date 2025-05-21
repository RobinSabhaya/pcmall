const express = require("express");
const { handleStripeWebhook } = require("../../src/webhooks/stripeWebhook");

const router = express.Router();

// Stripe webhook
router.post(
  "/stripe/webhook",
  express.raw({ type: "application/json" }),
  handleStripeWebhook
);

module.exports = router;
