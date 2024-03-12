const availablePositionRoutes = require('express').Router();
const {fetchUser} = require('../../middleware/fetchUser');
const {
    listNewJob,
    fetchAllListedJosbs,
    updateListedJob,
    deleteJob
} = require('../../controllers/careers/availablePostionController');

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

availablePositionRoutes.route("/api/v1/listNewJob").post(fetchUser,listNewJob);
availablePositionRoutes.route("/api/v1/fetchAllListedJosbs").get(fetchAllListedJosbs);
availablePositionRoutes.route("/api/v1/updateListedJob/:dbId").put(fetchUser,updateListedJob);
availablePositionRoutes.route("/api/v1/deleteJob/:dbId").delete(fetchUser,deleteJob);

module.exports = availablePositionRoutes;