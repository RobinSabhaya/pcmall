const catchAsync = require("../../src/utils/catchAsync");
const stripeService = require("../../src/services/stripe.service");
const paymentService = require("../../src/services/payment.service");
const success_url = process.env.STRIPE_SUCCESS_URL;
const cancel_url = process.env.STRIPE_CANCEL_URL;

// checkout
const checkout = catchAsync(async (req, res) => {
  try {
    const customerId = req.user._id;
    const { cartIds, amount, currency } = req.body;

    // create payment intent v1
    // const intent = await stripeService.createPaymentIntent({
    //   amount,
    //   currency,
    // });

    const checkoutUrl = await stripeService.createCheckoutSession({
      amount,
      currency,
      success_url,
      cancel_url,
    });

    // save in db in v1
    // await paymentService.createPayment({
    //   customerId,
    //   customerEmail: session.customer_email,
    //   cartIds,
    //   paymentIntentId: session.payment_intent,
    //   amount: session.amount_total,
    //   currency: session.currency,
    //   status: session.payment_status,
    //   stripeSessionId: session.id,
    // });

    // return res.json({
    //   success: true,
    //   data: {
    //     client_secret: intent.client_secret,
    //   },
    //   message: "Checkout successfully!",
    // });

    return res.json({
      success: true,
      data: {
        checkoutUrl,
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
