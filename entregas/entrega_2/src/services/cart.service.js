/* --------------------------------- MongoDB -------------------------------- */
import { CartDaoMongoDB } from "../dao/mongodb/cart.dao.js";
const cartDao = new CartDaoMongoDB();

/* --------------------------------- FileSystem -------------------------------- */
// import { CartDaoFS } from "../dao/filesystem/cart.dao.js";
// import { __dirname } from "../utils.js";
// const cartDao = new CartDaoFS(__dirname + "/dao/filesystem/db/carts.json");

/* ------------------------------------ CRUD ---------------------------------- */

export const getCarts = async () => {
    try {
        return await cartDao.getCarts();
    } catch (error) {
        console.log(error);
    }
};

export const getCartById = async (cartId) => {
    try {
        const cart = await cartDao.getCartById(cartId);
        if (!cart) return false;
        else return cart;
    } catch (error) {
        console.log(error);
    }
};

export const createCart = async (productId) => {
    try {
        const newCart = await cartDao.createCart(productId);
        if (!newCart) return false;
        else return newCart;
    } catch (error) {
        console.log(error);
    }
};

export const deleteProductFromCart = async (cartId, productId) => {
    try {
        const updatedCart = await cartDao.deleteProductFromCart(
            cartId,
            productId
        );
        return updatedCart;
    } catch (error) {
        console.error(error);
    }
};

export const updateCart = async (cartId, updatedProducts) => {
    try {
        const updatedCart = await cartDao.updateCart(cartId, updatedProducts);
        return updatedCart;
    } catch (error) {
        console.error(error);
    }
};

export const updateProductQuantity = async (cartId, productId, newQuantity) => {
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
};

export const deleteAllProductsFromCart = async (cartId) => {
    try {
        const updatedCart = await cartDao.deleteAllProductsFromCart(cartId);
        return updatedCart;
    } catch (error) {
        console.error(error);
    }
};
