const { followerUser, getFollowingList, getFollowerList, unfollowUser } = require("../models/followModel");
const User = require("../models/userModel");

const followUserController = async(req,res) =>{
    const followingUserId = req.body.followingUserId; // userB
    const followerUserId = req.session.user.userId;   //userA

    try{
       const userDb = await User.findUserByKey({key:followingUserId});
    }catch(error){
        return res.send({
            status:400,
            message:"following user not found",
            error:error
        })
    }

    try{
        const userDb = await User.findUserByKey({key:followerUserId});
     }catch(error){
         return res.send({
             status:400,
             message:"follower user not found",
             error:error
         })
     }

     try{
        const followDb = await followerUser({followerUserId,followingUserId});
        return res.send({
            status:201,
            message:"Follow successfully",
            data:followDb
        })
     }catch(error){
        return res.send({
            status:500,
            message:"Internal server error",
            erorr:error,
        })
     }

}

const followingListController = async(req,res) =>{
     const followerUserId = req.session.user.userId;
     const SKIP = parseInt(req.query.skip) || 0;

     try{
        const followDb = await getFollowingList({followerUserId,SKIP});
        console.log(followDb.length)
        return res.send({
            status:200,
            message:"following list found",
            data:followDb
        })
     }catch(error){
        return res.send({
            status:500,
            message:"Internal Server Error",
            error:error
        })
     }

}

const followerListController = async(req,res) =>{
    const followingUserId = req.session.user.userId;
    const SKIP = parseInt(req.query.skip) || 0;

    try{
       const followDb = await getFollowerList({followingUserId,SKIP});
     
       return res.send({
           status:200,
           message:"follower list found",
           data:followDb
       })
    }catch(error){
       return res.send({
           status:500,
           message:"Internal Server Error",
           error:error
       })
    }
}

const unfollowController = async(req,res) =>{
    const followingUserId = req.body.followingUserId; // userB
    const followerUserId = req.session.user.userId;   //userA

    try{
        const deleteDb = await unfollowUser({followerUserId,followingUserId});

        return res.send({
            status:200,
            message:"unfollow Successfully",
            data:deleteDb
        })
    }catch(error){
        return res.send({
            status:500,
            message:"Internal Server Error",
            error:error
        })
    }
  
}

module.exports = {followUserController,followingListController,followerListController,unfollowController};