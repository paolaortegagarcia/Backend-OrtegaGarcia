import Services from "../class.service.js";
import { logger } from "../../utils/logger/logger.js";
import { generateToken } from "../../jwt/auth.js";
import factory from "../../persistence/factory.js";
const { userDao } = factory;
import UserRepository from "../../persistence/repository/users/user.repository.js";
import { sendMail } from "./email.service.js";
const userRepository = new UserRepository();

export default class UserService extends Services {
    constructor() {
        super(userDao);
    }

    async findByEmail(email) {
        try {
            const response = await userDao.findByEmail(email);
            if (!response) {
                return false;
            } else {
                return response;
            }
        } catch (error) {
            logger.error(
                `desde user.service.js - Error en findByEmail = ${error}`
            );
            throw error;
        }
    }

    async register(user) {
        try {
            const response = await userDao.registerUser(user);
            if (!response) {
                return false;
            } else {
                //await sendMail(user, "register");
                return response;
            }
        } catch (error) {
            logger.error(
                `desde user.service.js - Error en register = ${error}`
            );
            throw error;
        }
    }

    async login(email, password) {
        try {
            const userExist = await userDao.loginUser(email, password);
            if (!userExist) {
                return false;
            }
            const access_token = generateToken(userExist);
            logger.debug(`desde service ${userExist}`);
            return { user: userExist, access_token };
        } catch (error) {
            logger.error(`desde user.service.js - Error en login = ${error}`);
            throw error;
        }
    }

    async getById(id) {
        try {
            const response = await userDao.getById(id);
            return response;
        } catch (error) {
            logger.error(`desde user.service.js - Error en getById = ${error}`);
            throw error;
        }
    }

    async resetPass(user) {
        try {
            const token = await userDao.resetPass(user);
            if (token) {
                return await sendMail(user, "resetPass", token);
            } else {
                return false;
            }
        } catch (error) {
            logger.error(
                `desde user.service.js - Error en resetPass = ${error}`
            );
            throw error;
        }
    }

    async updatePass(user, password) {
        try {
            logger.debug(`desde service ${password}, ${user}`);
            const response = await userDao.updatePass(user, password);
            if (!response) return false;
            return response;
        } catch (error) {
            logger.error(
                `desde user.service.js - Error en updatePass = ${error}`
            );
            throw new Error(error.message);
        }
    }

    async changeRoles(userId) {
        try {
            const user = await userDao.getById(userId);
            if (user.role === "user") {
                user.role = "premium";
            } else if (user.role === "premium") {
                user.role = "user";
            }
            return await this.dao.update(userId, user);
        } catch (error) {
            logger.error(
                `desde user.service.js - Error en changeRoles = ${error}`
            );
            throw new Error(error.message);
        }
    }

    /* ----------------------------------- DTO ---------------------------------- */

    async getUserById(id) {
        try {
            const user = await userRepository.getUserById(id);
            logger.info(`respuesta desde service, ${user}`);
            if (!user) return false;
            else return user;
        } catch (error) {
            logger.error(
                `desde user.service.js - Error en getUserById = ${error}`
            );
            throw new Error(error.message);
        }
    }
}
