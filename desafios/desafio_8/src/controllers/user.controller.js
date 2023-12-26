import Controllers from "./class.controller.js";
import UserService from "../services/user.service.js";
const userService = new UserService();

export default class UserController extends Controllers {
    constructor() {
        super(UserService);
    }

    async register(req, res, next) {
        try {
            const newUser = await userService.register(req.body);
            if (!newUser) createResponse(res, 404, "User already exist");
            else createResponse(res, 200, newUser);
        } catch (error) {
            next(error.message);
        }
    }

    async login(req, res, next) {
        try {
            const token = await userService.login(req.body);
            if (!token) createResponse(res, 404, "Error - Login Unsuccessful");
            else {
                res.header("Authorization", token);
                createResponse(res, 200, token);
            }
        } catch (error) {
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
