const registerController = (req,res)=>{
    console.log("in registercontroller");
    res.send("registercontroller is working")
}

const loginController=(req,res)=>{
    console.log("login controller");
    res.send("logincontroller is working ");

}

module.exports= {registerController,loginController};