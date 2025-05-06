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
    primary_address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      index: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Virtual populate
registerSchema.virtual("addresses", {
  ref: "Address",
  localField: "_id",
  foreignField: "user",
  justOne: false,
});

const registerModel = mongoose.model("register", registerSchema);
module.exports = registerModel;
