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
 * Update a address
 * @param {object} filter
 * @param {object} reqBody
 * @param {object} options
 * @returns {Promise<Address>}
 */
const updateAddress = (filter, reqBody, options = {}) => {
  return Address.findOneAndUpdate(filter, reqBody, options);
};

/**
 * Get a address
 * @param {object} filter
 * @param {object} options
 * @returns {Promise<Address>}
 */
const getAddress = (filter, options = {}) => {
  return Address.findOne(filter);
};

/**
 * Get a user
 * @param {object} filter
 * @param {object} options
 * @returns {Promise<Register>}
 */
const getUser = (filter, options = {}) => {
  return Register.aggregate([
    {
      $match: {
        ...filter,
      },
    },
    {
      $lookup: {
        from: "addresses",
        localField: "_id",
        foreignField: "user",
        as: "addresses",
        pipeline: [
          {
            $sort: {
              createdAt: -1,
            },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "addresses",
        localField: "primary_address",
        foreignField: "_id",
        as: "primary_address",
      },
    },
    {
      $unwind: {
        preserveNullAndEmptyArrays: true,
        path: "$primary_address",
      },
    },
  ]);
};

module.exports = {
  updateUser,
  updateManyAddress,
  addAddress,
  getUser,
  updateAddress,
  getAddress,
};
