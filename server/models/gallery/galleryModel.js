const mongoose = require('mongoose');
const schema = mongoose.Schema({
    category: {
        type: String,
        unique: true,
        required: true
    },
    batch: [
        {
            batchName: {
                type: String,
                required: true
            },
            imgUrls: {
                type: [String]
            }
        }
    ]
}, { timestamps: true });
const model = mongoose.model("gallery", schema);
module.exports = model;