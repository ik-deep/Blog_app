const mongoose = require("mongoose");
// const { type } = require("os");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        unique:true,
        select:false,
    }
})