//import { createHash, isValidPass } from "../../utils.js";
import { UserModel } from "./models/user.model.js";

export class UserDaoMongoDB {
    async findByEmail(email) {
        return await UserModel.findOne({ email });
    }

    async registerUser(user) {
        try {
            const { email, password } = user;

            if (
                email === "adminCoder@coder.com" &&
                password === "adminCod3r123"
            ) {
                return await UserModel.create({
                    ...user,
                    //password: createHash(password),
                    password,
                    role: "admin",
                });
            }

            const userExists = await this.findByEmail(email);

            if (!userExists) {
                const newUser = await UserModel.create({
                    ...user,
                    //password: createHash(password),
                    password,
                });
                return newUser;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async loginUser(email, password) {
        try {
            const userRegistered = await UserModel.findOne({
                email,
            });
            if (!userRegistered) {
                return false;
            } else {
                return userExist;
                /*                const isValidPassword = isValidPass(password, userRegistered);
                console.log("valid dao: ", isValidPassword);
                if (!isValidPassword) {
                    return false;
                } else {
                    return userRegistered;
                } */
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            const userExist = await UserModel.findById(id);
            if (userExist) {
                return userExist;
            }
            return false;
        } catch (error) {
            console.log(error);
        }
    }
}
