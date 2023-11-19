import { Router } from "express";
import * as controller from "../controllers/cart.controller.js";

const router = Router();

router.post("/", controller.createCart);

router.get("/", controller.getCarts);

router.get("/:cartId", controller.getCartById);

router.post("/:cartId/:productId", controller.addProductToCart);

export default router;
