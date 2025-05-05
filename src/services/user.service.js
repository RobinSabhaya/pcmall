const { Register } = require("../../db/models");

/**
 * Update user
 * @param {object} filter
 * @param {object} reqBody
 * @param {object} options
 * @returns {Promise<Register>}
 */
const updateUser = (filter, reqBody, options = {}) => {
  return Register.findOneAndUpdate(filter, reqBody, options);
};

module.exports = {
  updateUser,
};
