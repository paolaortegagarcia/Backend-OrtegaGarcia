import { Router } from "express";
import ViewController from "../../controllers/view.controller.js";
const controller = new ViewController();

const router = Router();

router.get("/", controller.renderHome);
router.get("/realtimeproducts", controller.renderRealTimeProducts);
router.get("/chat", controller.renderChat);
router.get("/login", controller.renderLogInForm);
router.get("/register", controller.renderRegisterForm);
router.get("/profile", controller.renderUserProfile);

export default router;
