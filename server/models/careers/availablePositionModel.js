const mongoose = require('mongoose');
const schema = mongoose.Schema({
    position:{
        type:String,
        require:true
    },
    count:{
        type:String,
        require:true
    },
    salary:{
        type:String,
        require:true
    },
    status:{
        type:String,
        default: "ActivelyHiring"
    },
    link:{
        type:String,
        require:true
    },
    requirementArray:{
        type:Array,
        require:true
    },
    responsibilityArray:{
        type:Array,
        require:true
    }
},{timestamps:true});
const model = mongoose.model("available-positions", schema);
module.exports = model;