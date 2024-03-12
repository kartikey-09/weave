const express = require('express');
const router = express.Router();
const {
    createNewsNotification,
    fetchAllNewsNotifications,
    deleteNewsNotification
} = require("../../controllers/newsnotification/newsnotification");

router.route('/api/v1/createNewsNotification').post(createNewsNotification);
router.route('/api/v1/fetchAllNewsNotifications').get(fetchAllNewsNotifications);
router.route('/api/v1/deleteNewsNotification/:dbId').delete(deleteNewsNotification);

module.exports = router;
