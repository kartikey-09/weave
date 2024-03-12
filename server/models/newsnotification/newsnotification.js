const mongoose = require('mongoose');

const newsNotificationSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
});

const NewsNotificationModel = mongoose.model('NewsNotification', newsNotificationSchema);

module.exports = NewsNotificationModel;
