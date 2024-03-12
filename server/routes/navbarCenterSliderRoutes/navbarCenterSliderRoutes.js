const navbarCenterSliderTextRoutes = require('express').Router();

const { makeNavbarCenterSliderText, fetchAllNavbarCenterSliderText, deleteNavbarCenterSliderText, deleteNavbarCenterSingleObjectText } = require("../../controllers/navbarSliderCenterController/navbarSliderCenterController")


navbarCenterSliderTextRoutes.route("/api/v1/makeNavbarCenterSliderText").post(makeNavbarCenterSliderText)
navbarCenterSliderTextRoutes.route("/api/v1/fetchAllNavbarCenterSliderText").get(fetchAllNavbarCenterSliderText)
navbarCenterSliderTextRoutes.route("/api/v1/deleteNavbarCenterSliderText/:dbId").delete(deleteNavbarCenterSliderText)
navbarCenterSliderTextRoutes.route("/api/v1/deleteNavbarCenterSingleObjectText/:objectId/:index").delete(deleteNavbarCenterSingleObjectText)

module.exports = navbarCenterSliderTextRoutes;