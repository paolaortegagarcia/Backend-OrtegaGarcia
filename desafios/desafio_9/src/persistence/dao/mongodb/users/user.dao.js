import { createHash, isValidPass } from "../../../../utils.js";
import MongoDao from "../mongo.dao.js";
import { UserModel } from "./user.model.js";

export default class UserDaoMongoDB extends MongoDao {
    constructor() {
        super(UserModel);
    }

    async findByEmail(email) {
        return await this.model.findOne({ email });
    }

    async registerUser(user) {
        try {
            console.log("Entered registerUser method");
            const { email, password } = user;

            if (
                email === "adminCoder@coder.com" &&
                password === "adminCod3r123"
            ) {
                return await UserModel.create({
                    ...user,
                    role: "admin",
                });
            }

            const userExists = await this.findByEmail(email);

            if (!userExists) {
                try {
                    const newUser = await UserModel.create({
                        ...user,
                        password: createHash(password),
                    });

                    console.log("After UserModel.create");
                    return newUser;
                } catch (error) {
                    console.error("Error during UserModel.create:", error);
                    throw error;
                }
            } else {
                return false;
            }
        } catch (error) {
            console.error("Error in registerUser method:", error);
            throw error;
        }
    }

    async registerUserGithub(user) {
        try {
            const { email, password } = user;
            const userExists = await this.findByEmail(email);

            if (!userExists) {
                const newUser = await UserModel.create({
                    ...user,
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
            console.log("entro en el login dao", email, password);
            //const { email, password } = user;
            const userExists = await this.findByEmail(email);
            console.log(userExists);

            if (!userExists) {
                return false;
            } else {
                const isValidPassword = isValidPass(password, userExists);
                console.log("valid dao: ", isValidPassword);
                if (!isValidPassword) {
                    return false;
                } else {
                    return userExists;
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}
