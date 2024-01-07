/* ---------------------------------- Rutas Views --------------------------------- */
import { Router } from "express";

// Routers en detalle
import viewRouter from "../detail.routes/view.router.js";

const router = new Router();

router.use("/", viewRouter);

export default router;
