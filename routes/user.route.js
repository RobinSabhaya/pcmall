const express = require("express");

const route = express.Router();

const { auth, isCustomer } = require("../middlewares/auth");
const userController = require("../controllers/auth/user.controller");

route.put("/app/user/update", [auth, isCustomer], userController.updateUser);

module.exports = route;
