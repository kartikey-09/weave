const userAuthRoutes = require('express').Router();

const {fetchUser} = require('../../middleware/fetchUser');
const {
    registerNewUser,
    userAccountOTPVerification,
    viewAllUsers,
    deleteUnVerifiedUser,
    changeUserAccountStatus,
    
    userLogin,
    userSendOTP,
    userVerifyOTP,
    userUpdatePassword,
    userUpdateProfile,
    userGetMyProfile
} = require('../../controllers/user/userAuthController');

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

userAuthRoutes.route("/api/v1/registerNewUser").post(registerNewUser);
userAuthRoutes.route("/api/v1/userAccountOTPVerification").post(userAccountOTPVerification);
userAuthRoutes.route("/api/v1/viewAllUsers").get(fetchUser, viewAllUsers);
userAuthRoutes.route("/api/v1/deleteUnVerifiedUser/:dbId").delete(fetchUser, deleteUnVerifiedUser);
userAuthRoutes.route("/api/v1/changeUserAccountStatus/:dbId").put(fetchUser, changeUserAccountStatus);

userAuthRoutes.route("/api/v1/userLogin").post(userLogin);
userAuthRoutes.route("/api/v1/userSendOTP").get(userSendOTP);
userAuthRoutes.route("/api/v1/userVerifyOTP").post(userVerifyOTP);
userAuthRoutes.route("/api/v1/userUpdatePassword/:email").put(userUpdatePassword);
userAuthRoutes.route("/api/v1/userUpdateProfile/:email").put(fetchUser, userUpdateProfile);
userAuthRoutes.route("/api/v1/userGetMyProfile").get(fetchUser, userGetMyProfile);

module.exports = userAuthRoutes;