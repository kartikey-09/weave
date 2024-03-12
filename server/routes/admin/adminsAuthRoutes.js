const adminsAuthRoutes = require('express').Router();
const {fetchUser} = require('../../middleware/fetchUser');

const {
    signup,
    createNewAdmin,
    login,
    viewAllAdminSuperAdmin,
    deleteAdmin,
    changeStatusOfTheAdmin,
    sendOTP,
    verifyOTP,
    updatePassword,
    updateProfile
} = require('../../controllers/admin/adminsAuthController');

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

adminsAuthRoutes.route("/api/v1/signup.WeAvecU.fdhiufgfburie.feugrhi").post(signup);
adminsAuthRoutes.route("/api/v1/createNewAdmin").post(fetchUser,createNewAdmin);
adminsAuthRoutes.route("/api/v1/adminsLogin").post(login);
adminsAuthRoutes.route("/api/v1/viewAllAdminSuperAdmin").get(fetchUser,viewAllAdminSuperAdmin);
adminsAuthRoutes.route("/api/v1/deleteAdmin/:dbId").delete(fetchUser,deleteAdmin);
adminsAuthRoutes.route("/api/v1/changeStatusOfTheAdmin/:dbId").put(fetchUser,changeStatusOfTheAdmin);
adminsAuthRoutes.route("/api/v1/sendOTP").get(sendOTP);
adminsAuthRoutes.route("/api/v1/verifyOTP").post(verifyOTP);
adminsAuthRoutes.route("/api/v1/updatePassword/:email").put(updatePassword);
adminsAuthRoutes.route("/api/v1/updateProfile/:email").put(fetchUser, updateProfile);

module.exports = adminsAuthRoutes;