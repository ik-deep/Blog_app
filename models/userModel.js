const userSchema = require("../schemas/userSchema");
const bcrypt = require("bcrypt");

const User = class {
    // name;
    // email;
    // username;
    // password;

    constructor({ name, email, username, password }) {
        this.name = name;
        this.email = email;
        this.username = username;
        this.password = password;
    }

    registerUser() {
        return new Promise(async (resolve, reject) => {
            try {
                //checking for username or email existing  
                const usernameOrEmailExist = await userSchema.findOne({ $or: [{ email: this.email }, { username: this.username }] });
                if (usernameOrEmailExist && usernameOrEmailExist.email == this.email)
                    reject("Email already exist!");
                if (usernameOrEmailExist && usernameOrEmailExist.username == this.username)
                    reject("Username already exist!");

                // hashed the password
                const hashedPassword = await bcrypt.hash(
                    this.password,
                    parseInt(process.env.SALT)
                );
                const userObj = await userSchema({
                    name: this.name,
                    email: this.email,
                    username: this.username,
                    password: hashedPassword
                })
                const userDB = await userObj.save();
                console.log(userDB);
                resolve(userDB);
            } catch (error) {
                reject(error);
            }

        })
    }

   static findByLoginId({loginId}) {
        return new Promise(async (resolve, reject) => {
            try {
                const userDB = await userSchema.findOne({ $or: [{ email: loginId }, { username: loginId }] }).select("+password");
                if(!userDB) reject("user not found!");
                resolve(userDB);
            } catch (error) {
                reject(error);
            }
        })

    }
}

// const obj = new User({ name: String, email, username, password })

module.exports = User;