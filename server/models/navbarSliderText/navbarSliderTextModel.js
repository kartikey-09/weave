const mongoose = require('mongoose');

const navbarSliderTextSchema = mongoose.Schema({
    textPosition: {
        type: String,
        required: true
    },
    displayText: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }

})


const NavBarSliderTextModel = mongoose.model('NavBarSliderTextModel', navbarSliderTextSchema)
module.exports = NavBarSliderTextModel;