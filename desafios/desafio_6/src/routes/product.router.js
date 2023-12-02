import { Router } from "express";
import { productValidator } from "../middlewares/product-validator.middleware.js";
import * as controller from "../controllers/product.controller.js";

const router = Router();

/* --------------------------------- Bulk -------------------------------- */

// router.post("/bulk", controller.bulkProducts);

/* ---------------------------------- Pipeline ---------------------------------- */

router.get("/pipelineCategory", controller.aggregationCategory);
router.get("/pipelinePrice", controller.aggregationPrice);

/* ---------------------------------- Get All ---------------------------------- */

router.get("/all", controller.getProducts);

/* ---------------------------------- Queries ---------------------------------- */

router.get("/", controller.getProductByCategory);

/* ---------------------------------- CRUD ---------------------------------- */

router.post("/add/:cartId/:productId", controller.addProductToCart);

router.get("/:productId", controller.getProductsById);

router.post("/", productValidator, controller.createProduct);

router.put("/:productId", controller.updateProduct);

router.delete("/:productId", controller.deleteProduct);

export default router;
