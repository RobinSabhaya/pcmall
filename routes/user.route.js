const express = require("express");

const route = express.Router();

const { auth, isCustomer } = require("../middlewares/auth");
const userController = require("../controllers/auth/user.controller");

route.put("/app/user/update", [auth, isCustomer], userController.updateUser);

route.get("/app/user/details", [auth, isCustomer], userController.getUser);

route.put(
  "/app/address/update",
  [auth, isCustomer],
  userController.updateAddress
);

route.delete(
  "/app/address/delete/:_id",
  [auth, isCustomer],
  userController.deleteAddress
);

module.exports = route;
