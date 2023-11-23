import { Router } from "express";
import * as controller from "../controllers/view.controller.js";

const router = Router();

router.get("/", controller.renderHome);
router.get("/realtimeproducts", controller.renderRealTimeProducts);
router.get("/chat", controller.renderChat);

export default router;
