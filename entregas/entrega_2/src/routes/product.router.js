import { Router } from "express";
import { productValidator } from "../middlewares/product-validator.middleware.js";
import * as controller from "../controllers/product.controller.js";

const router = Router();

router.get("/", controller.getProducts);

router.get("/:productId", controller.getProductsById);

router.post("/", productValidator, controller.createProduct);

router.put("/:productId", controller.updateProduct);

router.delete("/:productId", controller.deleteProduct);

export default router;
