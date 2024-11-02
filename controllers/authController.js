const { userDataValidation } = require("../utils/authUtils");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const registerController = async (req, res) => {
  console.log(req.body);
  const { name, email, username, password } = req.body;

  //data validation
  try {
    await userDataValidation({ name, email, username, password });
  } catch (error) {
    return res.status(400).json(error);
  }

  //store user data
  const obj = new User({ name, email, username, password });
  try {
    const userDb = await obj.registerUser();
    return res.send({
      status: 201,
      message: "User registered successfully!",
      data: userDb,
    })
  } catch (error) {
    return res.send({
      status: 500,
      message: "Internal server error!",
      error: error,
    })
  }

}

const loginController = async (req, res) => {
  const { loginId, password } = req.body;
  if (!loginId || !password) {
    return res.send({
      status: 400,
      message: "Missing user credentials!",
    })
  }

  try {
    const userDB = await User.findByLoginId({ loginId });
    //checking user validate
    const isMatch = await bcrypt.compare(password, userDB.password);
    if (!isMatch) {
      return res.send({
        status: 400,
        message: "Incorrect password!",
      })
    }


    req.session.isAuth = true;
    req.session.user = {
      username: userDB.username,
      email: userDB.email,
      userId: userDB._id,
    }

    return res.send({
      status: 201,
      message: "User login successfully!!",
    })
  } catch (error) {
    return res.send({
      status: 500,
      message: "Internal server error!",
      error: error,
    })
  }

}
const logoutController = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send({
        status: 500,
        message: "Unable to logout",
      })
    }

    return res.send({
      status: 200,
      message: "logout successfull",
    })

  })
}

const logoutAllDevicesController = async (req, res) => {
  const userId = req.session.user.userId;
  //create schema
  const sessionSchema = new Schema({ _id: String }, { strict: false });
  //convert innto a model
  const sessionModel = mongoose.model("session", sessionSchema);
  //mongoose query to delete the entry
  try {
    const deleteDB = await sessionModel.deleteMany({
      "session.user.userId": userId,
    });
    return res.send({
      status: 200,
      message: "Logout from all the devices is successfully!"
    })
  } catch (error) {
    return res.send({
      status: 500,
      message: "Internal server error!",
      error: error,
    })
  }
}


module.exports = { registerController, loginController, logoutController, logoutAllDevicesController };