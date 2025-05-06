const userService = require("../../src/services/user.service");
const catchAsync = require("../../src/utils/catchAsync");

const updateUser = catchAsync(async (req, res) => {
  const userId = req.user._id;

  await userService.updateManyAddress(
    {
      user: userId,
    },
    {
      isPrimary: false,
    }
  );

  const addressData = await userService.addAddress({
    user: userId,
    ...req.body,
    isPrimary: true,
  });

  const userData = await userService.updateUser(
    {
      _id: userId,
    },
    {
      ...req.body,
      primary_address: addressData._id,
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
