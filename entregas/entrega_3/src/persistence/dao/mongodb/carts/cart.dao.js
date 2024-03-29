import { CartModel } from "./cart.model.js";
import MongoDao from "../mongo.dao.js";

export default class CartDaoMongoDB extends MongoDao {
    constructor() {
        super(CartModel);
    }

    async createCart() {
        try {
            const cart = {
                products: [],
            };

            const response = await CartModel.create(cart);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getCartById(cartId) {
        try {
            const response = await CartModel.findById(cartId).populate({
                path: "products.product",
                model: "products",
            });
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    async deleteProductFromCart(cartId, productId) {
        try {
            const response = await CartModel.findByIdAndUpdate(
                cartId,
                {
                    $pull: {
                        products: { product: productId },
                    },
                },
                { new: true }
            );
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    async updateCart(cartId, updatedProducts) {
        try {
            const response = await CartModel.findByIdAndUpdate(
                cartId,
                { products: updatedProducts },
                { new: true }
            );
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    async updateProductQuantity(cartId, productId, newQuantity) {
        try {
            const response = await CartModel.findOneAndUpdate(
                { _id: cartId, "products.product": productId },
                {
                    $set: {
                        "products.$.quantity": newQuantity,
                    },
                },
                { new: true }
            );
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    async deleteAllProductsFromCart(cartId) {
        try {
            const response = await CartModel.findByIdAndUpdate(
                cartId,
                { products: [] },
                { new: true }
            );
            return response || null;
        } catch (error) {
            console.error(error);
        }
    }
}
