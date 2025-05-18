const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_KEY);

const createPaymentIntent = async ({ amount, currency }) => {
  return await stripe.paymentIntents.create({
    amount,
    currency,
    automatic_payment_methods: { enabled: true },
  });
};

/**
 * Create checkout session
 * @param {object} payload 
 * @returns {string} success url
 */
const createCheckoutSession = async ({
  amount,
  currency,
  success_url,
  cancel_url,
}) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency,
          product_data: {
            name: "Your Product Name",
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url,
    cancel_url,
  });

  return session.url;
};

module.exports = {
  createPaymentIntent,
  createCheckoutSession,
};
