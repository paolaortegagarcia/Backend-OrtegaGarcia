import { Router } from "express";
import * as controller from "../controllers/chat.controller.js";

const router = Router();

router.post("/", controller.createMessage);

router.get("/", controller.getMessages);

router.get("/:msgId", controller.getMessagesById);

export default router;
