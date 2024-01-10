/* ---------------------------------- Rutas con /api --------------------------------- */
import { Router } from "express";

// Routers en detalle
import productRouter from "../detail.routes/product.router.js";
import cartRouter from "../detail.routes/cart.router.js";
import chatRouter from "../detail.routes/chat.router.js";
import userRouter from "../detail.routes/user.router.js";
import noBloqueanteRouter from "../detail.routes/no-bloqueante.router.js";

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
    }

    getRouter() {
        return this.router;
    }
}
