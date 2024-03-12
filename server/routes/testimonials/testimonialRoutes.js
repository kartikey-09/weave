const testimonialRoutes = require('express').Router();
const { createTestimonial, fetchAllTestimonial, deleteTestimonial } = require("../../controllers/testimonial/testimonialController")

testimonialRoutes.route('/api/v1/createTestimonial').post(createTestimonial)
testimonialRoutes.route('/api/v1/fetchAllTestimonial').get(fetchAllTestimonial)
testimonialRoutes.route('/api/v1/deleteTestimonial/:dbId').delete(deleteTestimonial)


module.exports = testimonialRoutes;