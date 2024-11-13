const express = require("express");
const { createBlogController, getBlogsController, getMyBlogsController, editBlogController, deletBlogController } = require("../controllers/blogController");
const blogRouter = express.Router()
 
blogRouter
        .post("/create-blog",createBlogController)
        .get("/get-blogs",getBlogsController)
        .get("/get-myBlogs",getMyBlogsController)
        .get("/edit-blog",editBlogController)
        .post("/delete-blog",deletBlogController)

module.exports = blogRouter;