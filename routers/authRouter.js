const { loginController, registerController, logutController } = require("../controllers/authController");

const express = require("express")
const authRouter = express.Router()

authRouter
        .post('/register',registerController)
        .post("/login",loginController)

module.exports= {authRouter};