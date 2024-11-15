const userSchema = require("../schemas/userSchema");
const bcrypt = require("bcrypt");
const {ObjectId} = require("mongodb");

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

   static findUserByKey({key}) {
        return new Promise(async (resolve, reject) => {
            try {
                if(!key) reject("key is missing")
                const userDB = await userSchema.findOne({ $or: ObjectId.isValid(key)? [{_id:key}] : [{ email: key }, { username: key }] }).select("+password");
                if(!userDB) reject("user not found!");
                resolve(userDB);
            } catch (error) {
                reject(error);
            }
        })

    }
}


module.exports = User;