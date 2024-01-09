import { Router } from "express";
import { verifyToken } from "../../middlewares/verify-token.middleware.js";
import UserController from "../../controllers/user.controller.js";
const controller = new UserController();
import passport from "passport";

const router = Router();

router.post(
    "/register",
    passport.authenticate("registerStrategy"),
    controller.register
);
router.post("/login", passport.authenticate("loginStrategy"), controller.login);
router.get("/private", passport.authenticate("jwt"), controller.profile);
router.get("/current", passport.authenticate("jwtCookies"), controller.current);
router.post("/logout", controller.logout);
router.get("/authenticationError", controller.renderAuthenticationError);
router.get(
    "/register-github",
    passport.authenticate("github", { scope: ["user:email"] })
);
router.get(
    "/github",
    passport.authenticate("github", { scope: ["user:email"] }),
    controller.githubResponse
);

export default router;
