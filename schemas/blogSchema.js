const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minLength:3,
        maxLength:100
    },
    textBody:{
        type:String,
        required:true,
        // unique:true,
        trim:true,
        minLength:3,
        maxLength:1000
    },
    creationDateTime:{
        type:String,
        required:true,
    },
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"user",//forign key to user collections

    },
    likesCount: Number, // number of likes
    likedBy:{
        type:Array,
        default:[],
        ref:"user"
    },
    imagePath:{
        type:String,
    },
    isDeleted:{
        type:Boolean,
        default:false,
    },
    deletionDateTime:{
        type:String
    }
});

module.exports = mongoose.model("blog",blogSchema);