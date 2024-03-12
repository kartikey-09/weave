const adminModel = require("../../models/admin/adminModel");
const contactModel = require("../../models/contact/contactModel");
const catchAsyncError = require("../../middleware/catchAsyncError");
const { validationResult } = require("express-validator");
const ErrorHandler = require("../../utils/errorHandler");
const { default: mongoose } = require("mongoose");

/*  1. insertNewContact : perform by user pannel : 
body :-  name (String), email (String), subject (String), message (String)
*/
/* 2. findAllContacts : perform by admin pannel :
query :- pageNo, pageSize, isContacted, date, dateDescSort 
*/
/* 3. updateContactedStatusOfContacts : perform by admin pannel : params:- dbId (_id of the document) : body :- isContacted (Boolean)
*/
/* 4. deleteContact : perform by admin pannel : 
query :- dbId (_id of the document)
*/

//1. ---------------------------------------------insertNewContact------------------------------------
exports.insertNewContact = catchAsyncError(async (req, res, next) => {
  const err = await validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ success: false, error: err });
  }

  // req.body
  const {
    name,
    email,
    subject,
    message,
  } = req.body;

  // Create document
  const data = await contactModel.create({
    name,
    email: email?email.toLowerCase().trim(): undefined,
    subject,
    message,
  });

  // response
  res
    .status(200)
    .json({ success: true, message: "Successfully saved the data.", data });
});

//2. ----------------------------------------------findAllContacts------------------------------------
exports.findAllContacts = catchAsyncError(async (req, res, next) => {
  const err = await validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ success: false, error: err });
  }

  // check permission
  const isAdmin = await adminModel.findById(req.id);
  if (!isAdmin || (isAdmin.role !== "admin" && isAdmin.role !== "superAdmin")) {
    return next(new ErrorHandler("You have no permission.", 400));
  }

  // query
  const { pageNo, pageSize, isContacted, date, dateDescSort } = req.query;

  if (pageNo && pageNo < 1)
    return next(new ErrorHandler("Page no must be greater than zero.", 400));
  if (pageSize && pageSize < 1)
    return next(new ErrorHandler("Page size must be greater than zero.", 400));

  // sort option
  // sort option
  const sortOption = {};
  if (dateDescSort === "true") sortOption.createdAt = -1;
  else if (dateDescSort === "false") sortOption.createdAt = 1;

  // filter option
  const filterOption = {};
  if(isContacted) filterOption.isContacted = isContacted;
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
        { $eq: [{ $dayOfMonth: "$createdAt" }, dayOfMonthValue] },
        { $eq: [{ $month: "$createdAt" }, monthValue] },
        { $eq: [{ $year: "$createdAt" }, yearValue] },
      ],
    };
  }

  // find and count
  const count = await contactModel.countDocuments(filterOption);
  if (dateDescSort) {
    // Sort in descending order/asscending order of the 'date' field
    data = await contactModel
      .find(filterOption)
      .sort(sortOption) // Sort by 'date' in descending order/asscending order
      .skip((pageNo - 1) * pageSize)
      .limit(pageSize)
      .exec();
  } else {
    data = await contactModel
      .find(filterOption)
      .skip((pageNo - 1) * pageSize)
      .limit(pageSize)
      .exec();
  }

  // response
  return res
    .status(200)
    .json({ success: true, count, resCount: data ? data.length : 0, data });
});

// 3. ---------------------------------------------updateContactedStatusOfContacts---------------------------------
exports.updateContactedStatusOfContacts = catchAsyncError(async(req,res,next)=>{
    const err = await validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ success: false, error: err });
  }

  // check permission
  const isAdmin = await adminModel.findById(req.id);
  if (!isAdmin || (isAdmin.role !== "admin" && isAdmin.role !== "superAdmin")) {
    return next(new ErrorHandler("You have no permission.", 400));
  }

  // params
  const { dbId } = req.params;

  // body
  const {isContacted} = req.body;

  // update
  const update = await contactModel.findByIdAndUpdate(dbId, {isContacted: isContacted}, {new:true});

  return res.status(200).json({success:true, message:"Status updation successful.", data:update});
})

//4. ------------------------------------------------deleteContact-------------------------------------
exports.deleteContact = catchAsyncError(async (req, res, next) => {
  const err = await validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ success: false, error: err });
  }

  // check permission
  const isAdmin = await adminModel.findById(req.id);
  if (!isAdmin || (isAdmin.role !== "admin" && isAdmin.role !== "superAdmin")) {
    return next(new ErrorHandler("You have no permission.", 400));
  }

  // params
  const { dbId } = req.params;

  // check if contact is handled or not
  const find = await contactModel.findById(dbId);
  if(!find) return next(new ErrorHandler("Data not exists.",400));
  if(find.isContacted === false)
  {
    return next(new ErrorHandler("Contact is not handled.",400));
  }

  // delete the object
  const data = await contactModel.findByIdAndDelete(dbId);
  if(!data) return next(new ErrorHandler("Data not exists or already deleted.",400));

  // res
  return res
    .status(200)
    .json({ success: true, message: "Deletion successfully." });
});
