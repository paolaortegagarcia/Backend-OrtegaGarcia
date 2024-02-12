/* ---------------------------------- Rutas con /api --------------------------------- */
import { Router } from "express";

// Routers en detalle
import productRouter from "../detail.routes/product.router.js";
import cartRouter from "../detail.routes/cart.router.js";
import chatRouter from "../detail.routes/chat.router.js";
import userRouter from "../detail.routes/user.router.js";
import noBloqueanteRouter from "../detail.routes/no-bloqueante.router.js";
import emailRouter from "../detail.routes/email.router.js";
import messageRouter from "../detail.routes/message.router.js";
import ticketRouter from "../detail.routes/ticket.router.js";
import loggerRouter from "../detail.routes/logger.router.js";

export default class ApiRoutes {
    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    initRoutes() {
        this.router.use("/carts", cartRouter);
        this.router.use("/products", productRouter);
        this.router.use("/chats", chatRouter);
        this.router.use("/users", userRouter);
        this.router.use("/no-bloqueante", noBloqueanteRouter);
        this.router.use("/email", emailRouter);
        this.router.use("/message", messageRouter);
        this.router.use("/ticket", ticketRouter);
        this.router.use("/loggertest", loggerRouter);
    }

    getRouter() {
        return this.router;
    }
}
