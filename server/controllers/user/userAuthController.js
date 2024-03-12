const userModel = require("../../models/user/userModel");
const adminModel = require("../../models/admin/adminModel");
const moment = require("moment");
const { validationResult } = require("express-validator");
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const catchAsyncError = require("../../middleware/catchAsyncError");
const ErrorHandler = require("../../utils/errorHandler");
const { validateEmail, validatePassword } = require("../../utils/validators");
const bcryptjs = require("bcryptjs");
const {
  generateOTP,
  textTemplateForNewAccoundVerification,
  textTemplateForSendOTP,
} = require("../../utils/otherImpFunctions");
const sendEmail = require("../../utils/sendEmail");

/* 1. registerNewUser : perform by user pannel : body :- name{firstname, lastname}, email, mobileNo, password, serviceCategory(Enum : ["Clinic","Institute","Research","Corporate Wellbeing"]) : aftr that need OTP Verification */
/* 2. userAccountOTPVerification : perform by user pannel : body :- email, otp */
/* 3. viewAllUsers : perfrom by admin pannel : headers :- token : query :- pageNo, pageSize, dateDescSort (Boolean, sorting), isVerified (Boolean, filtering), status (String, filtering)["active","blocked"], serviceCategory(String, for filtering the data["Clinic","Institute","Research","Corporate Wellbeing"] : 
here (pageNo, pageSize)--->Pagination, (dateDescSort)--->Sorting, (isVerified, status)--->Filter the data.  */
/* 4. deleteUnVerifiedUser : perfrom by admin pannel : headers :- token : params :- dbId (Object Id of the mongodb document) */
/* 5. changeUserAccountStatus : perfrom by admin pannel : headers :- token : params :- dbId (Object Id of the mongodb document) : body :- status (String) active/blocked */
/* 6. userLogin : body :- email (String), password (String) */
/* 7. userSendOTP : query :- email */
/* 8. userVerifyOTP : body :- email, OTP */
/* 9. userUpdatePassword : params :- email : body :- newPassword, OTP */
/* 10. userUpdateProfile : headers : token : params :- email : body :- name {firstname, lastname}, password, mobileNo, serviceCategory(Enum : ["Clinic","Institute","Research","Corporate Wellbeing"]) : send only that field in body that you want to update. */
/* 11. userGetMyProfile : headers : token : only for user panel */

/* 1. --------------------------------------------Register New User-------------------------------------------------  */
exports.registerNewUser = catchAsyncError(async (req, res, next) => {
  const err = await validationResult(req);
  
  if (!err.isEmpty()) {
    console.log("Validation errors:", err.array());
    return res.status(400).json({ success: false, error: err });
  }

  const { name, email, mobileNo, password, serviceCategory } = req.body;

  // validate email and password
  const isValidEmail = await validateEmail(email);
  if (!isValidEmail) {
    console.log("1")
    return next(new ErrorHandler("Enter valid mail Id.", 400));
  }
  const isValid = await validatePassword(password);
  if (isValid.length !== 0) {
    console.log("2")
    return next(new ErrorHandler("Password:" + isValid[0].message, 400));
  }

  // find user if exist
  const find = await userModel.findOne({ email: email.toLowerCase() });
  if (find && find.isVerified) {
    console.log("3")
    return next(new ErrorHandler("Account already exists.", 400));
  } else if (find && !find.isVerified) {
    //create new account
    const salt = await bcryptjs.genSalt(10);
    const enPassword = await bcryptjs.hash(password, salt);
    // generate 6-digit otp, save and send that otp for verification of the account
    const OTP = await generateOTP();
    // Encrypt this OTP
    const enOTP = await bcryptjs.hash(String(OTP), salt);

    // Update the properties of the existing user
    find.name = name;
    find.email = email.trim().toLowerCase();
    find.mobileNo = mobileNo;
    find.password = enPassword;
    find.serviceCategory = serviceCategory;
    find.otp = enOTP;

    // Save the changes to the existing user
    await find.save();

    // console.log(find);

    // send mail
    const text = textTemplateForNewAccoundVerification(OTP);
    try {
      await sendEmail(email, "Requested OTP : WeAvecU", text);
    } catch (emailError) {
      return next(
        new ErrorHandler(
          "Account registration failed. Email could not be sent.",
          500
        )
      );
    }

    // response
    return res.status(200).json({
      success: true,
      message: "Check your mail box and Enter  OTP...",
      data: find,
    });
  } else {
    //create new account
    const salt = await bcryptjs.genSalt(10);
    const enPassword = await bcryptjs.hash(password, salt);
    // generate 6-digit otp, save and send that otp for verification of the account
    const OTP = await generateOTP();
    // Encrypt this OTP
    const enOTP = await bcryptjs.hash(String(OTP), salt);

    const userAccount = await userModel.create({
      name: name,
      email: email.trim().toLowerCase(),
      mobileNo: mobileNo,
      password: enPassword,
      serviceCategory: serviceCategory,
      otp: enOTP,
    });

    // send mail
    const text = textTemplateForNewAccoundVerification(OTP);
    try {
      await sendEmail(email, "Requested OTP : WeAvecU", text);
    } catch (emailError) {
      return next(
        new ErrorHandler(
          "Account registration failed. Email could not be sent.",
          500
        )
      );
    }

    // response
    return res.status(200).json({
      success: true,
      message: "Check your mailbox and Enter  OTP...",
      data: userAccount,
    });
  }
});

/* 2. --------------------------------------------------otp-verification-of-the-user-account---------------------------------- */
exports.userAccountOTPVerification = catchAsyncError(async (req, res, next) => {
  const err = await validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ success: false, error: err });
  }

  // body
  const { email, otp } = req.body;

  // find
  const find = await userModel.findOne({ email: email }).select("+otp");
  if (!find) return next(new ErrorHandler("User not exists."));
  if (!find.otp || find.otp === "")
    return next(new ErrorHandler("Go to account registration page."));

  // verify otp
  const enOtp = find.otp;
  const isCorrect = await bcryptjs.compare(otp, enOtp);

  if (!isCorrect) return next(new ErrorHandler("Envalid OTP", 400));
  const data = await userModel.findOneAndUpdate(
    { email: email },
    { isVerified: true },
    { new: true }
  );
  // response
  return res.status(200).json({
    success: true,
    message: "Verification successfully completed.",
    data,
  });
});

/* 3. --------------------------------------------------View All Users-------------------------------------- */
exports.viewAllUsers = catchAsyncError(async (req, res, next) => {
  const err = await validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ success: false, error: err });
  }

  // check permission
  const isValid = await adminModel.findById(req.id);
  if (!isValid || (isValid.role !== "superAdmin" && isValid.role !== "clinicH")) {
    return next(new ErrorHandler("You have no permission.", 400));
  }

  // query
  const {
    pageNo,
    pageSize,
    dateDescSort, // Boolean for Sorting
    isVerified, // Boolean for Filtering
    status, // String : Enum ["active", "blocked"] for Filtering
    serviceCategory, // String : Enum: ["Clinic","Institute","Research","Corporate Wellbeing"]
  } = req.query;

  if (pageNo && pageNo < 1)
    return next(
      new ErrorHandler("Value of pageNo must be greater than zero", 400)
    );
  if (pageSize && pageSize < 1)
    return next(
      new ErrorHandler("Value of pageSize must be greater than zero.", 400)
    );

  // filter option
  const filterOption = {};
  if (isVerified) filterOption.isVerified = isVerified;
  if (status && (status === "active" || status === "blocked"))
    filterOption.status = status;
  if(serviceCategory) filterOption.serviceCategory = serviceCategory;

  const sortOption = {};
  if (dateDescSort === "true") {
    sortOption.createdAt = -1;
  } else if (dateDescSort === "false") {
    sortOption.createdAt = 1;
  }

  const count = await userModel.countDocuments(filterOption).exec();
  let data = await userModel
    .find(filterOption)
    .sort(sortOption)
    .skip((pageNo - 1) * pageSize)
    .limit(pageSize)
    .exec();

  return res
    .status(200)
    .json({ success: true, count, resCount: data ? data.length : 0, data });
});

/* 4. --------------------------------------------------DeleteUnVerifiedUser-------------------------------------------*/
exports.deleteUnVerifiedUser = catchAsyncError(async (req, res, next) => {
  const err = await validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ success: false, error: err });
  }

  // check permission
  const isValid = await adminModel.findById(req.id);
  if (!isValid || (isValid.role !== "superAdmin" && isValid.role !== "clinicH")) {
    return next(new ErrorHandler("You have no permission.", 400));
  }

  // params
  const { dbId } = req.params;

  // we can only delete not-verified user
  const check = await userModel.findById(dbId);
  if (!check) return next(new ErrorHandler("User not exists.", 400));
  if (check.isVerified)
    return next(new ErrorHandler("You can not delete verified user.", 400));

  await userModel.findByIdAndDelete(dbId);
  return res
    .status(200)
    .json({ success: true, message: "Deletion successful." });
});

/* 5. -----------------------------------------------Change Status of the Verified User---------------------------------- */
exports.changeUserAccountStatus = catchAsyncError(async (req, res, next) => {
  const err = await validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ success: false, error: err });
  }
  // check permission
  const isValid = await adminModel.findById(req.id);
  if (!isValid || (isValid.role !== "superAdmin" && isValid.role !== "clinicH")) {
    return next(new ErrorHandler("You have no permission.", 400));
  }
  // params
  const { dbId } = req.params;

  // body
  const { status } = req.body;
  if (!status)
    return next(new ErrorHandler("Send the status field value.", 400));
  if (status !== "active" && status !== "blocked")
    return next(new ErrorHandler("Check status field value"));

  // change status
  const updatedData = await userModel.findByIdAndUpdate(
    dbId,
    { status: status },
    { new: true }
  );
  if (!updatedData) return next(new ErrorHandler("User not exists.", 400));
  //res
  return res.status(200).json({
    success: true,
    message: "Account status updated successfully.",
    updatedData,
  });
});

/* 6. -----------------------------------------------------------Login----------------------------------------------- */
exports.userLogin = catchAsyncError(async (req, res, next) => {
  const err = await validationResult(req);
  if (!err.isEmpty())
    return res.status(400).json({ success: false, error: err });

  // body
  const { email, password } = req.body;
  if (!email || !password)
    return next(new ErrorHandler("Email and Password are required.", 400));
  // verify email structure
  if (!validateEmail(email)) {
    return next(new ErrorHandler("Send valid email.", 400));
  }

  //find and check password
  const findUser = await userModel
    .findOne({ email: email })
    .select("+password");
  if (!findUser)
    return next(
      new ErrorHandler("Email not exists, goto registration page.", 400)
    );

  // compare password
  const enPassword = findUser.password;
  const isAuth = await bcryptjs.compare(password, enPassword);
  if (!isAuth) return next(new ErrorHandler("Invalid password.", 400));

  // check verified and active status
  if (!findUser.isVerified)
    return next(new ErrorHandler("Go to registration page.", 400));
  if (findUser.status !== "active")
    return next(
      new ErrorHandler("You are blocked. Contact organization...", 400)
    );

  // generate token
  const token = jwt.sign(
    {
      _id: findUser._id,
      name: findUser.name,
      email: findUser.email,
    },
    JWT_SECRET,
    {
      expiresIn: "8h",
    }
  );

  // response
  return res
    .status(200)
    .json({ success: true, message: "Login successfully.", token });
});

// 7. ---------------------------------------------------Send OTP------------------------------------------------------------------
exports.userSendOTP = catchAsyncError(async (req, res, next) => {
  const err = await validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ success: false, error: err });
  }

  // query
  const { email } = req.query;
  if (!email) return next(new ErrorHandler("Email field is necessary.", 400));

  //   check if user exists or not
  const check = await userModel.findOne({ email: email });
  if (!check) return next(new ErrorHandler("Email not exists.", 400));
  // check verified user or not
  if (check.isVerified === false) {
    return next(
      new ErrorHandler("You are not verified. Go to register page.", 400)
    );
  }
  // check status
  if (check.status === "blocked" || check.status !== "active") {
    return next(
      new ErrorHandler("You are blocked. Contact organization...", 400)
    );
  }

  // generate OTP
  const OTP = await generateOTP();

  // console.log(OTP);

  // Encrypt this OTP
  const salt = await bcryptjs.genSalt(10);
  const enOTP = await bcryptjs.hash(String(OTP), salt);

  // save Encrypted OTP in database
  await userModel.findOneAndUpdate(
    { email: email },
    { otp: enOTP },
    { new: true }
  );

  const text = textTemplateForSendOTP(OTP);

  // send original OTP to otp-requester viva mail
  await sendEmail(email, "Requested OTP : WeAvecU", text);

  // res
  return res.status(200).json({
    success: true,
    message: "OTP sent successfully. Check your mailbox.",
  });
});

// 8. ---------------------------------------Verify OTP--------------------------------------------------
exports.userVerifyOTP = catchAsyncError(async (req, res, next) => {
  const err = await validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ success: false, error: err });
  }

  // body : email
  const { email, OTP } = req.body;

  // find object and verify otp
  const data = await userModel.findOne({ email: email }).select("+otp");
  const verify = await bcryptjs.compare(OTP, data.otp);
  if (!verify) return next(new ErrorHandler("OTP verification failed.", 400));

  return res
    .status(200)
    .json({ success: true, message: "OTP verified successfully." });
});

// 9. -----------------------------------------------------------Update Password-----------------------------------------------
exports.userUpdatePassword = catchAsyncError(async (req, res, next) => {
  const err = await validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ success: false, error: err });
  }

  // params
  const { email } = req.params;
  // body
  const { newPassword, OTP } = req.body;

  // find object and verify otp
  const data = await userModel.findOne({ email: email }).select("+otp");
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
  const updatedData = await userModel.findOneAndUpdate(
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
exports.userUpdateProfile = catchAsyncError(async (req, res, next) => {
  const err = await validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ success: false, error: err });
  }

  // params
  const { email } = req.params;

  if (!email) return next(new ErrorHandler("Email field is requirred.", 400));

  // body
  const { name, password, mobileNo, serviceCategory } = req.body;

  // first of all check permission
  const check = await userModel.findById(req.id);
  if (!check) {
    return next(new ErrorHandler("You have no permission.", 400));
  }

  // update the profile
  const updateFields = {};

  if (name) {
    updateFields.name = name;
  }
  if (displayname) {
    updateFields.displayname = displayname;
  }
  if (mobileNo) {
    updateFields.mobileNo = mobileNo;
  }
  if (serviceCategory) {
    // serviceCategory is enum: ["Clinic","Institute","Research","Corporate Wellbeing"]
    const sc = ["Clinic", "Institute", "Research", "Corporate Wellbeing"];
    if (!sc.includes(serviceCategory)) {
      return next(new ErrorHandler("Check service-category field value.", 400));
    }
    updateFields.serviceCategory = serviceCategory;
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
  const data = await userModel.findOneAndUpdate(
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

/* 11. ------------------------------------------------userGetMyProfile---------------------------------------------- */
exports.userGetMyProfile = catchAsyncError(async (req, res, next) => {
  const err = await validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ success: false, error: err });
  }

  const id = req.id;

  // fetch profile
  const data = await userModel.findById(id).exec();
  if (!data) return next(new ErrorHandler("Error: Check token", 400));

  return res.status(200).json({ success: true, data });
});
