const testimonialModel = require("../../models/testimonials/testimonialModel");
const { validationResult } = require("express-validator");
const catchAsyncError = require("../../middleware/catchAsyncError");
const ErrorHandler = require("../../utils/errorHandler");
const { isValidObjectId, default: mongoose } = require("mongoose");

exports.createTestimonial = async (req, res) => {
  const { name, description, imgUrl, rating, link } = req.body;

  const data = await testimonialModel.create({
    imgUrl: imgUrl,
    name: name,
    description: description,
    rating: rating,
    link: link,
  });

  // response
  return res
    .status(200)
    .json({ success: true, message: "Data saved successfully.", data });
};

exports.fetchAllTestimonial = async (req, res) => {
  const data = await testimonialModel.find({});

  // response
  return res
    .status(200)
    .json({ success: true, message: "Data Fetched successfully.", data });
};

exports.deleteTestimonial = async (req, res) => {
  // params
  const { dbId } = req.params;

  // delete the object
  await testimonialModel.findByIdAndDelete(dbId);

  return res
    .status(200)
    .json({ success: true, message: "Deletion Successful." });
};
