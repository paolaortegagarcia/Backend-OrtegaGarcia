import { ProductModel } from "./models/product.model.js";

export class ProductDaoMongoDB {
    async createProduct(obj) {
        try {
            const response = await ProductModel.create(obj);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getProducts() {
        try {
            const response = await ProductModel.find({});
            return response;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async getProductsById(productId) {
        try {
            const response = await ProductModel.findById(productId);
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    async updateProduct(productId, obj) {
        try {
            const response = await ProductModel.findByIdAndUpdate(
                productId,
                obj,
                {
                    new: true,
                }
            );
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    async deleteProduct(productId) {
        try {
            const response = await ProductModel.findByIdAndDelete(productId);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
}
