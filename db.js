const mongoose = require("mongoose");
const clc = require("cli-color")

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log(clc.blueBright("mongodb connected successfully"));
})
.catch((error) => {
    console.log(clc.red(error));
})