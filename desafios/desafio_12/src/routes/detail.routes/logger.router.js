import { Router } from "express";
import LoggerController from "../../controllers/logger.controller.js";
const controller = new LoggerController();
const router = Router();

router.get("/", controller.loggerTest);

router.get("/error", controller.loggerError);

export default router;
