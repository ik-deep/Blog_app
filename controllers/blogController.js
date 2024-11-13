const { createBlog, getAllBlogs, getMyBlogs, getBlogWithId, editBlog, deleteBlogById } = require("../models/blogModel");
const {blogDataValidater} = require("../utils/blogUtils")

const createBlogController = async(req,res) =>{
    const {title, textBody} = req.body;
    const userId = req.session.user.userId;

    //data validation
    try{
        await blogDataValidater({title, textBody});
    }catch(error){
        return res.send({
            status:400,
            message:"Invalid blog data!",
            error:error
        })
    }
        try{
            const blogDb = await createBlog({title,textBody,userId});
            return res.send({
                status:201,
                message:"blog is created successfully!",
                data:blogDb,
            })
        }catch(error){
            return res.send({
                status:500,
                message:"Internal server error!",
                error:error
            })
        }
}
const getBlogsController = async(req,res)=>{
      const SKIP = parseInt(req.query.skip) || 0;

      try{
        const blogsDb =await getAllBlogs({SKIP});

        return res.send({
            status:200,
            message:"Read succcess",
            data:blogsDb
        });
      }catch(error){
        return res.send({
            status:500,
            message:"Internal server error",
            error:error,
        })
      }
}

const getMyBlogsController = async(req,res)=>{
    const userId = req.session.user.userId;
    const SKIP = parseInt(req.query.skip) || 0;

    try{
        const blogsDb =await getMyBlogs({userId,SKIP});

        return res.send({
            status:200,
            message:"Read succcess",
            data:blogsDb
        });
      }catch(error){
        return res.send({
            status:500,
            message:"Internal server error",
            error:error,
        })
      }

}

const editBlogController = async(req,res)=>{
       const {title,textBody, blogId} = req.body;
       const userId = req.session.user.userId;

       //find the blog
       //ownership check
       //update the info
       //data validation
    try{
        await blogDataValidater({title, textBody});
    }catch(error){
        return res.send({
            status:400,
            message:"Invalid blog data!",
            error:error
        })
    }
       
    try{
        const blogDb =await getBlogWithId({blogId});
      
       if(!userId.equals(blogDb[0].userId)){
        return res.send({
            status:403,
            message:"not allowed to edit blog",
        });
       }

       const blogPrevDb = await editBlog({title,textBody,blogId});

       return res.send({
        status:200,
        message:"blog updated successfully",
        data:blogPrevDb
       })
      }catch(error){
        return res.send({
            status:500,
            message:"Internal server error",
            error:error,
        })
      }
}

const deletBlogController =async (req,res) =>{
    const {blogId} = req.body;
    const userId = req.session.user.userId;
         
    try{
        const blogDb =await getBlogWithId({blogId})
       if(!userId.equals(blogDb[0].userId)){
        return res.send({
            status:403,
            message:"not allowed to delete blog",
        });
       }
       const deleteBlog =await deleteBlogById({blogId});
       return res.send({
        status:200,
        message:"blog deleted successfully",
        data:deleteBlog
       })
      }catch(error){
        return res.send({
            status:500,
            message:"Internal server error",
            error:error,
        })
      }
}

module.exports = {createBlogController,getBlogsController,getMyBlogsController,editBlogController,deletBlogController};