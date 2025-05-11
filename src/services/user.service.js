const { Register, Address } = require("../../db/models");

/**
 * Update user
 * @param {object} filter
 * @param {object} reqBody
 * @param {object} options
 * @returns {Promise<Register>}
 */
const updateUser = (filter, reqBody, options = {}) => {
  return Register.findOneAndUpdate(filter, reqBody, options).populate(
    "addresses"
  );
};

/**
 * Update user
 * @param {object} filter
 * @param {object} reqBody
 * @param {object} options
 * @returns {Promise<Address>}
 */
const updateManyAddress = (filter, reqBody, options = {}) => {
  return Address.updateMany(filter, reqBody, options);
};

/**
 * Add a address
 * @param {object} reqBody
 * @param {object} options
 * @returns {Promise<Address>}
 */
const addAddress = (reqBody, options = {}) => {
  return Address.create(reqBody);
};

/**
 * Get a user
 * @param {object} filter
 * @param {object} options
 * @returns {Promise<Register>}
 */
const getUser = (filter, options = {}) => {
  const { populate } = options;
  if (populate) return Register.findOne(filter).populate(populate);
  return Register.findOne(filter, options);
};

module.exports = {
  updateUser,
  updateManyAddress,
  addAddress,
  getUser,
};
