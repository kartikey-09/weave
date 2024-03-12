const {validationResult} = require('express-validator');
const catchAsyncError = require('../../middleware/catchAsyncError');
const ErrorHandler = require('../../utils/errorHandler');
const clinicSessionBookingModel = require('../../models/clinic/clinicSessionBookingModel');
const adminModel = require('../../models/admin/adminModel');
const userModel = require('../../models/user/userModel');
const paymentModel = require('../../models/phonepe/paymentModel');
const {validateEmail, validateAge} = require('../../utils/validators');
const {
    sendMailToUser, 
    sendsMailToOrganisation,
    textTemplateInitClinicBookingForUser,
    textTemplateInitClinicBookingForOrg,
    textTemplateSlotTimeForUser
} = require('../../utils/otherImpFunctions');
const sendMail = require('../../utils/sendEmail');

/*
1. makeClinicSessionRequest : done by users : headers :- token : body :- name, age, whatsappNo, email, mode, description
2. editClinicSessionReq : done by users : Edit clinic session requests can only be done by users until the slot is provided.
3. userFetchReqForAllOfTheOwnClinicSessions : done by users : user can fetch all of its clinic sessions : headers :- token : query :- pageNo, pageSize, dateDescSort(Boolean, for sorting on the basis of creation date)
4. fetchAllClinicSessionRequests : done by admins : headers :- token : query :- pageNo, pageSize, dateDescSort(Boolean, for sorting), isSlotProvided(boolean, for filter), isPaymentDone(boolean, for filter)
5. deleteClinicSessionRequest : done by admins : if payment is not completed then request can be deleted by admins
6. handleClinicSessionSlot : done by admins : give and update clinic session slot : headers :- token : params :- dbId(Object Id) : body :- startTime(DateTime), endTime(DateTime)
7. markClinicSessionCompleted : done by admins : mark/unmark isSessionComplted field
*/

//1. make a request for clinic-session-----------------------------------------------------------
exports.makeClinicSessionRequest = catchAsyncError(async (req, res, next) => {
    try {
      const error = await validationResult(req);
      if (!error.isEmpty()) {
        return res.status(400).json({ success: false, error: error });
      }
  
      const id = req.id;
      if (!id) {
        return next(new ErrorHandler("User Object Id is required.", 400));
      }
  
      const { name, age, whatsappNo, email, mode, description } = req.body;
  
      if (!name) {
        return next(new ErrorHandler("Name field is required.", 400));
      }
      if (!age) {
        return next(new ErrorHandler("Age field is required.", 400));
      }
      if (!whatsappNo) {
        return next(new ErrorHandler("Whatsapp No is required.", 400));
      }
      if (!mode) {
        return next(new ErrorHandler("Select session-mode.", 400));
      }
  
      // Validate age and email
      if (!validateEmail(email)) {
        return next(new ErrorHandler("Send a valid email.", 400));
      }
      if (!validateAge(age)) {
        return next(new ErrorHandler("Age value is not valid.", 400));
      }
  
      // Make the document
      const data = await clinicSessionBookingModel.create({
        name,
        age,
        whatsappNo,
        email: email.toLowerCase().trim(),
        mode,
        description,
        sessionBookedBy: req.id
      });
  
     // Send emails asynchronously
    const sendUserEmailPromise = sendMailToUser(email, "Regarding Clinic-Session Booking", textTemplateInitClinicBookingForUser(data));
    const sendOrgEmailPromise = sendsMailToOrganisation("Regarding Clinic-Session Booking", textTemplateInitClinicBookingForOrg(data));

    // Return a response to the client immediately
    res.status(200).json({ success: true, message: "Requested successfully.", data });

    // Wait for both email promises to complete (if needed)
    await Promise.all([sendUserEmailPromise, sendOrgEmailPromise]);
    } catch (err) {
      next(err); // Handle any errors and pass them to the error handling middleware
    }
});
  

//2. editClinicSessionReq-----------------------------------------------------------------------
exports.editClinicSessionReq = catchAsyncError(async(req,res,next)=>{
    const error = await validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({success:false, error:error});
    }
});

//3. fetchRequestsByUser------------------------------------------------------------------------
exports.userFetchReqForAllOfTheOwnClinicSessions = catchAsyncError(async(req,res,next)=>{
    const error = await validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({success:false, error:error});
    }

    const id = req.id;

    // query
    const {pageNo, pageSize, dateDescSort} = req.query;

    // filter option
    const filterOption = {};
    filterOption.sessionBookedBy = id;

    // sort option
    const sortOption = {};
    if(dateDescSort){
        if(dateDescSort === "true"){
            sortOption.createdAt = -1;
        } else if(dateDescSort === "false"){
            sortOption.createdAt = 1;
        }
    }

    const count = await clinicSessionBookingModel.countDocuments(filterOption);
    const data = await clinicSessionBookingModel
    .find(filterOption)
    .sort(sortOption)
    .skip((pageNo-1)*pageSize)
    .limit(pageSize)
    .populate({path:"payment", strictPopulate:false})
    .exec();

    return res.status(200).json({success:true, count, resCount: data?data.length:0, data});
});

//4. fetchAllRequests----------------------------------------------------------------------------
exports.fetchAllClinicSessionRequests = catchAsyncError(async(req,res,next)=>{
    const error = await validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({success:false, error:error});
    }

    // check permission
    const id = req.id;
    const admins = await adminModel.findById(id);
    if(!admins || (admins.role !== 'superAdmin' && admins.role !== 'admin' && admins.role !== 'subAdmin')){
        return next(new ErrorHandler("You have no permission.",400));
    }

    // query
    const {pageNo, pageSize, dateDescSort, isSlotProvided, isPaymentDone} = req.query;

    // filter option
    const filterOption = {};
    if(isSlotProvided){
        filterOption.isSlotProvided = isSlotProvided;
    }
    if(isPaymentDone){
        filterOption.isPaymentDone = isPaymentDone;
    }

    // sort option
    const sortOption = {};
    if(dateDescSort){
        if(dateDescSort === "true"){
            sortOption.createdAt = -1;
        } else if(dateDescSort === "false"){
            sortOption.createdAt = 1;
        }
    }

    const count = await clinicSessionBookingModel.countDocuments(filterOption);
    const data = await clinicSessionBookingModel
    .find(filterOption)
    .sort(sortOption)
    .skip((pageNo-1)*pageSize)
    .limit(pageSize)
    .populate({path:"payment", strictPopulate:false})
    .populate({path: "sessionBookedBy", strictPopulate: false})
    .exec();

    return res.status(200).json({success:true, count, resCount: data?data.length:0, data});
});

//5. deleteClinicSessionRequests------------------------------------------------------------------
exports.deleteClinicSessionRequest = catchAsyncError(async(req,res,next)=>{
    const error = await validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({success:false, error:error});
    }

    // check permission
    const id = req.id;
    const admins = await adminModel.findById(id);
    if(!admins || (admins.role !== 'superAdmin' && admins.role !== 'admin' && admins.role !== 'subAdmin')){
        return next(new ErrorHandler("You have no permission.",400));
    }

});

//6. handleClinicSessionSlot-----------------------------------------------------------------------
exports.handleClinicSessionSlot = catchAsyncError(async(req,res,next)=>{
    try
    {
    const error = await validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({success:false, error:error});
    }

    // check permission
    const id = req.id;
    const admins = await adminModel.findById(id);
    if(!admins || (admins.role !== 'superAdmin' && admins.role !== 'admin' && admins.role !== 'subAdmin')){
        return next(new ErrorHandler("You have no permission.",400));
    }

    const {dbId} = req.params; // params
    const {startTime, endTime} = req.body; // body
    
    if(!startTime) return next(new ErrorHandler("Start time is required.",400));
    if(!endTime) return next(new ErrorHandler("End time is required.",400));
    if (isNaN(new Date(startTime).getTime()) || isNaN(new Date(endTime).getTime())) {
        return next(new ErrorHandler("Invalid date/time format.", 400));
    }
    if (startTime >= endTime) {
        return next(new ErrorHandler("Start time must be before the end time.", 400));
    }
    
    // update and save the data
    const data = await clinicSessionBookingModel.findById(dbId);
    if(!data) return next(new ErrorHandler("Data not exists.",400));
    
    let flag = false;
    if(data.slot && data.slot.startTime && data.slot.endTime) flag = true;
    
    data.slot = {
        startTime: startTime,
        endTime : endTime
    };
    await data.save();

    // if flag then send the mail for the updation of the slot
    const subject = flag?"Regarding slot-time : Provided" : "Regarding slot-time : Updated";
    const sm = sendMail(data.email, subject, textTemplateSlotTimeForUser(data,flag) );

    const message = flag?"Successfully provided slot-time.":"Successfully updated slot-time";
    res.status(200).json({success:true, message, data});

    await Promise.all([sm]);
   } catch(err){
    console.log(err);
    next(err);
   }
});

//7. markedClinicSessionCompleted-----------------------------------------------------------------
exports.markClinicSessionCompleted = catchAsyncError(async(req,res,next)=>{
    const error = await validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({success:false, error:error});
    }

    // check permission
    const id = req.id;
    const admins = await adminModel.findById(id);
    if(!admins || (admins.role !== 'superAdmin' && admins.role !== 'admin' && admins.role !== 'subAdmin')){
        return next(new ErrorHandler("You have no permission.",400));
    }
});