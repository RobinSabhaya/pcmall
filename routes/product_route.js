const express = require("express");

const route = express.Router();
const productController = require("../controllers/admin/productController");
const ratingController = require("../controllers/customer/ratingController");
const { auth, isAdmin, isCustomer } = require("../middlewares/auth");
const upload = require("../src/middlewares/upload");
route.post(
  "/product",
  [[auth, isAdmin], upload.array("file", 5)],
  productController().postProduct
);
route.get("/product", productController().getProduct);
route.get("/addproduct", [auth, isAdmin], productController().addProduct);
route.get(
  "/product/:id",
  [auth, isAdmin],
  productController().updateGetProduct
);
route.post(
  "/product/:id",
  [[auth, isAdmin], upload.single("file")],
  productController().updateProduct
);
route.get(
  "/singleproduct/:id",
  // [auth, isCustomer],
  productController().singleProduct
);
route.delete(
  "/product/:id",
  [auth, isAdmin],
  productController().deleteProduct
);
// Create rating
route.post(
  "/rating/:id",
  [
    // auth, isCustomer,
    upload.any(),
  ],
  ratingController().postRating
);
// Get rating
route.get("/rating/list", [auth, isCustomer], ratingController().getRating);

// For PCMall APP
route.get("/app/product",[auth,isCustomer],productController().getAllProducts)

module.exports = route;
