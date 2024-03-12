const contactRoutes = require('express').Router();
const {fetchUser} = require('../../middleware/fetchUser');

const {
    insertNewContact,
    findAllContacts,
    updateContactedStatusOfContacts,
    deleteContact,
} = require('../../controllers/contact/contactController');

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

contactRoutes.route("/api/v1/insertNewContact").post(insertNewContact);
contactRoutes.route("/api/v1/findAllContacts").get(fetchUser, findAllContacts);
contactRoutes.route("/api/v1/updateContactedStatusOfContacts/:dbId").put(fetchUser,updateContactedStatusOfContacts);
contactRoutes.route("/api/v1/deleteContact/:dbId").delete(fetchUser,deleteContact);


module.exports = contactRoutes;