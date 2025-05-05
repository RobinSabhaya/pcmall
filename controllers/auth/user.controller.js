const userService = require("../../src/services/user.service");
const catchAsync = require("../../src/utils/catchAsync");

const updateUser = catchAsync(async (req, res) => {
  const userId = req.user._id;

  const userData = await userService.updateUser(
    {
      _id: userId,
    },
    {
      ...req.body,
    },
    {
      new: true,
    }
  );

  return res.status(200).json({
    success: true,
    data: userData,
  });
});

module.exports = { updateUser };
