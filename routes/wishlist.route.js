const express = require("express");

const route = express.Router();
const wishlistController = require("../controllers/customer/wishlistController");
const { auth, isCustomer } = require("../middlewares/auth");

route.post(
  "/app/wishlist",
  [auth, isCustomer],
  wishlistController().AddRemoveWishlist
);

module.exports = route;
