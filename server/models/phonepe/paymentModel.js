
const mongoose = require("mongoose");
const Schema = mongoose.Schema(
  {
  name: {
      type: String,
      required: true,
    },
  number: {
      type: String,
      required: true,
    },
  transactionId: {
      type: String,
      required: true,
    },
  muId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      default: 1,
      required: true,
    },
    paymentFor:{
         type: String,
        enum: ["clinic-session"],
        default: "clinic-session"
   },
    status: {
      type: String,
      enum: ["successful","failed","pending"],
      default: "pending",
    },
  },
  { timestamps: true }
);
const model = mongoose.model("payments", Schema);
module.exports = model;