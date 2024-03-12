const NewsNotificationModel = require("../../models/newsnotification/newsnotification");
const { validationResult } = require("express-validator");
const catchAsyncError = require("../../middleware/catchAsyncError");
const ErrorHandler = require("../../utils/errorHandler");
const { isValidObjectId } = require("mongoose");

exports.createNewsNotification = catchAsyncError(async (req, res) => {
    const { heading, link } = req.body;

    const data = await NewsNotificationModel.create({
        heading: heading,
        link: link
    });

    return res.status(200).json({ success: true, message: "Data saved successfully.", data });
});

exports.fetchAllNewsNotifications = catchAsyncError(async (req, res) => {
    const data = await NewsNotificationModel.find({});

    return res.status(200).json({ success: true, message: "Data Fetched successfully.", data });
});

exports.deleteNewsNotification = catchAsyncError(async (req, res) => {
    const { dbId } = req.params;

    if (!isValidObjectId(dbId))
        return next(new ErrorHandler("Send valid Object Id.", 400));

    await NewsNotificationModel.findByIdAndDelete(dbId);

    return res.status(200).json({ success: true, message: "Deletion Successful." });
});
