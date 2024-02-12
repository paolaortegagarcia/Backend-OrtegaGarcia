import { createHash, isValidPass } from "../../../../utils/utils.js";
import { logger } from "../../../../utils/logger.js";
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
            logger.info("Entered registerUser method");
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

                    logger.info("After UserModel.create");
                    return newUser;
                } catch (error) {
                    logger.error("Error en userExists", error);
                    throw error;
                }
            } else {
                return false;
            }
        } catch (error) {
            userExists;
            throw error;
        }
    }

    async registerUserGithub(user) {
        try {
            const { email } = user;
            const userExists = await this.findByEmail(email);

            if (!userExists) {
                const newUser = await UserModel.create({
                    ...user,
                    isGithub: true,
                });
                return newUser;
            } else {
                return false;
            }
        } catch (error) {
            logger.error("Error en registerUserGithub", error);
            throw error;
        }
    }

    async loginUser(email, password) {
        try {
            logger.info("entro en el login dao", email, password);
            //const { email, password } = user;
            const userExists = await this.findByEmail(email);
            logger.info(userExists);

            if (!userExists) {
                return false;
            } else {
                const isValidPassword = isValidPass(password, userExists);
                logger.info("valid dao: ", isValidPassword);
                if (!isValidPassword) {
                    return false;
                } else {
                    return userExists;
                }
            }
        } catch (error) {
            logger.error("Error en loginUser", error);
        }
    }
}
