
const { validationResult } = require('express-validator');
const catchAsyncError = require('../../middleware/catchAsyncError');
const ErrorHandler = require('../../utils/errorHandler');

const navbarCenterSliderModel = require("../../models/navbarCenterSliderModel/navbarCenterSliderModel")


// make NavbarSlider Text for Center

exports.makeNavbarCenterSliderText = catchAsyncError(async (req, res, next) => {

    try {
        const error = await validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ success: false, error: error })
        }

        const { textNLink } = req.body

        const data = await navbarCenterSliderModel.create({
            textNLink
        })

        res.status(200).json({ success: true, message: `Navbar Slider Text Added`, data })

    } catch (error) {
        next(error)
    }
})

exports.fetchAllNavbarCenterSliderText = catchAsyncError(async (req, res, next) => {
    const error = await validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ success: false, error: error });
    }

    // query
    const { pageNo, pageSize } = req.query;

    const count = await navbarCenterSliderModel.countDocuments()
    const data = await navbarCenterSliderModel.find().skip((pageNo - 1) * pageSize).limit(pageSize).exec()

    return res.status(200).json({ success: true, count, resCount: data ? data.length : 0, data });
})

exports.deleteNavbarCenterSliderText = catchAsyncError(async (req, res) => {

    const error = await validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ success: false, error: error });
    }

    // params
    const { dbId } = req.params;

    const find = await navbarCenterSliderModel.findById(dbId);

    if (!find) return next(new ErrorHandler("Object not exists.", 400));

    await navbarCenterSliderModel.findByIdAndDelete(dbId);

    return res.status(200).json({ success: true, message: "Deletion Successful" })

})

// delete a single textNLink

exports.deleteNavbarCenterSingleObjectText = catchAsyncError(async (req, res) => {

    const error = await validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ success: false, error: error });
    }

    // params
    const { objectId, index } = req.params;
    const obj = await navbarCenterSliderModel.findById(objectId);


    if (!obj) return next(new ErrorHandler("Object not exists.", 400));

    if (index >= 0 && index < obj.textNLink.length) {
        obj.textNLink.splice(index, 1);
        await obj.save();
        res.status(200).json({ success: true, message: "Deletion Successful", data: obj })
    } else {
        res.status(400).json({ error: 'Invalid index' });
    }

})