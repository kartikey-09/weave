const mongoose = require('mongoose');

const navbarCenterSliderSchema = mongoose.Schema({
    textNLink: [
        {
            displayText: String,
            link: String
        }
    ]

})


const navbarCenterSliderModel = mongoose.model('navbarCenterSliderModel', navbarCenterSliderSchema)
module.exports = navbarCenterSliderModel;