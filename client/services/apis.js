// export const BASE_URL = 'http://localhost:9000'
export const BASE_URL = "http://193.203.162.161:6002";
export const Admins = {
  AllAdmins_API: BASE_URL + "/api/v1/viewAllAdminSuperAdmin",
  CreateAdmin_API: BASE_URL + "/api/v1/createNewAdmin",
  UpdateStatus_API: BASE_URL + "/api/v1/changeStatusOfTheAdmin",
  UpdatePassword_API: BASE_URL + "/api/v1/updateProfile",
  DeleteAdmin_API: BASE_URL + "/api/v1/deleteAdmin",
};

export const UserAuthAPI = {
  registerNewUser_API: BASE_URL + "/api/v1/registerNewUser",
  userAccountOTPVerification_API:
    BASE_URL + "/api/v1/userAccountOTPVerification",
  viewAllUsers_API: BASE_URL + "/api/v1/viewAllUsers",
  deleteUnVerifiedUser_API: BASE_URL + "/api/v1/deleteUnVerifiedUser",
  changeUserAccountStatus_API: BASE_URL + "/api/v1/changeUserAccountStatus",

  userLogin_API: BASE_URL + "/api/v1/userLogin",
  userUpdatePassword_API: BASE_URL + "/api/v1/userUpdatePassword",
  userUpdateProfile_API: BASE_URL + "/api/v1/userUpdateProfile",
  userGetMyProfile_API: BASE_URL + "/api/v1/userGetMyProfile",
  userSendOTP_API: BASE_URL + "/api/v1/userSendOTP",
  userVerifyOTP_API: BASE_URL + "/api/v1/userVerifyOTP",
};

export const HandleImagesAPI = {
  UploadImage_API: BASE_URL + "/api/v1/uploadImages",
  CreateGallery_API: BASE_URL + "/api/v1/listNewImgLink",
};

export const Blogs = {
  CreateBlog_API: BASE_URL + "/api/v1/insertNewBlog",
  ViewAllBlogs_API: BASE_URL + "/api/v1/fetchAllBlogs",
  DeleteBlog_API: BASE_URL + "/api/v1/deleteBlog",
  SingleBlog_API: BASE_URL + "/api/v1/viewSingleBlog",
  UpdateBlog_API: BASE_URL + "/api/v1/updateBlog",
};

export const CareerAPI = {
  listNewJob_API: BASE_URL + "/api/v1/listNewJob",
  fetchAllListedJosbs: BASE_URL + "/api/v1/fetchAllListedJosbs",
  updateListedJob: BASE_URL + "/api/v1/updateListedJob",
  deleteJob: BASE_URL + "/api/v1/deleteJob",
};

export const ClinicBookingRequest = {
  CreateClinicRequest_API: BASE_URL + "/api/v1/makeClinicSessionRequest",
  ViewAllClinicRequest_API: BASE_URL + "/api/v1/fetchAllClinicSessionRequests",
  userFetchReqForAllOfTheOwnClinicSessions_API:
    BASE_URL + "/api/v1/userFetchReqForAllOfTheOwnClinicSessions",
  handleClinicSessionSlot: BASE_URL + "/api/v1/handleClinicSessionSlot",
};

export const Testimonial_API = {
  CreateTestimonial_API: BASE_URL + "/api/v1/createTestimonial",
  AllTestimonial_API: BASE_URL + "/api/v1/fetchAllTestimonial",
  DeleteTestimonial_API: BASE_URL + "/api/v1/deleteTestimonial",
};

export const Contact_API = {
  insertNewContact_API: BASE_URL + "/api/v1/insertNewContact",
  AllContact_API: BASE_URL + "/api/v1/findAllContacts",
  DeleteContact_API: BASE_URL + "/api/v1/deleteContact",
  UpdateCotact_API: BASE_URL + "/api/v1/updateContactedStatusOfContacts",
};

export const NavbarSliderText_API = {
  makeNavbarSliderText: BASE_URL + "/api/v1/makeNavbarSliderText",
  fetchAllNavbarSliderText: BASE_URL + "/api/v1/fetchAllNavbarSliderText",
  deleteNavbarSliderText: BASE_URL + "/api/v1/deleteNavbarSliderText",
};

export const NavbarCenterSliderText_API = {
  makeNavbarCenterSliderText: BASE_URL + "/api/v1/makeNavbarCenterSliderText",
  fetchAllNavbarCenterSliderText:
    BASE_URL + "/api/v1/fetchAllNavbarCenterSliderText",
  deleteNavbarCenterSliderText:
    BASE_URL + "/api/v1/deleteNavbarCenterSliderText",
  deleteNavbarCenterSingleObjectText:
    BASE_URL + "/api/v1/deleteNavbarCenterSingleObjectText",
};

export const Gallery_API = {
  GetAllGalleryData_API: BASE_URL + "/api/v1/getAllGalleryData",
  CreateGalleryData_API: BASE_URL + "/api/v1/uploadImgOnGallery",
  UploadImages_API: BASE_URL + "/api/v1/uploadImages",
  GetSingleGalleryData_API: BASE_URL + "/api/v1/getSingleGalleryData",
  GetSingleBatchData_API: BASE_URL + "/api/v1/getSingleBatchData",
  DeleteSingleImageFromBatch: BASE_URL + "/api/v1/deleteSingleImgFromBatch",
  DeleteSingleBatch: BASE_URL + "/api/v1/deleteSingleBatch",
};
export const Phonepayment_API = {
  NewPayment_API: BASE_URL + "/api/v1/paytm",
  Status_API: BASE_URL + "/api/v1/status",
};
