const mongoose  = require("mongoose");
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
    message: "User updated successfully!",
    data: userData,
  });
});

/** Get user */
const getUser = catchAsync(async (req, res) => {
  const { _id } = req.user;

  /** get user */
  const userData = await userService.getUser({
    _id: new mongoose.Types.ObjectId(_id),
  });

  if (!userData.length)
    return res.status(404).json({
      success: false,
      message: "User not found",
    });

  return res.status(200).json({
    success: true,
    data: userData[0],
  });
});

module.exports = { updateUser, getUser };
