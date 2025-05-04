const catchAsync = require("../../src/utils/catchAsync");
const stripeService = require("../../src/services/stripe.service");
const paymentService = require("../../src/services/payment.service");

// checkout
const checkout = catchAsync(async (req, res) => {
  try {
    const customerId = req.user._id;
    const { cartIds, amount, currency } = req.body;

    // create payment intent
    const intent = await stripeService.createPaymentIntent({
      amount,
      currency,
    });

    // save in db
    await paymentService.createPayment({
      customerId,
      cartIds,
      paymentIntentId: intent.id,
      amount,
      currency,
      status: intent.status,
    });

    return res.json({
      success: true,
      data: {
        client_secret: intent.client_secret,
      },
      message: "Checkout successfully!",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
});

module.exports = {
  checkout,
};
