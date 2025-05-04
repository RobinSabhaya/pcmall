const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_KEY);

const createPaymentIntent = async ({ amount, currency }) => {
  return await stripe.paymentIntents.create({
    amount,
    currency,
    automatic_payment_methods: { enabled: true },
  });
};

module.exports = {
  createPaymentIntent,
};
