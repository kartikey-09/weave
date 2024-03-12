const mongoose = require('mongoose');
const schema = mongoose.Schema({
    imgUrlModelDBId:{ //contain the ObjectId of the ImgUrlModel document
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "ImgUrLModel" 
    },
    category:{
        type:String,
        enum:["slider", "gallery"],
        required:true
    }
},{timestamps:true});
const model = mongoose.model("other-img-links", schema);
module.exports = model;