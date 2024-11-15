const { LIMIT } = require("../privateConstant");
const blogSchema = require("../schemas/blogSchema");
const likeSchema = require("../schemas/likeSchema");

const createBlog = ({ title, textBody, userId }) => {
    return new Promise(async (resolve, reject) => {
        const blogObj = new blogSchema({
            title: title,
            textBody: textBody,
            userId: userId,
            likesCount:0,
            likedBy:[],
            creationDateTime: Date.now()
        })
        try {
            const blogDb = await blogObj.save();
            resolve(blogDb);
        } catch (error) {
            reject(error);
        }
    })

}

const getAllBlogs = ({ SKIP }) => {
    return new Promise(async (resolve, reject) => {

        //aggregate ->sort, pagination(skip,limit)
        try {
            const blogDb = await blogSchema.aggregate([
                {
                    $match: {
                        isDeleted: {$ne:true}
                    }
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
            resolve(blogDb);
        } catch (error) {
            reject(error)
        }
    })
}

const getMyBlogs = ({ userId, SKIP }) => {
    return new Promise(async (resolve, reject) => {
        //pagination(skip,limit)
        try {
            const blogDb = await blogSchema.aggregate([
                {
                    $match: { userId: userId, isDeleted: {$ne:true} }
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
            resolve(blogDb);
        } catch (error) {
            reject(error)
        }
    })

}

const getBlogWithId = ({ blogId }) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!blogId) reject("missing blogId");

            const blogDb  = await blogSchema.find({_id:blogId, isDeleted: {$ne:true} });
            if(blogDb.length==0) reject("Blog not found with blogId: "+ blogId);

            resolve(blogDb);
        } catch (error) {
            reject(error)
        }
    })

}

const editBlog = ({title,textBody, blogId})=>{
    return new Promise(async(resolve,reject)=>{
        try{
        const blogDb =await blogSchema.findOneAndUpdate({_id:blogId},{title:title,textBody:textBody});
         resolve(blogDb)
        }catch(error){
          reject(error)
        }
    })
   
}

const deleteBlogById = ({blogId})=>{
    return new Promise(async(resolve,reject)=>{
        try{
            if(!blogId) reject("missing blogId");
        //    const deleteBlog =  await blogSchema.deleteOne({ _id: blogId });
        const deleteBlog =  await blogSchema.findOneAndUpdate({ _id: blogId },{isDeleted:true, deletionDateTime:Date.now()});
        resolve(deleteBlog);
        }catch(error){
            reject(error);
        }
    })
}

const likeBlog = ({blogId,userId,action})=>{
    return new Promise(async(resolve,reject)=>{
        const likeObj = new likeSchema({
              userId,
              blogId,
              action,
              creationDateTime:  Date.now()
        })
        try{
          const likeDb = await likeObj.save();
          resolve(likeDb);
        }catch(error){
            reject(error);
        }
    })
}

const unlikeBlog = ({blogId, userId})=>{
   return new Promise(async(resolve,reject)=>{
        try{
            const deleteUnlikeDb =await likeSchema.findOneAndDelete({blogId:blogId, userId:userId});
            resolve(deleteUnlikeDb);
        }catch(error){
            reject(error);
        }
    
    })
}

const updateBlogLikeField = ({blogId,userId,action}) =>{
    return new Promise(async (resolve, reject) => {
        try {
           if( action=="like"){
            const blogDb = await blogSchema.findByIdAndUpdate({ _id: blogId },{$inc: { likesCount: 1 },$addToSet: { likedBy: userId }})
           }else if(action == "unlike"){
            const blogDb = await blogSchema.findByIdAndUpdate({ _id: blogId },{$inc: { likesCount: -1 },$pull: { likedBy: { $in: [userId] }}})
           }
            resolve()
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = { createBlog, getAllBlogs, getMyBlogs, getBlogWithId ,editBlog,deleteBlogById,likeBlog,unlikeBlog, updateBlogLikeField};