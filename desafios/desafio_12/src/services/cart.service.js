import Services from "./class.service.js";
import factory from "../persistence/factory.js";
import { logger } from "../utils/logger.js";
const { cartDao } = factory;

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
            logger.error(`Error en deleteProductFromCart = ${error}`);
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
            logger.error(`Error en updateCart = ${error}`);
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
            logger.error(`Error en updateProductQuantity = ${error}`);
        }
    }

    async deleteAllProductsFromCart(cartId) {
        try {
            const updatedCart = await cartDao.deleteAllProductsFromCart(cartId);
            return updatedCart;
        } catch (error) {
            logger.error(`Error en deleteAllProductsFromCart = ${error}`);
        }
    }
}
