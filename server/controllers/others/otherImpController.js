const adminModel = require("../../models/admin/adminModel");
const imgUrlModel = require("../../models/others/imgUrlModel");
const otherImgLinkModel = require("../../models/others/otherImgLinkModel");
const catchAsyncError = require("../../middleware/catchAsyncError");
const { validationResult } = require("express-validator");
const ErrorHandler = require("../../utils/errorHandler");
const { isValidObjectId, default: mongoose } = require("mongoose");
const cloudinary = require("cloudinary").v2;
const urlExists = require("url-exists");

/* 1. uploadImages : for uploading the images on cloudinary : perform by admin pannel : req :- req.files.images */

/* 2. destroyImages : for destroying the images that is already uploaded on clodinary : perfrom by admin pannel : params :- dbId.
(server first find the object (document) from database that contain urls of the images and then find publicId by extracting url one by one, after that it destroy that images.) */

/* 3. Find all image link object : perform by admin pannel : query :- isCurrentlyUsed (Boolean), pageNo (Number), pageSize (Number)
 */

/* ----------------------------------------------------------Img Link Handling for Slider and Gallery----------------------------------
1. listNewImgLink : admin pannel : headers :- token : body :- imgUrlModelDBId (ObjectId of the ImgUrlModel document), category (enum:["slider", "gallery"])
2. fetchAllImgLink : query :- pageNo, pageSize, category (String, enum:["slider", "gallery"]), dateDescSort(Boolean)
3. deleteImgLink : admin pannel : headers :- token : params :- dbId (Object Id)
 */

/* ----------------------------------------Upload Images on Cloudinary--------------------------------------- */
exports.uploadImages = catchAsyncError(async (req, res, next) => {
  console.log("object");
  try {
    const error = await validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({ success: false, error: error });
    }

    // now, take images from req.files
    let images = req.files.image;
    console.log(req.files.image)
    // Ensure `images` is always an array
    if (!Array.isArray(images)) {
      images = [images]; // wrap the single image in an array
    }
    // console.log(images);
    const uploadPromises = images.map(async (image) => {
      const response = await cloudinary.uploader.upload(image.tempFilePath, {
        folder: process.env.Img_Folder_Name,
      });
      // console.log(response);
      return response.secure_url;
    });

    const imageUrls = await Promise.all(uploadPromises);

    //   console.log(imageUrls);

    // Save the URLs of all images in the database for the purpose of garbage handling.
    const data = await imgUrlModel.create({
      urls: imageUrls,
    });

    //   console.log(data);

    // response
    return res.status(200).json({ success: true, data: data });
  } catch (err) {
    console.log("hyuu", err);
  }
});

/* ------------------------------------------------------------Destroy Images----------------------------------------------------- */
exports.destroyImages = catchAsyncError(async (req, res, next) => {
  const error = await validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ success: false, error: error });
  }

  // check permission
  const check = await adminModel.findById(req.id);
  if (!check || (check.role !== "admin" && check.role !== "superAdmin")) {
    return next(new ErrorHandler("You have no permission.", 400));
  }

  // params
  const { dbId } = req.params;

  // check dbId is valid Object Id or not
  if (!mongoose.isValidObjectId(dbId))
    return next(new ErrorHandler("Send valid dbId.", 400));

  // find the object
  const find = await imgUrlModel.findById(dbId);
  if (!find) return next(new ErrorHandler("Object not found.", 400));

  if (find.isCurrentlyUsed)
    return next(new ErrorHandler("Images are currently in use.", 400));

  // now, delete images one by one
  const imgUrls = find.urls;
  let track = 0;
  for (let i = 0; i < find.urls.length; i++) {
    const singleImgUrl = imgUrls[i];

    const publicId = singleImgUrl.match(/\/([^/]+)\.[^.]+$/)[1];
    const params = process.env.Img_Folder_Name + "/" + publicId;
    const data = await cloudinary.uploader.destroy(params);

    // console.log(data);
    if (data.result === "ok") {
      track += 1;
    } else {
      // if image is not destroyed from cloudinary then check its existence of the url
      await urlExists(singleImgUrl, (err, exists) => {
        if (!exists) track += 1;
      });
    }
  }

  // now, if all images are destroyed then destroy that object also
  if (track === find.urls.length) {
    await imgUrlModel.findByIdAndDelete(dbId);
  }

  return res.status(200).json({
    success: true,
    message: "Successfully destroyed Images on Cloudinary.",
  });
});

/* -----------------------------------------------------------Find all image link object------------------------------------ */
exports.findAllImgUrlModelObject = catchAsyncError(async (req, res, next) => {
  const error = await validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ success: false, error: error });
  }

  // check permission
  const check = await adminModel.findById(req.id);
  if (!check || (check.role !== "admin" && check.role !== "superAdmin")) {
    return next(new ErrorHandler("You have no permission.", 400));
  }

  // query
  const { isCurrentlyUsed, pageNo, pageSize } = req.query;

  if (pageNo && pageNo < 1)
    return next(new ErrorHandler("Page No must be greater than zero.", 400));
  if (pageSize && pageSize < 1)
    return next(new ErrorHandler("Page Size must be greater than zero.", 400));

  // conditionally add filter
  const filter = {};
  if (isCurrentlyUsed !== undefined) {
    filter.isCurrentlyUsed = isCurrentlyUsed;
  }

  // find the object of that images that is useless
  const count = await imgUrlModel.countDocuments(filter).exec();
  const data = await imgUrlModel
    .find(filter)
    .skip((pageNo - 1) * pageSize)
    .limit(pageSize)
    .exec();

  return res
    .status(200)
    .json({ success: true, count, resCount: data ? data.length : 0, data });
});

/*----------------------------------------------------------Img Link Handling for Slider and Gallery---------------------------------- */

/* 1. listNewImgLink -----------------------------------------------------------------------------------------------*/
exports.listNewImgLink = catchAsyncError(async (req, res, next) => {
  const err = await validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ success: false, error: err });
  }

  // check permission
  const findAdmins = await adminModel.findById(req.id);
  if (
    !findAdmins ||
    (findAdmins.role !== "superAdmin" &&
      findAdmins.role !== "admin" &&
      findAdmins.role !== "subAdmin")
  ) {
    return next(new ErrorHandler("You have no permission.", 400));
  }

  // body
  const { imgUrlModelDBId, category } = req.body;

  // verify imgUrlModelDBId
  if (!isValidObjectId(imgUrlModelDBId))
    return next(
      new ErrorHandler("Send valid Object Id of the ImgUrLModel.", 400)
    );

  // check whether imgUrlModelDBId document exist or not
  const checkImgModel = await imgUrlModel.findById(imgUrlModelDBId);
  if (!checkImgModel)
    return next(
      new ErrorHandler("Requested doucment of ImgUrlModel is not exist.")
    );
  if (checkImgModel.isCurrentlyUsed === true)
    return next(
      new ErrorHandler(
        "You cannot reference the same ImgUrlModel document in multiple locations or fields simultaneously.",
        400
      )
    );

  // create doc
  const data = await otherImgLinkModel.create({
    imgUrlModelDBId: imgUrlModelDBId,
    category,
  });

  // now, update the status of the ImgUrlModel document
  await imgUrlModel.findByIdAndUpdate(
    imgUrlModelDBId,
    { isCurrentlyUsed: true },
    { new: true }
  );

  // response
  return res.status(200).json({
    success: true,
    message: "Listed Successfully.",
    data,
  });
});

/* 2. fetchAllImgLink ----------------------------------------------------------------------------------------------*/
exports.fetchAllImgLink = catchAsyncError(async (req, res, next) => {
  const err = await validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ success: false, error: err });
  }

  // query
  const {
    pageNo, // for pagination
    pageSize, // for pagination
    dateDescSort, // for sorting
    category, // for filtering the data
  } = req.query;

  // verify pageNo and pageSize if provided
  if (pageNo && pageNo < 1) {
    return next(
      new ErrorHandler("Value of page no. must be greater than zero.", 400)
    );
  }
  if (pageSize && pageSize < 1) {
    return next(
      new ErrorHandler("Value of page size must be greater than zero.", 400)
    );
  }

  // sort option
  const sortOption = {};
  if (dateDescSort && dateDescSort === "true") sortOption.date = -1;
  if (dateDescSort && dateDescSort === "false") sortOption.date = 1;

  // filter option
  const filterOption = {};
  if (category) filterOption.category = category;

  // fetch data
  let count = await otherImgLinkModel.countDocuments(filterOption).exec();
  let data = await otherImgLinkModel
    .find(filterOption)
    .sort(sortOption)
    .skip((pageNo - 1) * pageSize)
    .limit(pageSize)
    .populate({ path: "imgUrlModelDBId", strictPopulate: false })
    .exec();

  // response
  return res
    .status(200)
    .json({ success: true, count, resCount: data ? data.length : 0, data });
});

/* 3. deleteImgLink ------------------------------------------------------------------------------------------------*/
exports.deleteImgLink = catchAsyncError(async (req, res, next) => {
  const err = await validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ success: false, error: err });
  }

  // check permission
  const findAdmins = await adminModel.findById(req.id);
  if (
    !findAdmins ||
    (findAdmins.role !== "superAdmin" &&
      findAdmins.role !== "admin" &&
      findAdmins.role !== "subAdmin")
  ) {
    return next(new ErrorHandler("You have no permission.", 400));
  }

  // params
  const { dbId } = req.params;

  // check if last slider (category) image
  const filterOption = {};
  filterOption.category = "slider";
  const find1 = await otherImgLinkModel.find(filterOption);
  if (find1.length === 1 && find1[0]._id.toString() === dbId) {
    return next(
      new ErrorHandler(
        "Need at least one image for the slider. Can't delete the last one.",
        400
      )
    );
  }

  if (!isValidObjectId(dbId))
    return next(new ErrorHandler("Send valid Object Id.", 400));

  // first find the document from otherImgLinkModel and update the status of the ImgUrLModel Document
  const find = await otherImgLinkModel.findById(dbId);

  if (!find) return next(new ErrorHandler("Object not exists.", 400));

  const update = await imgUrlModel.findByIdAndUpdate(
    find.imgUrlModelDBId,
    { isCurrentlyUsed: false },
    { new: true }
  );

  if (!update) return next(new ErrorHandler("Error in deletion.", 400));

  const data = await otherImgLinkModel.findByIdAndDelete(dbId);
  if (!data) return next(new ErrorHandler("Object not exists.", 400));

  return res
    .status(200)
    .json({ success: true, message: "Deletion successful." });
});
