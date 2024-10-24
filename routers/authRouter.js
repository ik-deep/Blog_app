const { loginController, registerController } = require("../controllers/authController");

const express = require("express")
const authRouter = express.Router()

authRouter.post('/register',registerController)

authRouter.post("/login",loginController)

module.exports= {authRouter};