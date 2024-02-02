import Controllers from "./class.controller.js";
import CartService from "../services/cart.service.js";
import { HttpResponse, errorsDictionary } from "../utils/http.response.js";
import { logger } from "../utils/logger.js";
const httpResponse = new HttpResponse();
const cartService = new CartService();

export default class CartController extends Controllers {
    constructor() {
        super(cartService);
    }

    async deleteProductFromCart(req, res, next) {
        try {
            const { cartId, productId } = req.params;
            await cartService.deleteProductFromCart(cartId, productId);
            httpResponse.Ok(res, {
                msg: `Product ID ${productId} deleted successfully`,
            });
        } catch (error) {
            logger.error(`Error en deleteProductFromCart = ${error}`);
            next(error.message);
        }
    }

    async updateCart(req, res, next) {
        try {
            const { cartId } = req.params;
            logger.info("en el controller", cartId);
            const updatedProducts = req.body.products;
            const updatedCart = await cartService.updateCart(
                cartId,
                updatedProducts
            );
            res.status(200).json(updatedCart);
        } catch (error) {
            logger.error(`Error en updateCart = ${error}`);
            next(error.message);
        }
    }

    async updateProductQuantity(req, res, next) {
        try {
            const { cartId, productId } = req.params;
            const { quantity } = req.body;
            const updatedCart = await cartService.updateProductQuantity(
                cartId,
                productId,
                quantity
            );
            res.status(200).json(updatedCart);
        } catch (error) {
            logger.error(`Error en updateProductQuantity = ${error}`);
            next(error.message);
        }
    }

    async deleteAllProductsFromCart(req, res, next) {
        try {
            const { cartId } = req.params;
            const updatedCart = await cartService.deleteAllProductsFromCart(
                cartId
            );

            if (updatedCart === null) {
                res.status(404).json({ msg: "Cart not found" });
            } else {
                res.status(200).json({
                    msg: `Products from Cart ID ${cartId} deleted successfully`,
                });
            }
        } catch (error) {
            logger.error(`Error en deleteAllProductsFromCart = ${error}`);
            next(error.message);
        }
    }
}
