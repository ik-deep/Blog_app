const express = require("express");
const { isAuth } = require("../middlewares/isAuthMiddleware");
const { createBlogController } = require("../controllers/blogController");
const blogRouter = express.Router()
 
blogRouter.post("/create-blog",createBlogController);

module.exports = blogRouter;