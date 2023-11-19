import { CartModel } from "./models/cart.model.js";

export class CartDaoMongoDB {
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

    async getCarts() {
        try {
            const response = await CartModel.find({});
            return response;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async getCartById(cartId) {
        try {
            const response = await CartModel.findById(cartId);
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    async addProductToCart(cartId, productId) {
        try {
            const existingProduct = await CartModel.findOne({
                _id: cartId,
                "products.product": productId,
            });

            if (existingProduct) {
                const response = await CartModel.findOneAndUpdate(
                    {
                        _id: cartId,
                        "products.product": productId,
                    },
                    {
                        $inc: {
                            "products.$.quantity": 1,
                        },
                    },
                    { new: true }
                );
                return response;
            } else {
                const response = await CartModel.findByIdAndUpdate(
                    cartId,
                    {
                        $addToSet: {
                            products: {
                                product: productId,
                                quantity: 1,
                            },
                        },
                    },
                    { new: true }
                );
                return response;
            }
        } catch (error) {
            console.error(error);
        }
    }
}
