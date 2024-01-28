import { createResponse } from "../utils.js";
import factory from "../persistence/factory.js";
const { userDao } = factory;

export const roleAdmin = async (req, res, next) => {
    const userId = req.session.passport.user;
    const user = await userDao.getById(userId);
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
