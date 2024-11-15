const mongoose = require("mongoose");
const Schema = mongoose.Schema

const followSchema =new Schema({
    //userA--->userB
    followerUserId:{
        type:Schema.Types.ObjectId,
        require:true,
        ref:"user"
    },
    followingUserId:{
        type:Schema.Types.ObjectId,
        require:true,
        ref:"user"
    },
    creationDateTime :{
        type:Date,
        required:true,
        default: Date.now()
    }
})

module.exports = mongoose.model("folow",followSchema);