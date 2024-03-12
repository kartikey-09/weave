const mongoose = require('mongoose');
const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    isContacted:{
        type: Boolean,
        default: false
    }
}, { timestamps: true }); 
const model = mongoose.model("contact", schema);
module.exports = model;
