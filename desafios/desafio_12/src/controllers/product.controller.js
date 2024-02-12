import Controllers from "./class.controller.js";
import ProductService from "../services/product.service.js";
import { logger } from "../utils/logger.js";
const productService = new ProductService();
import { createResponse } from "../utils/utils.js";

export default class ProductController extends Controllers {
    constructor() {
        super(productService);
    }

    /* ---------------------------------- Mock ---------------------------------- */

    async createMocksProducts(req, res, next) {
        try {
            const { cant } = req.query;
            const response = await productService.createMocksProducts(cant);
            return createResponse(res, 200, response);
        } catch (error) {
            logger.error(`Error en createMocksProducts = ${error}`);
            next(error.menssage);
        }
    }

    /* ---------------------------------- Unión con el Cart --------------------------------- */

    async addProductToCart(req, res, next) {
        try {
            const { cartId, productId } = req.params;
            logger.info(`desde controller, ${cartId}, ${productId}`);
            const newProduct = await productService.addProductToCart(
                cartId,
                productId
            );
            logger.info(newProduct);
            if (!newProduct)
                res.status(404).json({ msg: "Error adding the product" });
            else res.status(200).json(newProduct);
        } catch (error) {
            logger.error(`Error en addProductToCart = ${error}`);
            next(error.message);
        }
    }

    /* ------------------------------------ Queries ----------------------------------- */

    async getProductsQueries(req, res, next) {
        try {
            const { page, limit, category, sort } = req.query;
            const response = await productService.getProductsQueries(
                page,
                limit,
                category,
                sort
            );

            if (!response)
                res.status(404).json({ msg: "Error getting the products" });

            const next = response.hasNextPage
                ? `http://localhost:8080/api/products/all?page=${response.nextPage}`
                : null;
            const prev = response.hasPrevPage
                ? `http://localhost:8080/api/products/all?page=${response.prevPage}`
                : null;

            res.status(200).json({
                status: response.docs.length > 0 ? "success" : "error",
                payload: response.docs,
                info: {
                    count: response.totalDocs,
                    totalPages: response.totalPages,
                    hasNextPage: response.hasNextPage,
                    hasPrevPage: response.hasPrevPage,
                    page: response.page,
                    nextPage: next,
                    prevPage: prev,
                },
            });
        } catch (error) {
            logger.error(`Error en getProductsQueries = ${error}`);
            next(error.message);
        }
    }

    /* ----------------------------------- DTO ---------------------------------- */

    async getProdById(req, res, next) {
        try {
            const { id } = req.params;
            const prod = await this.service.getProdById(id);
            if (!prod)
                createResponse(res, 404, {
                    method: "create",
                    error: "getById failed",
                });
            else createResponse(res, 200, prod);
        } catch (error) {
            logger.error(`Error en getProdById = ${error}`);
            next(error.message);
        }
    }

    async createProd(req, res, next) {
        try {
            const newItem = await this.service.createProd(req.body);
            if (!newItem)
                createResponse(res, 404, {
                    method: "create",
                    error: "Validation error!",
                });
            else createResponse(res, 200, newItem);
        } catch (error) {
            logger.error(`Error en createProd = ${error}`);
            next(error.message);
        }
    }
}
