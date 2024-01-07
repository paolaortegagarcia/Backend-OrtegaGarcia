import Controllers from "./class.controller.js";
import UserService from "../services/user.service.js";
import { createResponse } from "../utils.js";
const userService = new UserService();

export default class UserController extends Controllers {
    constructor() {
        super(UserService);
    }

    async register(req, res, next) {
        try {
            res.json({
                msg: "Register ok!",
                session: req.session,
            });
        } catch (error) {
            next(error.message);
        }
    }

    async login(req, res, next) {
        try {
            const { user, access_token } = await userService.login(
                req.body.email,
                req.body.password
            );
            if (!user) {
                createResponse(
                    res,
                    401,
                    "User not found or invalid credentials"
                );
            } else {
                res.header("Authorization", access_token).json({
                    msg: "Login OK",
                    user,
                    access_token,
                });
            }
        } catch (error) {
            console.error("Error in login method:", error);
            next(error.message);
        }
    }

    async logout(req, res) {
        try {
            req.session.destroy();
            console.log("Session after logout:", req.session);
            res.redirect("/login");
        } catch (error) {
            console.error("Error during logout:", error);
            res.status(500).send("Internal Server Error");
        }
    }

    async githubResponse(req, res, next) {
        try {
            console.log(req.user);
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
            next(error.message);
        }
    }

    async renderAuthenticationError(req, res) {
        res.render("404-Login");
    }

    async profile(req, res, next) {
        try {
            const { first_name, last_name, email, role } = req.user;
            createResponse(res, 200, {
                first_name,
                last_name,
                email,
                role,
            });
        } catch (error) {
            next(error.message);
        }
    }
}
