import Controllers from "./class.controller.js";
import CartService from "../services/cart.service.js";
const cartService = new CartService();

export default class CartController extends Controllers {
    constructor() {
        super(cartService);
    }

    async deleteProductFromCart(req, res, next) {
        try {
            const { cartId, productId } = req.params;
            await cartService.deleteProductFromCart(cartId, productId);
            res.status(200).json({
                msg: `Product ID ${productId} deleted successfully`,
            });
        } catch (error) {
            next(error.message);
        }
    }

    async updateCart(req, res, next) {
        try {
            const { cartId } = req.params;
            console.log("en el controller", cartId);
            const updatedProducts = req.body.products;
            const updatedCart = await cartService.updateCart(
                cartId,
                updatedProducts
            );
            res.status(200).json(updatedCart);
        } catch (error) {
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
            next(error.message);
        }
    }
}
