import Services from "./class.service.js";
import factory from "../persistence/factory.js";
const { prodDao } = factory;
import ProductRepository from "../persistence/repository/product.repository.js";
const prodRepository = new ProductRepository();

export default class ProductService extends Services {
    constructor() {
        super(prodDao);
    }

    /* ---------------------------------- Unión con el Cart --------------------------------- */

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

    /* ------------------------------------ Queries ----------------------------------- */

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

    /* ----------------------------------- DTO ---------------------------------- */

    async getProdById(id) {
        try {
            const prod = await prodRepository.getProdById(id);
            if (!prod) return false;
            else return prod;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async createProd(obj) {
        try {
            const newItem = await prodRepository.createProd(obj);
            if (!newItem) return false;
            else return newItem;
        } catch (error) {
            console.log(error);
        }
    }
}
