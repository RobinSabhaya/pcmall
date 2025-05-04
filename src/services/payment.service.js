const { Payment } = require("../../db/models");

/**
 * Create payment
 * @param {object} reqBody
 * @param {object} options
 * @returns {Promise<Payment>}
 */
const createPayment = (reqBody, options = {}) => {
  // Save in DB
  return Payment.create(reqBody);
};

module.exports = {
  createPayment,
};
