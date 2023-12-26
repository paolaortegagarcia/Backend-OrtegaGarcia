import { Router } from "express";
import { productValidator } from "../../middlewares/product-validator.middleware.js";
import ProductController from "../../controllers/product.controller.js";
const controller = new ProductController();

const router = Router();

/* ---------------------------------- Get All ---------------------------------- */

router.get("/all", controller.getProductsQueries); // implemento las queries y aggregations

//router.get("/all", controller.getAll); // sin queries

/* ---------------------------------- CRUD ---------------------------------- */

router.post("/add/:cartId/:productId", controller.addProductToCart);

router.get("/:productId", controller.getById);

router.post("/", productValidator, controller.create);

router.put("/:productId", controller.update);

router.delete("/:productId", controller.delete);

export default router;
