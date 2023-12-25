import { UserDaoMongoDB } from "../dao/mongodb/user.dao.js";

const userDao = new UserDaoMongoDB();

export const register = async (user) => {
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
};

export const login = async (email, password) => {
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
};

export const getById = async (id) => {
    try {
        const response = await userDao.getById(id);
        return response;
    } catch (error) {
        console.log(error);
    }
};
