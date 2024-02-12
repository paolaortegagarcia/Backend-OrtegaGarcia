import Controllers from "./class.controller.js";
import UserService from "../services/user.service.js";
import { HttpResponse, errorsDictionary } from "../utils/http.response.js";
import { logger } from "../utils/logger.js";
const httpResponse = new HttpResponse();
const userService = new UserService();

export default class UserController extends Controllers {
    constructor() {
        super(UserService);
    }

    async register(req, res, next) {
        try {
            httpResponse.Ok(res, { session: req.session });
        } catch (error) {
            logger.error(`Error en register = ${error}`);
            next(error.menssage);
        }
    }

    async login(req, res, next) {
        try {
            const { user, access_token } = await userService.login(
                req.body.email,
                req.body.password
            );
            if (!user) {
                httpResponse.Unauthorized(res, errorsDictionary.ERROR_LOGIN);
            } else {
                //res.header("Authorization", access_token)
                res.cookie("token", access_token, { httpOnly: true }).json({
                    msg: "Login OK",
                    access_token,
                });
            }
        } catch (error) {
            httpResponse.Unauthorized(res, errorsDictionary.ERROR_LOGIN);
            logger.error(`Error en login = ${error}`);
            next(error.message);
        }
    }

    async logout(req, res) {
        try {
            req.session.destroy();
            logger.info(`Session after logout: ${req.session}`);
            res.redirect("/login");
        } catch (error) {
            logger.error(`Error en logout = ${error}`);
            res.status(500).send("Internal Server Error");
        }
    }

    async githubResponse(req, res, next) {
        try {
            logger.info(req.user);
            const { first_name, email, isGithub } = req.user;
            res.json({
                msg: "Register/Login Github ok",
                session: req.session,
                user: {
                    first_name,
                    email,
                    isGithub,
                },
            });
        } catch (error) {
            logger.error(`Error en githubResponse = ${error}`);
            httpResponse.Unauthorized(res, errorsDictionary.ERROR_LOGIN);
        }
    }

    async renderAuthenticationError(req, res) {
        res.render("404-Login");
    }

    async profile(req, res, next) {
        const { first_name, last_name, email, role } = req.user;
        res.json({
            status: "success",
            userData: {
                first_name,
                last_name,
                email,
                role,
            },
        });
    }

    async current(req, res, next) {
        try {
            const user = req.user;
            const token = req.cookies.token;
            res.json({
                user,
                token,
            });
        } catch (error) {
            logger.error(`Error en current = ${error}`);
            next(error.message);
        }
    }

    /* ----------------------------------- DTO ---------------------------------- */

    getUserById = async (req, res, next) => {
        try {
            const { id } = req.user;
            const user = await userService.getUserById(id);
            logger.info(`respuesta desde controller, ${user}`);
            logger.info(user);
            if (!user)
                httpResponse.Unauthorized(res, errorsDictionary.ERROR_LOGIN);
            else httpResponse.Ok(res, user);
        } catch (error) {
            logger.error(`Error en getUserById = ${error}`);
            next(error.message);
        }
    };
}
