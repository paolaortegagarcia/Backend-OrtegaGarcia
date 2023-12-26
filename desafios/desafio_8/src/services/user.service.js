import Services from "./class.service.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import UserDaoMongoDB from "../dao/mongodb/users/user.dao.js";
const userDao = new UserDaoMongoDB();

const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT;
export default class UserService extends Services {
    constructor() {
        super(userDao);
    }

    // numeral para hacerlo privado
    #generateToken(user) {
        const payload = {
            userId: user._id,
        };
        return jwt.sign(payload, SECRET_KEY_JWT, { expiresIn: "10m" });
    }

    async register(user) {
        try {
            const response = await userDao.registerUser(user);
            if (!response) {
                return false;
            } else {
                return response;
            }
        } catch (error) {
            console.error("Error in register service:", error);
            throw error;
        }
    }

    async login(user) {
        try {
            console.log("desde service: ", email, password);
            const userExist = await userDao.loginUser(user);
            if (!userExist) {
                return false;
            } else {
                return this.#generateToken(userExist);
            }
        } catch (error) {
            console.error("Error in login service:", error);
            throw error;
        }
    }

    async getById(id) {
        try {
            const response = await userDao.getById(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}
