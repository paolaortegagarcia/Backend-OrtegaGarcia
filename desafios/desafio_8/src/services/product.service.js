import Services from "./class.service.js";
import { ProductDaoMongoDB } from "../dao/mongodb/product.dao.js";
const prodDao = new ProductDaoMongoDB();

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

    async getProducts() {
        try {
            return await prodDao.getAll();
        } catch (error) {
            console.log(error);
        }
    }

    async getProductsById(productId) {
        try {
            const prod = await prodDao.getById(productId);
            if (!prod) return false;
            else return prod;
        } catch (error) {
            console.log(error);
        }
    }

    async createProduct(obj) {
        try {
            const newProd = await prodDao.create(obj);
            if (!newProd) return false;
            else return newProd;
        } catch (error) {
            console.log(error);
        }
    }

    async updateProduct(productId, obj) {
        try {
            const prodUpd = await prodDao.update(productId, obj);
            if (!prodUpd) return false;
            else return prodUpd;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(productId) {
        try {
            const prodDel = await prodDao.delete(productId);
            if (!prodDel) return false;
            else return prodDel;
        } catch (error) {
            console.log(error);
        }
    }
}
