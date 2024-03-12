const mongoose = require("mongoose");
const schema = mongoose.Schema(
  {
    name: {
      firstname: {
        type: String,
        required: true,
      },
      lastname: {
        type: String,
      },
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    mobileNo: {
      type: String,
    },
    password: {
      type: String,
      select: false,
      required: true,
    },
    serviceCategory:{
      type: String,
      required: true,
      enum: ["Clinic","Institute","Research","Corporate Wellbeing"]
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },
    otp: {
      type: String,
      select: false,
      default: "",
    },
  },
  { timestamps: true }
);
const model = mongoose.model("users", schema);
module.exports = model;
