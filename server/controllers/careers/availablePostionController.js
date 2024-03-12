const adminModel = require("../../models/admin/adminModel");
const availablePositionModel = require("../../models/careers/availablePositionModel");
const catchAsyncError = require("../../middleware/catchAsyncError");
const { validationResult } = require("express-validator");
const ErrorHandler = require("../../utils/errorHandler");
const { default: mongoose } = require("mongoose");
const moment = require("moment");

/*  1. listNewJob : perform by admin pannel : 
body :-  position (String), count (String), salary (String), status(String, enum: ["ActivelyHiring", "Closed"], default : ActivelyHiring), link (String), requirementArray (Array of String), responsibilityArray (Array of String)
*/
/* 2. fetchAllListedJosbs  :
query :- pageNo, pageSize, dateDescSort(Boolean), status(String, enum: ["ActivelyHiring", "Closed"]) 
*/
/* 3. updateListedJob : perform by admin pannel : params:- dbId (_id of the document) : body :- position (String), count (String), salary (String), status(String, enum: ["ActivelyHiring", "Closed"]), link (String), requirementArray (Array of String), responsibilityArray (Array of String)
 */
/* 4. deleteJob : perform by admin pannel : 
params :- dbId (_id of the document)
*/

//1. ---------------------------------------------listNewJob------------------------------------
exports.listNewJob = catchAsyncError(async (req, res, next) => {
  const err = await validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ success: false, error: err });
  }

  // check permission
  const isAdmin = await adminModel.findById(req.id);
  if (
    !isAdmin ||
    (isAdmin.role !== "admin" &&
      isAdmin.role !== "superAdmin" &&
      isAdmin.role !== "subAdmin")
  ) {
    return next(new ErrorHandler("You have no permission.", 400));
  }

  // req.body
  const {
    position,
    count,
    salary,
    status,
    link,
    requirementArray,
    responsibilityArray,
  } = req.body;

  // Create document
  const data = await availablePositionModel.create({
    position,
    count,
    salary,
    status,
    link,
    requirementArray,
    responsibilityArray,
  });

  // response
  return res
    .status(200)
    .json({ success: true, message: "Successfully saved the data.", data });
});

//2. ------------------------------------------fetchAllListedJosbs------------------------------------
exports.fetchAllListedJosbs = catchAsyncError(async (req, res, next) => {
  const err = await validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ success: false, error: err });
  }

  // query
  const { pageNo, pageSize, dateDescSort, status } = req.query;

  if (pageNo && pageNo < 1)
    return next(new ErrorHandler("Page no must be greater than zero.", 400));
  if (pageSize && pageSize < 1)
    return next(new ErrorHandler("Page size must be greater than zero.", 400));

  // sort option
  const sortOption = {};
  if (dateDescSort === "true") sortOption.createdAt = -1;
  else if (dateDescSort === "false") sortOption.createdAt = 1;

  // filter option
  const filterOption = {};
  if (status) {
    filterOption.status = status;
  }

  // find and count
  const count = await availablePositionModel.countDocuments(filterOption);
  const data = await availablePositionModel
    .find(filterOption)
    .sort(sortOption)
    .skip((pageNo - 1) * pageSize)
    .limit(pageSize)
    .exec();

  // response
  return res
    .status(200)
    .json({ success: true, count, resCount: data ? data.length : 0, data });
});

// 3. ------------------------------------updateListedJob---------------------------------
exports.updateListedJob = catchAsyncError(async (req, res, next) => {
  const err = await validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ success: false, error: err });
  }

  // check permission
  const isAdmin = await adminModel.findById(req.id);
  if (!isAdmin || (isAdmin.role !== "admin" && isAdmin.role !== "superAdmin" && isAdmin.role !== "subAdmin")) {
    return next(new ErrorHandler("You have no permission.", 400));
  }

  // params
  const { dbId } = req.params;

  // req.body
  const {
    position,
    count,
    salary,
    status,
    link,
    requirementArray,
    responsibilityArray,
  } = req.body;

  // const update option
  const updateOption = {};
  if (position) updateOption.position = position;
  if (count) updateOption.count = count;
  if (salary) updateOption.salary = salary;
  if (status) {
    if (status !== "ActivelyHiring" && status !== "Closed") {
      return next(new ErrorHandler("Error in enum verification. Check status field value.", 400));
    }
  }
  if (link) updateOption.link = link;
  if (requirementArray) updateOption.requirementArray = requirementArray;
  if (responsibilityArray) updateOption.responsibilityArray = responsibilityArray;

  const update = await availablePositionModel.findByIdAndUpdate(dbId, updateOption, { new: true });

  return res
    .status(200)
    .json({
      success: true,
      message: "Status updation successful.",
      data: update,
    });
});

//4. --------------------------------------------deleteJob-------------------------------------
exports.deleteJob = catchAsyncError(async (req, res, next) => {
  const err = await validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ success: false, error: err });
  }

  // check permission
  const isAdmin = await adminModel.findById(req.id);
  if (!isAdmin || (isAdmin.role !== "admin" && isAdmin.role !== "superAdmin" && isAdmin.role !== "subAdmin")) {
    return next(new ErrorHandler("You have no permission.", 400));
  }

  // params
  const { dbId } = req.params;

  // delete the object
  const data = await availablePositionModel.findByIdAndDelete(dbId);
  if (!data)
    return next(new ErrorHandler("Data not exists or already deleted.", 400));

  // res
  return res
    .status(200)
    .json({ success: true, message: "Deletion successfully." });
});
