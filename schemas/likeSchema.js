const mongoose = require("mongoose");
const Schema = mongoose.Schema

const likeSchema =new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
    },
   blogId:{
        type:Schema.Types.ObjectId,
        required:true,
    },
    action: String,
    creationDateTime :{
        type:Date,
        required:true,
        default: Date.now()
    }
})

module.exports = mongoose.model("like",likeSchema);