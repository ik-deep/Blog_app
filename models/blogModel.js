const { LIMIT } = require("../privateConstant");
const blogSchema = require("../schemas/blogSchema")

const createBlog = ({ title, textBody, userId }) => {
    return new Promise(async (resolve, reject) => {
        const blogObj = new blogSchema({
            title: title,
            textBody: textBody,
            userId: userId,
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
                    $match: { userId: userId }
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

            const blogDb  = await blogSchema.find({_id:blogId});
            if(!blogDb) reject("Blog not found witg blogId: "+ blogId);

            resolve(blogDb);
        } catch (error) {
            reject(error)
        }
    })

}

const editBlog = ({title,textBody, blogId})=>{
    return new Promise(async(resolve,reject)=>{
        try{
        const blogDb = blogSchema.findOneAndUpdate({_id:blogId},{title:title,textBody:textBody});
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
           const deleteBlog =  await blogSchema.deleteOne({ _id: blogId });
           resolve(deleteBlog);
        }catch(error){
            reject(error);
        }
    })
}


module.exports = { createBlog, getAllBlogs, getMyBlogs, getBlogWithId ,editBlog,deleteBlogById};