import * as cartService from "../services/cart.services.js";

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

export const addProductToCart = async (req, res, next) => {
    try {
        const { cartId, productId } = req.params;
        const updatedCart = await cartService.addProductToCart(
            cartId,
            productId
        );
        if (!updatedCart)
            res.status(404).json({ msg: "Error adding product to cart" });
        else res.status(200).json(updatedCart);
    } catch (error) {
        next(error.message);
    }
};
