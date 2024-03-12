const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is requirred."],
    },
    email: {
      type: String,
      required: [true, "email is requirred."],
    },
    mobile: {
      type: String,
    },
    whatsappNo: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "password is requirred."],
      select: false,
    },
    role: {
      type: String,
      required: true,
      enum: ["superAdmin", "clinicH", "instituteH", "researchH", "corporateWellbeingH", "learningNexusH"],
    },
    status: {
      type: String,
      required: true,
      enum: ["active", "blocked"],
      default: "active",
    },
    address: {
      type: String,
    },
    otp: {
      type: String,
      default: "",
      select: false,
    },
  },
  { timestamps: true }
);

const model = mongoose.model("admins", schema);

module.exports = model;
