import { Schema, model } from "mongoose";

export const cartCollection = "carts";

export const cartSchema = new Schema({
    status: { type: Boolean, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    thumbnails: { type: String, required: true },
});

export const CartModel = model(cartCollection, cartSchema);
