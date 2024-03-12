const clinicRoutes = require('express').Router();
const { fetchUser } = require('../../middleware/fetchUser');
const {
    makeClinicSessionRequest,
    editClinicSessionReq,
    userFetchReqForAllOfTheOwnClinicSessions,
    fetchAllClinicSessionRequests,
    deleteClinicSessionRequest,
    handleClinicSessionSlot,
    markClinicSessionCompleted
} = require('../../controllers/clinic/clinicController');

/*
1. makeClinicSessionRequest : done by users : headers :- token : body :- name, age, whatsappNo, email, mode, description
2. editClinicSessionReq : done by users : Edit clinic session requests can only be done by users until the slot is provided.
3. userFetchReqForAllOfTheOwnClinicSessions : done by users : user can fetch all of its clinic sessions : headers :- token : query :- pageNo, pageSize, dateDescSort(Boolean, for sorting on the basis of creation date)
4. fetchAllClinicSessionRequests : done by admins : headers :- token : query :- pageNo, pageSize, dateDescSort(Boolean, for sorting), isSlotProvided(boolean, for filter), isPaymentDone(boolean, for filter)
5. deleteClinicSessionRequest : done by admins : if payment is not completed then request can be deleted by admins
6. handleClinicSessionSlot : done by admins : give and update clinic session slot : headers :- token : params :- dbId(Object Id) : body :- startTime(DateTime), endTime(DateTime)
7. markClinicSessionCompleted : done by admins : mark/unmark isSessionComplted field
*/

clinicRoutes.route("/api/v1/makeClinicSessionRequest").post(fetchUser, makeClinicSessionRequest); //done
clinicRoutes.route("/api/v1/editClinicSessionReq").put(editClinicSessionReq);
clinicRoutes.route("/api/v1/userFetchReqForAllOfTheOwnClinicSessions").get(fetchUser, userFetchReqForAllOfTheOwnClinicSessions); //done
clinicRoutes.route("/api/v1/fetchAllClinicSessionRequests").get(fetchUser, fetchAllClinicSessionRequests); //done
clinicRoutes.route("/api/v1/deleteClinicSessionRequest").delete(fetchUser, deleteClinicSessionRequest);
clinicRoutes.route("/api/v1/handleClinicSessionSlot/:dbId").put(fetchUser, handleClinicSessionSlot); //done
clinicRoutes.route("/api/v1/markClinicSessionCompleted").put(fetchUser, markClinicSessionCompleted);

module.exports = clinicRoutes;
