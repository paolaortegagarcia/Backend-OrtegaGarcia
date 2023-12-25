import { Router } from "express";
import * as controller from "../../controllers/cart.controller.js";

const router = Router();

router.post("/", controller.createCart);

router.get("/", controller.getCarts);

router.get("/:cartId", controller.getCartById);

router.delete("/:cartId/products/:productId", controller.deleteProductFromCart);

router.put("/:cartId", controller.updateCart);

router.put("/:cartId/products/:productId", controller.updateProductQuantity);

router.delete("/:cartId", controller.deleteAllProductsFromCart);

export default router;
