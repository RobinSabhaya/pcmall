const ratingModel = require("../../db/models/ratingSchema");

/**
 * Create a rating
 * @param {object} reqBody
 * @returns {Promise<ratingModel>}
 */
const createRating = (reqBody) => {
  return ratingModel.create(reqBody);
};

module.exports = { createRating };
