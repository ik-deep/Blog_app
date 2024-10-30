const express= require("express");
const clc = require("cli-color");
require('dotenv').config();

//file-import
const db = require("./db");
const { authRouter } = require("./routers/authRouter");

//constants
const app = express();
const PORT = process.env.PORT;

//middlewares
app.use(express.json())
app.use("/auth",authRouter)
app.use(express.json());


app.get('/',(req,res)=>{
   return res.send(`server is up and running on port:${8080}`);
})


app.listen(PORT,()=>{
    console.log(clc.yellowBright.underline.bold(`server is runing on port:${PORT}`))
}) 