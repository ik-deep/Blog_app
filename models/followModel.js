const { LIMIT } = require("../privateConstant");
const followSchema = require("../schemas/followSchema");
const userSchema = require("../schemas/userSchema");

const followerUser = ({ followerUserId, followingUserId }) => {
    return new Promise(async (resolve, reject) => {
        const followObj = new followSchema({
            followerUserId,
            followingUserId
        })
        try {
            const followDb = await followObj.save();
            resolve(followDb)
        } catch (error) {
            reject(error);
        }
    })
}


const getFollowingList = ({ followerUserId, SKIP }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const followDb = await followSchema.aggregate([
                {
                    $match: { followerUserId: followerUserId }
                },
                {
                    $sort: { creationDateTime: -1 }, //-1 DESC. 1ASCD
                },
                {
                    $skip: SKIP,
                },
                {
                    $limit: LIMIT,
                }
            ])
          
            const followingListArray = followDb.map(item => item.followingUserId);
            const followingListDb =await userSchema.find({_id: {$in :followingListArray }})
           
            resolve(followingListDb.reverse())
        } catch (error) {
            reject(error);
        }
    })
}
const getFollowerList =  ({ followingUserId, SKIP }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const followDb = await followSchema.aggregate([
                {
                    $match: { followingUserId: followingUserId }
                },
                {
                    $sort: { creationDateTime: -1 }, //-1 DESC. 1ASCD
                },
                {
                    $skip: SKIP,
                },
                {
                    $limit: LIMIT,
                }
            ])
          
            const followerListArray = followDb.map(item => item.followerUserId);
            const followerListDb =await userSchema.find({_id: {$in :followerListArray }})
           
            resolve(followerListDb.reverse())
        } catch (error) {
            reject(error);
        }
    })
}

const unfollowUser = ({followerUserId,followingUserId})=>{
    return new Promise(async(resolve,reject)=>{
          try{
            const deleteDb =await followSchema.findOneAndDelete({followerUserId,followingUserId})
            resolve(deleteDb)
          }catch(error){
            reject(error);
          }
    })
}


module.exports = { followerUser, getFollowingList,getFollowerList,unfollowUser };