import Controllers from "./class.controller.js";
import ProductService from "../services/product.service.js";
const productService = new ProductService();

export default class ProductController extends Controllers {
    constructor() {
        super(productService);
    }

    async addProductToCart(req, res, next) {
        try {
            const { cartId, productId } = req.params;
            const newProduct = await service.addProductToCart(
                cartId,
                productId
            );
            console.log(newProduct);
            if (!newProduct)
                res.status(404).json({ msg: "Error adding the product" });
            else res.status(200).json(newProduct);
        } catch (error) {
            next(error.message);
        }
    }

    async getProductsQueries(req, res, next) {
        try {
            const { page, limit, category, sort } = req.query;
            const response = await service.getProducts(
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
            next(error.message);
        }
    }
}
