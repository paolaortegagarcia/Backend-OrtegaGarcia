import Services from "./class.service.js";
import { CartDaoMongoDB } from "../dao/mongodb/cart.dao.js";
const cartDao = new CartDaoMongoDB();

export default class CartService extends Services {
    constructor() {
        super(cartDao);
    }

    async deleteProductFromCart(cartId, productId) {
        try {
            const updatedCart = await cartDao.deleteProductFromCart(
                cartId,
                productId
            );
            return updatedCart;
        } catch (error) {
            console.error(error);
        }
    }

    async updateCart(cartId, updatedProducts) {
        try {
            const updatedCart = await cartDao.updateCart(
                cartId,
                updatedProducts
            );
            return updatedCart;
        } catch (error) {
            console.error(error);
        }
    }

    async updateProductQuantity(cartId, productId, newQuantity) {
        try {
            const updatedCart = await cartDao.updateProductQuantity(
                cartId,
                productId,
                newQuantity
            );
            return updatedCart;
        } catch (error) {
            console.error(error);
        }
    }

    async deleteAllProductsFromCart(cartId) {
        try {
            const updatedCart = await cartDao.deleteAllProductsFromCart(cartId);
            return updatedCart;
        } catch (error) {
            console.error(error);
        }
    }
}
