import Services from "./class.service.js";
import { UserDaoMongoDB } from "../dao/mongodb/user.dao.js";
const userDao = new UserDaoMongoDB();

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
            const response = await userDao.loginUser(email, password);
            if (!response) {
                return false;
            } else {
                return response;
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
