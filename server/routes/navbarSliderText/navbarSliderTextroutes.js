const navbarSliderTextRoutes = require('express').Router();

const { makeNavbarSliderText, fetchAllNavbarSliderText, deleteNavbarSliderText } = require("../../controllers/navbarSliderText/navbarSliderTextController")


navbarSliderTextRoutes.route("/api/v1/makeNavbarSliderText").post(makeNavbarSliderText)
navbarSliderTextRoutes.route("/api/v1/fetchAllNavbarSliderText").get(fetchAllNavbarSliderText)
navbarSliderTextRoutes.route("/api/v1/deleteNavbarSliderText/:dbId").delete(deleteNavbarSliderText)

module.exports = navbarSliderTextRoutes;