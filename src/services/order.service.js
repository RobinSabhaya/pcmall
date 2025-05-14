const Order = require("../../db/models/orderSchema");
const { paginationQuery } = require("../../src/helper/mongoose.helper");

const getOrderList = (filter, options = {}) => {
  const pagination = paginationQuery(options);

  return Order.aggregate([
    {
      $match: {
        ...filter,
      },
    },
    ...pagination,
  ]);
};

module.exports = {
  getOrderList,
};
