const express = require("express");
const { followUserController, followingListController,followerListController ,unfollowController} = require("../controllers/followController");
const followRouter = express.Router();

followRouter
    .post("/follow-user",followUserController)
    .get("/following-list", followingListController)
    .get("/follower-list",followerListController)
    .post("/unfollow-user",unfollowController)

    

module.exports = followRouter;