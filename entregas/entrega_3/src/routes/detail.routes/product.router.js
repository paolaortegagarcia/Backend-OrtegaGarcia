import { Router } from "express";
import { productValidator } from "../../middlewares/product-validator.middleware.js";
import ProductController from "../../controllers/product.controller.js";
import {
    roleAdmin,
    roleUser,
} from "../../middlewares/role-validator.middleware.js";
const controller = new ProductController();

const router = Router();

/* ---------------------------------- Get All ---------------------------------- */

//router.get("/all", controller.getProductsQueries); // implemento las queries y aggregations

router.get("/all", controller.getAll); // sin queries

/* ---------------------------------- CRUD ---------------------------------- */

router.post(
    "/add/:cartId/:productId",
    /* roleUser, */ controller.addProductToCart
);

router.get("/:id", controller.getById);

router.post("/", /* roleAdmin, */ productValidator, controller.create);

router.put("/:id", /* roleAdmin, */ controller.update);

router.delete("/:id", /* roleAdmin, */ controller.delete);

router.get("/dto/:id", controller.getProdById);

export default router;
