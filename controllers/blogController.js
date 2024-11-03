const { createBlog } = require("../models/blogModel");
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

module.exports = {createBlogController};