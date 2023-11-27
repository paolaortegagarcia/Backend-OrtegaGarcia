import * as cartService from "../services/cart.service.js";

export const createCart = async (req, res, next) => {
    try {
        const newCart = await cartService.createCart();
        if (!newCart) res.status(404).json({ msg: "Error creating the cart" });
        else res.status(200).json(newCart);
    } catch (error) {
        next(error.message);
    }
};

export const getCarts = async (req, res, next) => {
    try {
        const carts = await cartService.getCarts();
        res.status(200).json(carts);
    } catch (error) {
        next(error.message);
    }
};

export const getCartById = async (req, res, next) => {
    try {
        const { cartId } = req.params;
        const cart = await cartService.getCartById(cartId);
        if (!cart) res.status(404).json({ msg: "Cart not found" });
        else res.status(200).json(cart);
    } catch (error) {
        next(error.message);
    }
};

export const deleteProductFromCart = async (req, res, next) => {
    try {
        const { cartId, productId } = req.params;
        await cartService.deleteProductFromCart(cartId, productId);
        res.status(200).json({
            msg: `Product ID ${productId} deleted successfully`,
        });
    } catch (error) {
        next(error.message);
    }
};

export const updateCart = async (req, res, next) => {
    try {
        const { cartId } = req.params;
        const updatedProducts = req.body.products;
        const updatedCart = await cartService.updateCart(
            cartId,
            updatedProducts
        );
        res.status(200).json(updatedCart);
    } catch (error) {
        next(error.message);
    }
};

export const updateProductQuantity = async (req, res, next) => {
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
};

export const deleteAllProductsFromCart = async (req, res, next) => {
    try {
        const { cartId } = req.params;
        const updatedCart = await cartService.deleteAllProductsFromCart(cartId);

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
};
