const BASE_URL = process.env.BASE_URL;
const productService = require("../../src/services/product.service");
const cartService = require("../../src/services/cart.service");
const mongoose = require("mongoose");
const cartController = () => {
  return {
    updateCart(req, res) {
      // const cart ={
      //     items : {
      //         productObject,
      //         qty
      //     }
      //     totalQty,
      //     totalPrice
      // }
      try {
        if (!req.session.cart) {
          req.session.cart = {
            items: {},
            totalQty: 0,
            totalPrice: 0,
          };
        }
        let cart = req.session.cart;
        if (!cart.items[req.body._id]) {
          cart.items[req.body._id] = {
            item: req.body,
            qty: 1,
          };
          cart.totalQty = cart.totalQty + 1;
          cart.totalPrice = cart.totalPrice + req.body.price;
        } else {
          cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1;
          cart.totalQty = cart.totalQty + 1;
          cart.totalPrice = cart.totalPrice + req.body.price;
        }

        return res.json({
          msg: "successfully added into the cart",
          totalQty: cart.totalQty,
          totalPrice: cart.totalPrice,
        });
      } catch (err) {
        return res.json({
          status: 400,
          msg: "Login Required",
        });
      }
    },
    getCart(req, res) {
      if (req.session.cart) {
        const cartData = Object.values(req.session.cart.items);
        return res.status(200).render("cart", { cartData, BASE_URL });
      }
      return res.status(200).render("cart", { cartData: "" });
    },
    async addItem(req, res) {
      const { add, remove, productId, delId } = req.body;
      const itemsList = Object.values(req.session.cart.items);
      /**
       * Add count the item from the cart session
       */
      if (add) {
        let count = 0;
        let price = 0;
        for (const cart_item of itemsList) {
          if (cart_item.item._id == productId) {
            cart_item.qty = cart_item.qty + +add;
            count += cart_item.qty;
            price += cart_item.qty * cart_item.item.price;
          } else {
            count += cart_item.qty;
            price += cart_item.qty * cart_item.item.price;
          }
        }
        req.session.cart.totalQty = count;
        req.session.cart.totalPrice = price;
        req.session.save();
      }

      /**
       * Decrease count the item from the cart session
       */
      if (remove) {
        let count = 0;
        let price = 0;
        for (const cart_item of itemsList) {
          if (cart_item.item._id == productId) {
            cart_item.qty = cart_item.qty + remove;
            count += cart_item.qty;
            price += cart_item.qty * cart_item.item.price;
          } else {
            count += cart_item.qty;
            price += cart_item.qty * cart_item.item.price;
          }
        }
        req.session.cart.totalQty = count;
        req.session.cart.totalPrice = price;
        req.session.save();
      }

      /**
       * Delete a cart item from the cart session.
       */
      if (delId) {
        const deleteData = req.session.cart.items[delId];
        req.session.cart.totalQty =
          req?.session?.cart?.totalQty - deleteData?.qty;
        req.session.cart.totalPrice =
          req?.session?.cart?.totalPrice -
          deleteData?.item?.price * deleteData?.qty;
        delete req?.session?.cart?.items[delId];
        req.session.save();
      }

      return res.status(200).json({
        status: 200,
        cartData: req.session.cart,
      });
    },
    async addToCart(req, res) {
      try {
        const { productId, quantity } = req.body;

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

        /** create cart */
        const cartData = await cartService.createCart(
          {
            productId,
            customerId: req.user._id,
            quantity,
          },
          {
            productId,
            customerId: req.user._id,
            quantity,
          },
          {
            upsert: true,
            new: true,
          }
        );

        return res.status(200).json({
          success: true,
          data: cartData,
          message: "Cart added successfully",
        });
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: error.message || "Something went wrong",
        });
      }
    },
    async updateToCart(req, res) {
      try {
        const { cartId, quantity } = req.body;

        /** Check cart exists or not */
        const cartExists = await cartService.getCart({ id: cartId });

        if (!cartExists) {
          return res.status(404).json({
            success: false,
            message: "Cart not found",
          });
        }

        /** create cart */
        const cartData = await cartService.createCart(
          {
            cartId,
          },
          {
            quantity,
          },
          {
            new: true,
          }
        );

        return res.status(200).json({
          success: true,
          data: cartData,
          message: "Cart updated successfully",
        });
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: error.message || "Something went wrong",
        });
      }
    },
    async removeToCart(req, res) {
      try {
        const { cartId } = req.params;

        /** Check cart exists or not */
        const cartExists = await cartService.getCart({ id: cartId });

        if (!cartExists) {
          return res.status(404).json({
            success: false,
            message: "Cart not found",
          });
        }

        /** create cart */
        await cartService.removeCart({
          cartId,
        });

        return res.status(200).json({
          success: true,
          message: "Cart removed successfully",
        });
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: error.message || "Something went wrong",
        });
      }
    },
    async getAllCart(req, res) {
      try {
        const { ...options } = req.query;

        // Get all cart data
        const cartData = await cartService.getAllCart(
          {
            customerId: new mongoose.Types.ObjectId(req.user._id),
          },
          options
        );

        const totalQty = cartData.reduce((acc, c) => {
          return acc + c.quantity;
        }, 0);

        const totalPrice = cartData.reduce((acc, c) => {
          return acc + c.productId.price * c.quantity;
        }, 0);

        return res.status(200).json({
          success: true,
          data: {
            items: cartData,
            totalQty,
            totalPrice,
          },
        });
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: error.message || "Something went wrong",
        });
      }
    },
  };
};

module.exports = cartController;
