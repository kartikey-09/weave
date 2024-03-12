const mongoose = require('mongoose');

const schema = mongoose.Schema({
    imgUrlModelDBId:{ 
        //contain the ObjectId of the ImgUrlModel document
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "ImgUrLModel" 
    },
    title:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true,
        default: Date.now()
    },
    shortDescription:{
        type:String,
        required: true
    },
    briefDescription:{
        type:String,
        required:true
    } 
},{timestamps:true});

const model = mongoose.model("blogs", schema);

module.exports = model;