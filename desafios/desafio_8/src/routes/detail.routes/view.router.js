import { Router } from "express";
import * as controller from "../../controllers/view.controller.js";

const router = Router();

router.get("/", controller.renderHome);
router.get("/realtimeproducts", controller.renderRealTimeProducts);
router.get("/chat", controller.renderChat);
router.get("/login", controller.renderLogInForm);
router.get("/register", controller.renderRegisterForm);
router.get("/profile", controller.renderUserProfile);

export default router;
