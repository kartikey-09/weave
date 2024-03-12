const { validationResult } = require('express-validator');
const catchAsyncError = require('../../middleware/catchAsyncError');
const ErrorHandler = require('../../utils/errorHandler');

const NavBarSliderTextModel = require("../../models/navbarSliderText/navbarSliderTextModel")


// make NavbarSlider Text for Left OR Right

exports.makeNavbarSliderText = catchAsyncError(async (req, res, next) => {

    try {
        const error = await validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ success: false, error: error })
        }

        const { displayText, link, textPosition } = req.body

        if (!displayText) {
            return next(new ErrorHandler("Display Text is required", 400))
        }
        if (!link) {
            return next(new ErrorHandler("Link is required", 400))
        }
        if (!textPosition) {
            return next(new ErrorHandler("textPosition is required", 400))
        }

        const data = await NavBarSliderTextModel.create({
            displayText,
            link,
            textPosition
        })

        res.status(200).json({ success: true, message: `Navbar Slider Text Added Successfully at ${textPosition}`, data })

    } catch (error) {
        next(error)
    }
})

exports.fetchAllNavbarSliderText = catchAsyncError(async (req, res, next) => {
    const error = await validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ success: false, error: error });
    }

    // query
    const { pageNo, pageSize } = req.query;

    const count = await NavBarSliderTextModel.countDocuments()
    const data = await NavBarSliderTextModel.find().skip((pageNo - 1) * pageSize).limit(pageSize).exec()

    return res.status(200).json({ success: true, count, resCount: data ? data.length : 0, data });
})

exports.deleteNavbarSliderText = catchAsyncError(async (req, res) => {

    const error = await validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ success: false, error: error });
    }

    // params
    const { dbId } = req.params;

    const find = await NavBarSliderTextModel.findById(dbId);

    if (!find) return next(new ErrorHandler("Object not exists.", 400));

    await NavBarSliderTextModel.findByIdAndDelete(dbId);

    return res.status(200).json({ success: true, message: "Deletion Successful" })

})