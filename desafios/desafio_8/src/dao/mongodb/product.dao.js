import { ProductModel } from "./models/product.model.js";
import { CartModel } from "./models/cart.model.js";
export class ProductDaoMongoDB {
    /* ------------------------------- Add to Cart ------------------------------ */

    async addProductToCart(cartId, productId) {
        try {
            const cart = await CartModel.findById(cartId);
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
                cart.products.push({ product: productId, quantity: 1 });
            }

            await cart.save();
            return cart;
        } catch (error) {
            console.log(error);
        }
    }

    /* ---------------------------------- CRUD ---------------------------------- */
    async createProduct(obj) {
        try {
            const response = await ProductModel.create(obj);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    // En el getAll, implemento las queries y aggregations
    async getProducts(page = 1, limit = 10, category, sort) {
        try {
            let queryCategory = {};

            if (category) {
                queryCategory = { category: category };
            }

            let sortOrder = sort === "asc" ? 1 : -1;

            let pagination = { page, limit };

            if (sort) {
                pagination.sort = { price: sortOrder };
            }

            const response = await ProductModel.paginate(
                queryCategory,
                pagination
            );
            return response;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async getProductsRender() {
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
