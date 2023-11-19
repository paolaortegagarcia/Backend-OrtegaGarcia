import { Schema, model } from "mongoose";

export const cartCollection = "carts";

export const cartSchema = new Schema({
    products: [
        {
            product: { type: String, required: true },
            quantity: { type: Number, required: true },
        },
    ],
});

export const CartModel = model(cartCollection, cartSchema);
