import Services from "./class.service.js";
import { generateToken } from "../jwt/auth.js";
import persistence from "../persistence/persistence.js";
const { userDao } = persistence;

export default class UserService extends Services {
    constructor() {
        super(userDao);
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

    async login(email, password) {
        try {
            console.log("desde service: ", email, password);
            const userExist = await userDao.loginUser(email, password);
            if (!userExist) {
                return false;
            }
            const access_token = generateToken(userExist);
            return { user: userExist, access_token };
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
            throw error;
        }
    }
}
