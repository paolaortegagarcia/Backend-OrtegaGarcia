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
            console.log("Entered login method");
            const id = req.session.passport.user;
            console.log("User ID from session:", id);

            const user = await userService.getById(id);
            if (!user) {
                console.log("User not found with ID:", id);
                return createResponse(res, 404, "User not found");
            }

            const { first_name, last_name } = user;
            console.log("Login successful for user:", user);
            res.json({
                msg: "login ok!",
                user: {
                    first_name,
                    last_name,
                },
            });
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
