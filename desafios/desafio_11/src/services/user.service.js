import Services from "./class.service.js";
import { generateToken } from "../jwt/auth.js";
import factory from "../persistence/factory.js";
const { userDao } = factory;
import UserRepository from "../persistence/repository/user.repository.js";
const userRepository = new UserRepository();

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
            logger.error(`Error en register, ${error}`);
            throw error;
        }
    }

    async login(email, password) {
        try {
            logger.info(`desde service: ${email}, ${password} `);
            const userExist = await userDao.loginUser(email, password);
            if (!userExist) {
                return false;
            }
            const access_token = generateToken(userExist);
            return { user: userExist, access_token };
        } catch (error) {
            logger.error(`Error en login = ${error}`);
            throw error;
        }
    }

    async getById(id) {
        try {
            const response = await userDao.getById(id);
            return response;
        } catch (error) {
            logger.error(`Error en getById = ${error}`);
            throw error;
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
            logger.error(`Error en getUserById = ${error}`);
            throw new Error(error.message);
        }
    }
}
