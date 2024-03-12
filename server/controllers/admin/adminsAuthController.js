const adminModel = require("../../models/admin/adminModel");
const catchAsyncError = require("../../middleware/catchAsyncError");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const ErrorHandler = require("../../utils/errorHandler");
const { validatePassword, validateEmail } = require("../../utils/validators");
const { generateOTP } = require("../../utils/otherImpFunctions");
const jsonwebtoken = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const JWT_SECRET = process.env.JWT_SECRET;
const sendMail = require("../../utils/sendEmail");

// 1. signup : for making a administrator (superAdmin) :- has a full access and created by programmer (only one time), body : name, email, mobile, password, address
// 2. createNewAdmin : performed by superAdmin. for creating new admins, body : name, email, mobile, password, address
// 3. login : admin and administrator (superAdmin) login api, body: email, password
// 4. view all admin/superAdmin : performed by superAdmin. query : role ("superAdmin", "clinicH"), pageNo, pageSize 
// 5. deleteAdmin : perform by superAdmin: params: dbId
// 6. changeStatusOfTheAdmin : perform by superAdmin. params: dbId, body: status
// 7. sendOTP :   query :- email
// 8. verifyOTP : body :- email, OTP
// 9. updatePassword : perform by admin/superAdmin. params : email, body: newPassword (String), OTP (String).
// 10. updateProfile : perform by admin/superAdmin. (superAdmin can update other admin profile and other admin can also update their own profile) params:- email, body:- name, mobile, whatsappNO, address, password

// 1. -------------------- signup : for making a administrator (superAdmin) :- has a full access and created by programmer (only one time)---------------------
exports.signup = catchAsyncError(async (req, res, next) => {
  const err = await validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ success: false, error: err });
  }

  const { name, email, mobile, whatsappNo, password, address } = req.body;

  if (!name) return next(new ErrorHandler("Name field is requirred.", 400));
  if (!email) return next(new ErrorHandler("Email field is requirred.", 400));
  if (!mobile)
    return next(new ErrorHandler("Mobile number is requirred.", 400));
  if (!password)
    return next(new ErrorHandler("Password field is requirred.", 400));

  // check mail id is valid or not.
  const isValidEmail = await validateEmail(email);
  if (!isValidEmail) return next(new ErrorHandler("Email is not valid.", 400));

  // validate, password meets its criticeria or not.
  const isValid = await validatePassword(password);
  if (isValid.length !== 0) {
    return next(new ErrorHandler("Password:" + isValid[0].message, 400));
  }

  // check if email already exists or not
  const check = await adminModel.findOne({ email: email.toLowerCase().trim() });
  if (check) {
    return next(new ErrorHandler("Email id already exists.", 400));
  }

  // encrypt the password
  const salt = await bcryptjs.genSalt(10);
  const enPassword = await bcryptjs.hash(password, salt);

  // now, create new superAdmin
  const data = await adminModel.create({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    mobile: mobile,
    whatsappNo: whatsappNo,
    password: enPassword,
    role: "superAdmin",
    address: address ? address.trim() : undefined,
  });

  // return response
  return res.status(200).json({
    success: true,
    message: "Super Admin created successfully.",
    data,
  });
});

// 2. --------------------------------------------createNewAdmin : for creating new admins/subAdmins--------------------------------
exports.createNewAdmin = catchAsyncError(async (req, res, next) => {
  const err = await validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ success: false, error: err });
  }

  // first of all check permission
  const isSuperAdmin = await adminModel.findById(req.id);
  if (!isSuperAdmin || isSuperAdmin.role !== "superAdmin") {
    return next(new ErrorHandler("You have no permission.", 400));
  }

  // body
  const { name, email, mobile, password, address } = req.body;

  if (!name) return next(new ErrorHandler("Name field is requirred.", 400));
  if (!email) return next(new ErrorHandler("Email field is requirred.", 400));
  if (!password)
    return next(new ErrorHandler("Password field is requirred.", 400));

  // check mail id is valid or not.
  const isValidEmail = await validateEmail(email);
  if (!isValidEmail) return next(new ErrorHandler("Email is not valid.", 400));

  // validate, password meets its criticeria or not.
  const isValid = await validatePassword(password);
  if (isValid.length !== 0) {
    return next(new ErrorHandler("Password:" + isValid[0].message, 400));
  }

  // check if email already exists or not
  const check = await adminModel.findOne({ email: email.toLowerCase().trim() });
  if (check) {
    return next(new ErrorHandler("Email id already exists.", 400));
  }

  // encrypt the password
  const salt = await bcryptjs.genSalt(10);
  const enPassword = await bcryptjs.hash(password, salt);

  // now, create new superAdmin
  const data = await adminModel.create({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    mobile: mobile,
    password: enPassword,
    role: "clinicH",
    address: address ? address.trim() : undefined,
  });

  // return response
  return res.status(200).json({
    success: true,
    message: "Admin created successfully.",
    data,
  });
});

// 3. -----------------------------------------login : admin and administrator (superAdmin) login api--------------------------------------
exports.login = catchAsyncError(async (req, res, next) => {
  const err = await validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ success: false, error: err });
  }

  // body
  const { email, password } = req.body;

  if (!email) return next(new ErrorHandler("Email field is requirred.", 400));
  if (!password)
    return next(new ErrorHandler("Password field is requirred.", 400));

  // find and verify password
  const user = await adminModel.findOne({ email: email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Email not exists.", 400));
  }

  const enPassword = user.password;

  // verify password
  const verifyPassword = await bcryptjs.compare(password, enPassword);
  if (!verifyPassword) {
    return next(new ErrorHandler("Password is invalid."));
  }

  // check status
  if (user.status !== "active") {
    return next(new ErrorHandler("You are blocked by higher authority.", 400));
  }

  // create json web token and send this
  const token = jsonwebtoken.sign(
    { _id: user._id, name: user.name, email: user.email, role: user.role },
    JWT_SECRET
  );

  return res
    .status(200)
    .json({ success: true, message: "Login successful.", token });
});

// 4. ----------------------------------------------View all admin/superAdmin--------------------------------------------------
exports.viewAllAdminSuperAdmin = catchAsyncError(async (req, res, next) => {
  const err = await validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ success: false, error: err });
  }

  // first of all check permission
  const isSuperAdmin = await adminModel.findById(req.id);
  if (!isSuperAdmin || isSuperAdmin.role !== "superAdmin") {
    return next(new ErrorHandler("You have no permission.", 400));
  }

  // query
  const { role, pageNo, pageSize } = req.query;

  if (pageNo < 1)
    return res
      .status(400)
      .json({ success: false, message: "Page No must be greater than zero." });
  if (pageSize < 1)
    return res.status(400).json({
      success: false,
      message: "Page size must be greater than zero.",
    });

  let count;
  let data;

  const option = { }; 
  if(role) option.role = role;
  // for filtering the data
  // if role is 'admin' then send all admins else if role is 'superAdmin' then send all superAdmins else send all admins and superAdmins.
  count = await adminModel.countDocuments(option);
  data = await adminModel
    .find(option)
    .skip((pageNo - 1) * pageSize)
    .limit(pageSize)
    .exec();

  return res
    .status(200)
    .json({ success: true, count, resCount: data ? data.length : 0, data });
});

// 5. ----------------------------------------------------delete admin--------------------------------------------------------
exports.deleteAdmin = catchAsyncError(async (req, res, next) => {
  const err = await validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ success: false, error: err });
  }

  // first of all check permission
  const isSuperAdmin = await adminModel.findById(req.id);
  if (!isSuperAdmin || isSuperAdmin.role !== "superAdmin") {
    return next(new ErrorHandler("You have no permission.", 400));
  }

  // params
  const { dbId } = req.params;
  if (!dbId)
    return next(
      new ErrorHandler(
        "Object Id (dbId) is necessary for deletion operation.",
        400
      )
    );

  // verify dbId
  const verify = mongoose.isValidObjectId(dbId);
  if (!verify)
    return next(new ErrorHandler("Send valid Object Id (dbId).", 400));

  // now, find
  const find = await adminModel.findById(dbId);
  if (!find)
    return next(new ErrorHandler("Data not exists or already deleted."));
  if (find.role === "superAdmin")
    return next(
      new ErrorHandler(
        "You can not delete Administrator (superAdmin) account.",
        400
      )
    );

  // delete the data
  await adminModel.findByIdAndDelete(dbId);

  // res
  return res
    .status(200)
    .json({ success: true, message: "Deletion successful." });
});

// 6. ---------------------------------------Change Status of the Admin : active/blocked---------------------------------------
exports.changeStatusOfTheAdmin = catchAsyncError(async (req, res, next) => {
  const err = await validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ success: false, error: err });
  }

  // first of all check permission
  const isValidPerson = await adminModel.findById(req.id);
  if (!isValidPerson || isValidPerson.role !== "superAdmin") {
    return next(new ErrorHandler("You have no permission.", 400));
  }

  // params
  const { dbId } = req.params;
  if (!dbId)
    return next(
      new ErrorHandler(
        "Object Id (dbId) is necessary for deletion operation.",
        400
      )
    );

  // body
  const { status } = req.body;
  if (!status) return next(new ErrorHandler("Status field is necessary.", 400));

  // custom validation of enum
  const statusAllValue = ["active", "blocked"];
  if (!statusAllValue.includes(status)) {
    return next(
      new ErrorHandler(
        `admins validation failed: status: ${status} is not a valid enum value for path status.`,
        400
      )
    );
  }

  // now, find
  const find = await adminModel.findById(dbId);
  if (!find) return next(new ErrorHandler("Data not exists."));
  if (find.role === "superAdmin")
    return next(
      new ErrorHandler(
        "You can not change status of Administrator (superAdmin) account.",
        400
      )
    );

  // update the status
  const data = await adminModel.findByIdAndUpdate(
    dbId,
    { status: status },
    { new: true }
  );

  // res
  return res
    .status(200)
    .json({ success: true, message: "Updation Successful.", data });
});

// 7. ---------------------------------------------------Send OTP------------------------------------------------------------------
exports.sendOTP = catchAsyncError(async (req, res, next) => {
  const err = await validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ success: false, error: err });
  }

  // query
  const { email } = req.query;
  if (!email) return next(new ErrorHandler("Email field is necessary.", 400));

  //   check admin/superAdmin exists or not
  const check = await adminModel.findOne({ email: email });
  if (!check) return next(new ErrorHandler("Email not exists.", 400));

  // generate OTP
  const OTP = await generateOTP();

  // console.log(OTP);

  // Encrypt this OTP
  const salt = await bcryptjs.genSalt(10);
  const enOTP = await bcryptjs.hash(String(OTP), salt);

  // save Encrypted OTP in database
  await adminModel.findOneAndUpdate(
    { email: email },
    { otp: enOTP },
    { new: true }
  );

  const text = `<!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>OTP Notification</title>
       <style>
           /* Styling for the container */
           .container {
               background-color: #f2f2f2;
               padding: 20px;
               border-radius: 10px;
               text-align: center;
               font-family: Arial, sans-serif;
           }
   
           /* Styling for the OTP code */
           .otp-code {
               font-size: 24px;
               font-weight: bold;
               color: #007BFF;
               margin-bottom: 20px;
           }
   
           /* Styling for the message */
           .message {
               font-size: 18px;
               color: #333;
           }
       </style>
   </head>
   <body>
       <div class="container">
           <p class="otp-code">OTP: ${OTP}</p>
           <p class="message">OTP sent from MyMetaLogic</p>
       </div>
   </body>
   </html>
   `;

  // send original OTP to otp-requester viva mail
  await sendMail(email, "Requested OTP : MyMetaLogic", text);

  // res
  return res.status(200).json({
    success: true,
    message: "OTP sent successfully. Check your mailbox.",
  });
});

// 8. ------------------------------------------------------------Verify OTP--------------------------------------------------
exports.verifyOTP = catchAsyncError(async (req, res, next) => {
  const err = await validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ success: false, error: err });
  }

  // body : email
  const { email, OTP } = req.body;

  // find object and verify otp
  const data = await adminModel.findOne({ email: email }).select("+otp");
  const verify = await bcryptjs.compare(OTP, data.otp);
  if (!verify) return next(new ErrorHandler("OTP verification failed.", 400));

  return res
    .status(200)
    .json({ success: true, message: "OTP verified successfully." });
});

// 9. -----------------------------------------------------------Update Password-----------------------------------------------
exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const err = await validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ success: false, error: err });
  }

  // query : email, body: newPassword (String), OTP (String)
  // query
  const { email } = req.params;

  // body
  const { newPassword, OTP } = req.body;

  // find object and verify otp
  const data = await adminModel.findOne({ email: email }).select("+otp");
  const verify = await bcryptjs.compare(OTP, data.otp);
  if (!verify) return next(new ErrorHandler("OTP verification failed.", 400));

  // validate, password meets its criticeria or not.
  const isValid = await validatePassword(newPassword);
  if (isValid.length !== 0) {
    return next(new ErrorHandler("Password:" + isValid[0].message, 400));
  }

  const salt = await bcryptjs.genSalt(10);
  const enPassword = await bcryptjs.hash(newPassword, salt);

  // now, update password
  const updatedData = await adminModel.findOneAndUpdate(
    { email: email },
    { password: enPassword },
    { new: true }
  );

  // res
  return res.status(200).json({
    success: true,
    message: "Password updated successfully.",
    data: updatedData,
  });
});

// 10. ------------------------------------------------------------Update Profile-----------------------------------------------
exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const err = await validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ success: false, error: err });
  }

  // params
  const { email } = req.params;

  if (!email) return next(new ErrorHandler("Email field is requirred.", 400));

  // body
  const { name, mobile, whatsappNO, address, password } = req.body;

  // first of all check permission
  const check = await adminModel.findById(req.id);
  if (!check) {
    return next(new ErrorHandler("You have no permission.", 400));
  }
  if (
    check.role !== "superAdmin" &&
    check.email.toLowerCase().trim() !== email.toLowerCase().trim()
  ) {
    return next(new ErrorHandler("You have no permission.", 400));
  }

  // update the profile
  const updateFields = {};

  if (name) {
    updateFields.name = name;
  }
  if (mobile) {
    updateFields.mobile = mobile;
  }
  if (whatsappNO) {
    updateFields.whatsappNo = whatsappNo;
  }
  if (address) {
    updateFields.address = address;
  }
  if (password) {
    // validate, password meets its criticeria or not.
    const isValid = await validatePassword(password);
    if (isValid.length !== 0) {
      return next(new ErrorHandler("Password:" + isValid[0].message, 400));
    }

    // encrypt the password
    const salt = await bcryptjs.genSalt(10);
    const enPassword = await bcryptjs.hash(password, salt);
    updateFields.password = enPassword;
  }

  // Update the document based on the fields in updateFields
  const data = await adminModel.findOneAndUpdate(
    { email: email },
    updateFields,
    {
      new: true,
    }
  );

  // res
  return res
    .status(200)
    .json({ success: true, message: "Profile updated successfully.", data });
});
