const adminModel = require('../../models/admin/adminModel');
const galleryModel = require('../../models/gallery/galleryModel');
const catchAsyncError = require('../../middleware/catchAsyncError');
const { validationResult } = require('express-validator');
const ErrorHandler = require('../../utils/errorHandler');
const clodinary = require('cloudinary').v2;
const urlExists = require('url-exists');
const { default: mongoose } = require('mongoose');
const Gallery_Img_Folder_Name = process.env.Gallery_Img_Folder_Name

/* 1. uploadImgOnGallery : headers :- token : body :- category(String), batchName(String) : files :- req.files.images(images) */
/* 2. destroyImgFromGallery : headers :- token : body :- dbId(Object Id),  */

exports.uploadImgOnGallery = catchAsyncError(async (req, res, next) => {
    const error = await validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ success: false, error: error });
    }

    // check permission
    const isAdmin = await adminModel.findById(req.id);
    if (
        !isAdmin ||
        (isAdmin.role !== "superAdmin" &&
            isAdmin.role !== "clinicH")
    ) {
        return next(new ErrorHandler("You have no permission.", 400));
    }

    const { category, batchName } = req.body;
    let images = req.files.images;

    if (!category) {
        return next(new ErrorHandler("Category is required field.", 400));
    }
    if (!batchName) {
        return next(new ErrorHandler("BatchName is required field.", 400));
    }
    if (!images) {
        return next(new ErrorHandler("Images are required.", 400));
    }

    // ensure 'images' is always an array. wrap the single image in an array
    if (!Array.isArray(images)) {
        images = [images];
    }

    const uploadPromises = images.map(async (image) => {
        const response = await clodinary.uploader.upload(image.tempFilePath, {
            folder: Gallery_Img_Folder_Name
        });
        return response.secure_url;
    });

    const imgUrls = await Promise.all(uploadPromises);

    // condition one : when particular category exists
    const conditionOne = await galleryModel.findOne({ category: category });
    if (conditionOne) {
        // if batchName is also exists

        const batch = conditionOne.batch;
        // console.log("batch", batch)

        let flag = false;
        for (let i = 0; i < batch?.length; i++) {
            if (batch[i].batchName === batchName) {
                flag = true;
                batch[i].imgUrls = [...batch[i].imgUrls, ...imgUrls];
                conditionOne.save();
                return res.status(200).json({ success: true, message: "Data saved successfully.", data: conditionOne });
            }
        }

        // if batchName is not already exists
        if (flag == false) {
            const newBatch = {
                batchName: batchName,
                imgUrls: imgUrls
            }
            batch.push(newBatch);
            await conditionOne.save();
        }
        return res.status(200).json({ success: true, message: "Data saved successfully.", data: conditionOne });
    }
    else {

        // condition Two : when particular category not exists
        const conditionTwo = await galleryModel.create({
            category: category,
            batch: [{
                batchName: batchName,
                imgUrls: imgUrls
            }]
        });
        return res.status(200).json({ success: true, message: "Successfully posted gallery.", data: conditionTwo });
    }
})


// Get All Data in Gallery Model

exports.getAllGalleryData = async (req, res, next) => {
    const data = await galleryModel.find({})

    return res.status(200).json({ success: true, message: "Successfully posted gallery.", data: data });
}

// Get Single Gallery Data
exports.getSingleGalleryData = async (req, res, next) => {

    // query
    const { categoryName } = req.query;

    const data = await galleryModel.find({ category: categoryName })

    if (!data) {
        return res.status(404).json({ error: 'Object not found' });
    }

    return res.status(200).json({ success: true, message: "Successfully Get the Data", data: data });
}

// Get Single Batch Data

exports.getSingleBatchData = async (req, res) => {

    // params
    const { batchId } = req.params;

    const data = await galleryModel.findOne({ 'batch._id': new mongoose.Types.ObjectId(batchId) }, { 'batch.$': 1 })

    if (!data) {
        return res.status(404).json({ error: 'Object not found' });
    }

    return res.status(200).json({ success: true, message: "Successfully Get the Data", data: data.batch[0], allData: data });
}


// Delete a Single Img from Batch
exports.deleteSingleImgFromBatch = async (req, res) => {
    // params
    const { batchId, imgUrlToDelete } = req.params;

    const result = await galleryModel.findOneAndUpdate(
        { 'batch._id': new mongoose.Types.ObjectId(batchId) }, // Remove the placeholder object
        { new: true }
    );

    // console.log("Result", result)
    // console.log("Batch", result.batch.find(obj => obj.id === batchId))

    const selectedBatch = result.batch.find(obj => obj.id === batchId)

    console.log("Selected Batch", selectedBatch)

    // Checking if this selected Image is the last image or not

    if (selectedBatch.imgUrls.length === 1) {
        // Make sure the index is within bounds
        if (imgUrlToDelete >= 0 && imgUrlToDelete < selectedBatch.imgUrls.length) {
            selectedBatch.imgUrls.splice(imgUrlToDelete, 1);
            await result.save();

            // Now delete the entire batch because no img is left


            const result2 = await galleryModel.findOneAndUpdate(
                { 'batch._id': new mongoose.Types.ObjectId(batchId) },
                { $pull: { batch: { _id: new mongoose.Types.ObjectId(batchId) } } },
                { new: true }
            );

            if (!result2) {
                return res.status(404).json({ success: false, message: "Batch not found" });
            }

            return res.status(200).json({ success: true, message: "Batch Deleted Successfully", data: result2 });


        } else {
            return res.status(400).json({ success: false, message: "Invalid index provided" });
        }
    }
    else {
        // Make sure the index is within bounds
        if (imgUrlToDelete >= 0 && imgUrlToDelete < selectedBatch.imgUrls.length) {
            selectedBatch.imgUrls.splice(imgUrlToDelete, 1);
            await result.save();
        } else {
            return res.status(400).json({ success: false, message: "Invalid index provided" });
        }
        return res.status(200).json({ success: true, message: "Image Deleted Successfully", data: selectedBatch });
    }

    // Make sure the index is within bounds
    // if (imgUrlToDelete >= 0 && imgUrlToDelete < selectedBatch.imgUrls.length) {
    //     selectedBatch.imgUrls.splice(imgUrlToDelete, 1);
    //     await result.save();
    // } else {
    //     return res.status(400).json({ success: false, message: "Invalid index provided" });
    // }
    // return res.status(200).json({ success: true, message: "Image Deleted Successfully", data: selectedBatch });


}

// Delete an Entire Batch

exports.deleteSingleBatch = async (req, res) => {
    const { batchId } = req.params

    const result = await galleryModel.findOneAndUpdate(
        { 'batch._id': new mongoose.Types.ObjectId(batchId) },
        { $pull: { batch: { _id: new mongoose.Types.ObjectId(batchId) } } },
        { new: true }
    );

    if (!result) {
        return res.status(404).json({ success: false, message: "Batch not found" });
    }

    return res.status(200).json({ success: true, message: "Batch Deleted Successfully", data: result });

}