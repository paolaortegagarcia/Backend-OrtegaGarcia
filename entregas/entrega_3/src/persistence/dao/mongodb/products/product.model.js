import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export const productCollection = "products";

export const productSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    code: { type: String, required: true },
    precio: { type: Number, required: true },
    disponibilidad: { type: Number, required: true },
    category: { type: String, required: true, index: true },
});

productSchema.plugin(mongoosePaginate);

export const ProductModel = model(productCollection, productSchema);
