import { Router } from "express";
import * as controller from "../controllers/user.controller.js";

const router = Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/logout", controller.logout);
router.get("/authenticationError", controller.renderAuthenticationError);

export default router;
