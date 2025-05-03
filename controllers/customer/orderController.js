const dayjs = require("dayjs");
const orderModel = require("./../../db/models/orderSchema");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const orderController = () => {
  return {
    async getOrder(req, res) {
      const orderData = await orderModel.find().sort({
        createdAt: -1,
      });
      return res.status(200).render("order", { orderData, dayjs });
    },
    async singleOrder(req, res) {
      const { id } = req.params;
      const orderData = await orderModel.findOne({ _id: id });
      return res.status(200).render("singleOrder", { orderData });
    },
    async postOrder(req, res) {
      const { phone, address, token, paymentType } = req.body;

      const customer = req.user;

      // if card
      if (paymentType === "card") {
        try {
          // Create customer
          let stripeCustomer;
          if (token)
            stripeCustomer = await stripe.customers.create({
              email: "robinjsabhaya13@gmail.com",
              source: token,
            });

          // create payment intent
          const paymentIntent = await stripe.paymentIntents.create({
            amount: req?.session?.cart?.totalPrice * 100,
            ...(stripeCustomer && { customer: stripeCustomer._id }),
            currency: "INR",
            description: `orderId : ${req?.session?.cart?.items}`,
            automatic_payment_methods: {
              enabled: true,
            },
          });
          console.log("🚀 ~ postOrder ~ paymentIntent:", paymentIntent);

          // Save order details
          await orderModel.create({
            customerId: req?.session?.user?._id,
            items: req?.session?.cart?.items,
            cart: req.session.cart,
            phone,
            address,
            paymentType,
            paymentStatus: true,
            status: "order_placed",
          });

          delete req?.session?.cart;

          req.flash("payment", "payment success");

          // For PCMall APP
          if (req.xhr) {
            return res.status(200).json({
              success: true,
              message: "Payment successfully",
              data: paymentIntent.client_secret,
            });
          } else {
            return res.status(302).redirect("/customer/order");
          }
        } catch (error) {
          console.log(error.message);
        }
      }

      // if cash
      if (paymentType === "cash") {
        try {
          // Save order
          await orderModel.create({
            customerId: customer._id,
            items: req?.session?.cart?.items,
            cart: req.session.cart,
            phone,
            address,
            paymentType,
            paymentStatus: true,
            status: "order_placed",
          });

          delete req?.session?.cart;

          // For PCMall APP
          if (req.xhr) {
            return res.status(200).json({
              success: true,
              message: "Payment successfully",
              data: paymentIntent.client_secret,
            });
          } else {
            return res.status(302).redirect("/customer/order");
          }
        } catch (err) {
          console.log("🚀 ~ postOrder ~ err:", err);
          // For PCMall APP
          // if (req.xhr) {
          //   return res.status(400).json({
          //     success: false,
          //     message: err.message,
          //   });
          // } else {
          //   return res.status(302).redirect("/customer/order");
          // }
        }
      }
    },
  };
};

module.exports = orderController;
