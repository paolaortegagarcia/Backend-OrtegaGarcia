import { Router } from "express";
import CartController from "../../controllers/cart.controller.js";
const controller = new CartController();

const router = Router();

router.post("/", controller.create);

router.get("/", controller.getAll);

router.get("/:id", controller.getById);

router.delete("/:cartId/products/:productId", controller.deleteProductFromCart);

router.put("/:cartId", controller.updateCart);

router.put("/:cartId/products/:productId", controller.updateProductQuantity);

router.delete("/:cartId", controller.deleteAllProductsFromCart);

router.delete("/delete/:id", controller.delete);

export default router;
