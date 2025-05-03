const express = require("express");

const route = express.Router();
const { auth, isCustomer } = require("../middlewares/auth");
const cartController = require("../controllers/customer/cartController");

route.post("/updatecart", [auth, isCustomer], cartController().updateCart);
route.get("/cart", [auth, isCustomer], cartController().getCart);
route.post("/additem", [auth, isCustomer], cartController().addItem);
route.post("/app/cart/add", [auth, isCustomer], cartController().addToCart);

// For PCMall APP
route.delete(
  "/app/cart/remove/:cartId",
  [auth, isCustomer],
  cartController().removeToCart
);
route.put("/app/cart/update", [auth, isCustomer], cartController().updateToCart);
route.get("/app/cart/all", [auth, isCustomer], cartController().getAllCart);

module.exports = route;
