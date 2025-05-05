const express = require("express");

const route = express.Router();
const homeRoute = require("./home_route");
const productRoute = require("./product_route");
const orderRoute = require("./order_route");
const cartRoute = require("./cart_route");
const policyRoute = require("./policy_route");
const loginRoute = require("./login_route");
const registerRoute = require("./register_route");
const adminRoute = require("./admin_route");
const passportRoute = require("./passport_route");
const wishlistRoute = require("./wishlist.route");
const categoryRoute = require("./category.route");
const checkoutRoute = require("./checkout.route");
const userRoute = require("./user.route");

route.use("/", homeRoute);
route.use("/", productRoute);
route.use("/", orderRoute);
route.use("/", cartRoute);
route.use("/", policyRoute);
route.use("/", loginRoute);
route.use("/", registerRoute);
route.use("/", adminRoute);
route.use("/", passportRoute);
route.use("/", wishlistRoute);
route.use("/", categoryRoute);
route.use("/", checkoutRoute);
route.use("/", userRoute);

module.exports = route;
