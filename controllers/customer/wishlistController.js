const wishlistModel = require("../../db/models/wishlistSchema");
const wishlistService = require("../../src/services/wishlist.service");
const productService = require("../../src/services/product.service");
const BASE_URL = process.env.BASE_URL;
const wishlistController = () => {
  return {
    async postWishlist(req, res) {
      const { productId } = req.body;
      try {
        let message;
        if (req.session.user._id) {
          const wishlistExists = await wishlistModel.findOne({ productId });
          if (wishlistExists) {
            await wishlistModel.findOneAndDelete({
              productId: productId,
              customerId: req.session.user._id,
            });
            message = "Wishlist removed successfully!!";
          } else {
            const wishlistData = new wishlistModel({
              customerId: req?.session?.user?._id,
              productId,
            });
            await wishlistData.save();
            message = "Wishlist added successfully!!";
          }
          return res.status(200).json({
            status: "success",
            message,
          });
        } else {
          return res.status(401).json({
            status: "error",
            message: "Login Required",
          });
        }
      } catch (err) {
        return res.status(400).json({
          status: "error",
          message: "Login failed",
        });
      }
    },
    async getWishlist(req, res) {
      const { id } = req.params;
      const wishlistData = await wishlistModel
        .find({ customerId: id })
        .populate("productId")
        .select("-createdAt -updatedAt -__v");
      return res.status(200).render("wishlist", {
        wishlistData,
        BASE_URL,
      });
    },
    async AddRemoveWishlist(req, res) {
      try {
        const { productId } = req.body;
        const customerId = req.user._id;
        let message;

        /** Check product exists or not */
        const productExists = await productService.getProduct({
          _id: productId,
        });

        if (!productExists) {
          return res.status(404).json({
            success: false,
            message: "Product not found",
          });
        }

        // Check wishlist exists or not
        let wishlistData = await wishlistService.getWishlist({
          productId,
          customerId,
        });

        if (wishlistData) {
          await wishlistService.removeWishlist({
            productId,
            customerId,
          });
          message = "Like removed successfully!!";
        } else {
          wishlistData = await wishlistService.createWishlist(
            {
              customerId,
              productId,
            },
            {
              customerId,
              productId,
            },
            {
              new: true,
              upsert: true,
            }
          );
          message = "Like added successfully!!";
        }

        return res.status(200).json({
          status: "success",
          data: wishlistData,
          message,
        });
      } catch (err) {
        return res.status(400).json({
          success: false,
          message: err.message || "Something went wrong",
        });
      }
    },
  };
};

module.exports = wishlistController;
