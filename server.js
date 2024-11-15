const express= require("express");
const clc = require("cli-color");
const session = require("express-session");
const mongodbSession = require("connect-mongodb-session")(session);
require('dotenv').config();

//file-import
const db = require("./db");
const { authRouter } = require("./routers/authRouter");
const blogRouter = require("./routers/blogRouter");
const { isAuth } = require("./middlewares/isAuthMiddleware");
const followRouter = require("./routers/followRouter");
const cleanUpBin = require("./cron");

//constants
const app = express();
const PORT = process.env.PORT;
const store = new mongodbSession({
    uri:process.env.MONGO_URI,
    collection:"sessions",
})

//middlewares
app.use(express.json())
app.use(session({
    secret:process.env.SECRET_KEY,
    store:store,
    resave:false,
    saveUninitialized:false
}))
app.use(express.json());

app.use("/auth",authRouter)
app.use("/blog",isAuth,blogRouter)
app.use("/follow",followRouter)


app.get('/',(req,res)=>{
   return res.send(`server is up and running on port:${PORT}`);
})


app.listen(PORT,()=>{
    console.log(clc.yellowBright.underline.bold(`server is runing on port:${PORT}`));
    cleanUpBin();
}) 