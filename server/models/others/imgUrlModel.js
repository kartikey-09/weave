const mongoose = require('mongoose');

const schema = mongoose.Schema({
    urls:{
        type:[String],
        required:true
    },
    isCurrentlyUsed:{
        type:Boolean,
        default: false
    }
},{timestamps:true});

const model = mongoose.model("ImgUrLModel", schema);

module.exports = model;