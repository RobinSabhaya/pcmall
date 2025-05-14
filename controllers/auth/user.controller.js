const mongoose = require("mongoose");
const userService = require("../../src/services/user.service");
const catchAsync = require("../../src/utils/catchAsync");
const ApiError = require("../../src/utils/apiError");

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
  const { options } = req.query;

  /** get user */
  const userData = await userService.getUser(
    {
      _id: new mongoose.Types.ObjectId(_id),
    },
    options
  );

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

const updateAddress = catchAsync(async (req, res) => {
  const { _id } = req.body;

  let addressData = await userService.getAddress({
    _id,
  });

  if (!addressData) throw new ApiError(404, "Address not found!");

  addressData = await userService.updateAddress(
    {
      _id,
    },
    req.body,
    {
      new: true,
    }
  );

  return res.status(200).json({
    success: true,
    message: "Address updated successfully!",
    data: addressData,
  });
});

const deleteAddress = catchAsync(async (req, res) => {
  const { _id } = req.params;

  let addressData = await userService.getAddress({ _id });

  if (addressData.isPrimary)
    throw new ApiError(404, "You can't delete primary address.");

  addressData = await userService.deleteAddress({
    _id,
  });

  return res.status(200).json({
    success: true,
    message: "Address delete successfully",
    data: addressData,
  });
});

module.exports = { updateUser, getUser, updateAddress, deleteAddress };
