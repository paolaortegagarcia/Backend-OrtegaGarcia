import Services from "./class.service.js";
import persistence from "../persistence/persistence.js";
const { prodDao } = persistence;

export default class ProductService extends Services {
    constructor() {
        super(prodDao);
    }

    async addProductToCart(cartId, productId) {
        try {
            const exists = await prodDao.getProductsById(productId);
            const newProduct = await prodDao.addProductToCart(
                cartId,
                productId
            );
            if (!exists) throw new Error("Product not found");
            return newProduct;
        } catch (error) {
            console.log(error);
        }
    }
    /* ------------------------------------ CRUD ----------------------------------- */

    async getProductsQueries(page, limit, category, sort) {
        try {
            return await prodDao.getProductsQueries(
                page,
                limit,
                category,
                sort
            );
        } catch (error) {
            console.log(error);
        }
    }
}
