const express = require("express");
const checkoutController = require("../controllers/common/checkout.controller");
const { auth, isCustomer } = require("../middlewares/auth");

const router = express.Router();

// Get all category
router.post("/app/checkout", [auth, isCustomer], checkoutController.checkout);

module.exports = router;
