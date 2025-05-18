const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Types.ObjectId,
      ref: "register",
    },
    cartIds: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Cart",
      },
    ],
    stripePaymentIntentId: {
      type: String,
    },
    amount: {
      type: Number,
    },
    currency: {
      type: String,
    },
    status: {
      type: String,
    },
    customerEmail: {
      type : String
    },
    stripeSessionId: {
      type : String
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
