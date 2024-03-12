const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    // -----------------------------------------------Basic Details-----------------------------------------------------
    name: {
        type: String,
    },
    imgUrl: {
        type: String
    },
    description: {
        type: String,
    },
    rating: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    },
    link: {
        type: String, 
    }
})

const TestimonialModel = mongoose.model("testimonial", Schema);
module.exports = TestimonialModel;