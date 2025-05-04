const categoryService = require("../../services/category.service");
const catchAsync = require("../../src/utils/catchAsync");

const getAllCategories = catchAsync(async (req, res) => {
  // get all category
  const categoryData = await categoryService.getAllCategories(
    {},
    {
      populate: [
        {
          path: "subCategory",
        },
      ],
    }
  );

  return res.status(200).json({
    success: true,
    data: categoryData,
  });
});

module.exports = { getAllCategories };
