const mongoose = require("mongoose");
const registerSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      default: "customer",
    },
    name: {
      type: String,
    },
    last_name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    profile: {
      type: String,
    },
    addresses: [
      {
        address: {
          type: String,
          trim: true,
        },
        primary: {
          type: Boolean,
        },
      },
    ],
  },
  { timestamps: true }
);
const registerModel = mongoose.model("register", registerSchema);
module.exports = registerModel;
