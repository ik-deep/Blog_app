const { loginController, registerController, logoutController, logoutAllDevicesController } = require("../controllers/authController");

const express = require("express");
const { isAuth } = require("../middlewares/isAuthMiddleware");
const authRouter = express.Router()

authRouter
        .post('/register',registerController)
        .post("/login",loginController)
        .post("/logout",isAuth,  logoutController)
        .post("/logout_all_devices",isAuth, logoutAllDevicesController);

module.exports= {authRouter};