// Routes: workforceRoutes.js
const workforceRoutes = require("express").Router();
const {
  createWorkforce,
  fetchAllWorkforce,
  updateWorkforce,
  deleteWorkforce,
} = require("../../controllers/workforce/workforce");

workforceRoutes.route("/api/v1/createWorkforce").post(createWorkforce);
workforceRoutes.route("/api/v1/fetchAllWorkforce").get(fetchAllWorkforce);
workforceRoutes.route("/api/v1/updateWorkforce/:dbId").put(updateWorkforce);
workforceRoutes.route("/api/v1/deleteWorkforce/:dbId").delete(deleteWorkforce);

module.exports = workforceRoutes;
