// Model: workforceModel.js
const mongoose = require("mongoose");

const workforceSchema = mongoose.Schema(
  { 
    imgUrlModelDBId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'ImgUrLModel'
    },
    pronoun: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const WorkforceModel = mongoose.model("Workforce", workforceSchema);
module.exports = WorkforceModel;
