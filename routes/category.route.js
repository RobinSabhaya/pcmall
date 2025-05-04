const express = require("express");
const categoryController = require("../controllers/common/category.controller");

const router = express.Router();

// Get all category
router.get("/app/category/all", categoryController.getAllCategories);

module.exports = router;
