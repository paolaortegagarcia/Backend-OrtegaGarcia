import { Router } from "express";
import { productValidator } from "../../middlewares/product-validator.middleware.js";
import ProductController from "../../controllers/product.controller.js";
const controller = new ProductController();

const router = Router();

/* ---------------------------------- Get All ---------------------------------- */

//router.get("/all", controller.getProductsQueries); // implemento las queries y aggregations

router.get("/all", controller.getAll); // sin queries

/* ---------------------------------- CRUD ---------------------------------- */

router.post("/add/:id/:id", controller.addProductToCart);

router.get("/:id", controller.getById);

router.post("/", productValidator, controller.create);

router.put("/:id", controller.update);

router.delete("/:id", controller.delete);

export default router;
