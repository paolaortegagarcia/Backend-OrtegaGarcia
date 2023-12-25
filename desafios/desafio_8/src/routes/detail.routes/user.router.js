import { Router } from "express";
import * as controller from "../../controllers/user.controller.js";
import passport from "passport";

const router = Router();

router.post(
    "/register",
    passport.authenticate("registerStrategy"),
    controller.register
);
router.post("/login", passport.authenticate("loginStrategy"), controller.login);
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
