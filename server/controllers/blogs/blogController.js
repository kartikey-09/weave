const adminModel = require("../../models/admin/adminModel");
const blogModel = require('../../models/blogs/blogModel');
const ImgUrLModel = require("../../models/others/imgUrlModel");
const { validationResult } = require("express-validator");
const catchAsyncError = require("../../middleware/catchAsyncError");
const ErrorHandler = require("../../utils/errorHandler");
const { isValidObjectId, default: mongoose } = require("mongoose");

/* 1. insertNewBlog : perfromed by admin pannel : headers :- token : body :- imgUrlModelDBId (ObjectId of the ImgUrlModel document), title, date, shortDescription (String), briefDescription (String) */
/* 2. fetchAllBlogs : accessed by both admin and user pannel : query :- date, dateDescSort, pageNo, pageSize */
/* 3. deleteBlog : perfromed by admin pannel : headers :- token : params :- dbId */
/* 4. updateBlog : perfromed by admin pannel : headers :- token : params :- dbId : body :- imgUrlModelDBId (ObjectId of the ImgUrlModel document), title, date, shortDescription (String), briefDescription (String) : [send only that fields, that you want to update.] */
/* 5. viewSingleBlog : params:- dbId (Object Id) */

//1. --------------------------------------------- Blogs : insert new blog------------------------------------
exports.insertNewBlog = catchAsyncError(
  async (req, res, next) => {
    const err = await validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ success: false, error: err });
    }

    // check permission
    const isAdmin = await adminModel.findById(req.id);
    if (
      !isAdmin ||
      ( isAdmin.role !== "superAdmin" &&
        isAdmin.role !== "clinicH")
    ) {
      return next(new ErrorHandler("You have no permission.", 400));
    }

    // req.body
    const {
      imgUrlModelDBId,
      title,
      date,
      shortDescription,
      briefDescription,
    } = req.body;

    // verify imgUrlModelDBId
    if (!isValidObjectId(imgUrlModelDBId))
      return next(
        new ErrorHandler("Send valid Object Id of the ImgUrLModel.", 400)
      );

    // check whether imgUrlModelDBId document exist or not
    const checkImgModel = await ImgUrLModel.findById(imgUrlModelDBId);
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

    // save the data
    const data = await blogModel.create({
      imgUrlModelDBId: imgUrlModelDBId,
      title: title ? title.trim() : undefined,
      date: date,
      shortDescription: shortDescription,
      briefDescription: briefDescription,
    });

    // now, update the status of the ImgUrlModel document
    await ImgUrLModel.findByIdAndUpdate(
      imgUrlModelDBId,
      { isCurrentlyUsed: true },
      { new: true }
    );

    // response
    return res
      .status(200)
      .json({ success: true, message: "Data saved successfully.", data });
  }
);

//2. ---------------------------------------------- Blogs : fetch all blogs------------------------------------
exports.fetchAllBlogs = catchAsyncError(
  async (req, res, next) => {
    const err = await validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ success: false, error: err });
    }

    // query
    const { date, dateDescSort, pageNo, pageSize } = req.query;

    if (pageNo && pageNo < 1)
      return next(new ErrorHandler("Page no must be greater than zero.", 400));
    if (pageSize && pageSize < 1)
      return next(
        new ErrorHandler("Page size must be greater than zero.", 400)
      );

    // sort option
    const sortOption = {};
    if (dateDescSort === "true") sortOption.date = -1;
    else if (dateDescSort === "false") sortOption.date = 1;

    // filter option
    const filterOption = {};
    // if query : date is come then, make a exact matching with date field DD/MM/YYYY
    // make a date object and extract dd, mm, yyyy
    if (date) {
      const dateObject = new Date(date);
      const dayOfMonthValue = dateObject.getDate();
      const monthValue = dateObject.getMonth() + 1; // (0-based index, so we add 1)
      const yearValue = dateObject.getFullYear();

      // now, update filter Otion
      filterOption.$expr = {
        $and: [
          { $eq: [{ $dayOfMonth: "$date" }, dayOfMonthValue] },
          { $eq: [{ $month: "$date" }, monthValue] },
          { $eq: [{ $year: "$date" }, yearValue] },
        ],
      };
    }

    // find and count
    const count = await blogModel.countDocuments(filterOption);
    if (dateDescSort) {
      // Sort in descending order/asscending order of the 'date' field
      data = await blogModel
        .find(filterOption)
        .select({ briefDescription: 0, comments: 0 })
        .sort(sortOption) // Sort by 'date' in descending order/asscending order
        .skip((pageNo - 1) * pageSize)
        .limit(pageSize)
        .populate({ path: "imgUrlModelDBId", strictPopulate: false })
        .exec();
    } else {
      data = await blogModel
        .find(filterOption)
        .select({ briefDescription: 0, comments: 0 })
        .skip((pageNo - 1) * pageSize)
        .limit(pageSize)
        .populate({ path: "imgUrlModelDBId", strictPopulate: false })
        .exec();
    }

    // response
    return res
      .status(200)
      .json({ success: true, count, resCount: data ? data.length : 0, data });
  }
);

//3. ------------------------------------------------ Blogs : delete blog-------------------------------------
exports.deleteBlog = catchAsyncError(async (req, res, next) => {
  const err = await validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ success: false, error: err });
  }

  // check permission
  const isAdmin = await adminModel.findById(req.id);
  if (!isAdmin || (isAdmin.role !== "clinicH" && isAdmin.role !== "superAdmin")) {
    return next(new ErrorHandler("You have no permission.", 400));
  }

  // params
  const { dbId } = req.params;

  if (!isValidObjectId(dbId))
    return next(new ErrorHandler("Send valid Object Id.", 400));

  // first find the document from blogs and update the status of the ImgUrLModel Document
  const find = await blogModel.findById(dbId);

  if (!find) return next(new ErrorHandler("Object not exists.", 400));

  const update = await ImgUrLModel.findByIdAndUpdate(
    find.imgUrlModelDBId,
    { isCurrentlyUsed: false },
    { new: true }
  );

  if (!update) return next(new ErrorHandler("Error in deletion", 400));

  // delete the object
  await blogModel.findByIdAndDelete(dbId);

  return res
    .status(200)
    .json({ success: true, message: "Deletion Successful." });
});

//4. ------------------------------------------------ Blogs : update blog-------------------------------------
exports.updateBlog = catchAsyncError(async (req, res, next) => {
  const err = await validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ success: false, error: err });
  }

  // check permission
  const isAdmin = await adminModel.findById(req.id);
  if (!isAdmin || (isAdmin.role !== "clinicH" && isAdmin.role !== "superAdmin")) {
    return next(new ErrorHandler("You have no permission.", 400));
  }

  // params
  const { dbId } = req.params;
  if (!isValidObjectId(dbId))
    return next(new ErrorHandler("Send valid Object Id.", 400));

  const existingData = await blogModel.findById(dbId);
  if (!existingData) return next(new ErrorHandler("Object not exists."));

  // body
  const {
    imgUrlModelDBId,
    title,
    date,
    shortDescription,
    briefDescription,
  } = req.body;

  // update option
  const updateOption = {};
  if (title) updateOption.title = title;
  if (date) updateOption.date = date;
  if (shortDescription) updateOption.shortDescription = shortDescription;
  if (briefDescription) updateOption.briefDescription = briefDescription;

  if (imgUrlModelDBId) {
    if (!isValidObjectId(imgUrlModelDBId))
      return next("Send valid Object Id for ImgUrlModel", 400);

    const checkImgDoc = await ImgUrLModel.findById(imgUrlModelDBId);
    if (checkImgDoc.isCurrentlyUsed === true)
      return next(
        new ErrorHandler(
          "You cannot reference the same ImgUrlModel document in multiple locations or fields simultaneously.",
          400
        )
      );

    // now, update the status of the existing imgUrlModelDbId
    await ImgUrLModel.findByIdAndUpdate(
      existingData.imgUrlModelDBId,
      { isCurrentlyUsed: false },
      { new: true }
    );

    // update the status of the newly assigned imgUrlModelDbId
    await ImgUrLModel.findByIdAndUpdate(
      imgUrlModelDBId,
      { isCurrentlyUsed: true },
      { new: true }
    );

    // we are ready to update this
    updateOption.imgUrlModelDBId = imgUrlModelDBId;
  }

  // update the doc
  const update = await blogModel.findByIdAndUpdate(
    dbId,
    updateOption,
    { new: true }
  );
  if (update.imgUrlModelDBId === imgUrlModelDBId) {
    await ImgUrLModel.findByIdAndUpdate(
      imgUrlModelDBId,
      { isCurrentlyUsed: true },
      { new: true }
    );
  }

  // response
  return res
    .status(200)
    .json({ success: true, message: "Updation successfully.", data: update });
});

/* 5. -----------------------------------------Blogs : View single blog------------------------------------ */
exports.viewSingleBlog = catchAsyncError(
  async (req, res, next) => {
    const err = await validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ success: false, error: err });
    }

    // params
    const { dbId } = req.params;
    const data = await blogModel
      .findById(dbId)
      .populate({ path: "imgUrlModelDBId", strictPopulate: false })
      .exec();
    return res.status(200).json({ success: true, data });
  }
);

