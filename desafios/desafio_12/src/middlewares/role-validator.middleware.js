import { createResponse } from "../utils/response/create.response.js";
import factory from "../persistence/factory.js";
import { logger } from "../utils/logger/logger.js";
const { userDao } = factory;

export const roleAdmin = async (req, res, next) => {
    logger.info(`middleware ${JSON.stringify(req.session.passport.user)}`);
    const userId = req.session.passport.user;
    const user = await userDao.getById(userId);
    logger.debug(`user:${user}`);
    if (user && user.role === "admin") {
        next();
    } else {
        createResponse(res, 401, {
            error: "Solo autorizado para administradores",
        });
    }
};

export const roleUser = async (req, res, next) => {
    const userId = req.session.passport.user;
    const user = await userDao.getById(userId);
    if (user && user.role === "user") {
        next();
    } else {
        createResponse(res, 401, {
            error: "Solo autorizado para usuarios",
        });
    }
};
