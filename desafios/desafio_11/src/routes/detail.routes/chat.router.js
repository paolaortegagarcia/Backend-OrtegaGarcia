import { Router } from "express";
import ChatController from "../../controllers/chat.controller.js";
const controller = new ChatController();

const router = Router();

router.post("/", controller.create);

router.get("/", controller.getAll);

router.get("/:msgId", controller.getById);

export default router;
