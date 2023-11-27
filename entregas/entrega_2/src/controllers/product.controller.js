import * as service from "../services/product.service.js";

/* -------------------------- subir un JSON a MONGO ------------------------- */
// export const bulkProducts = async (req, res, next) => {
//     try {
//         const newProducts = await service.bulkProducts();
//         if (!newProducts) throw new Error("Validation failed");
//         else res.json(newProducts);
//     } catch (error) {
//         console.log(error);
//     }
// };

/* --------------------------------- Queries -------------------------------- */

export const getProductByCategory = async (req, res, next) => {
    try {
        const { category } = req.query;
        const items = await service.getProductByCategory(category);
        if (!items) throw new Error("Category not found");
        else res.json(items);
    } catch (error) {
        console.log(error);
    }
};

/* ------------------------------- Add to Cart ------------------------------ */
export const addProductToCart = async (req, res, next) => {
    try {
        const { cartId, productId } = req.params;
        const newProduct = await service.addProductToCart(cartId, productId);
        console.log(newProduct);
        if (!newProduct)
            res.status(404).json({ msg: "Error adding the product" });
        else res.status(200).json(newProduct);
    } catch (error) {
        next(error.message);
    }
};

/* ------------------------------------ CRUD ----------------------------------- */

export const getProducts = async (req, res, next) => {
    try {
        const response = await service.getProducts();
        if (!response)
            res.status(404).json({ msg: "Error getting the products" });
        else res.status(200).json(response);
    } catch (error) {
        next(error.message);
    }
};

export const getProductsById = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const response = await service.getProductsById(productId);
        if (!response)
            res.status(404).json({ msg: "Error getting the product by ID" });
        else res.status(200).json(response);
    } catch (error) {
        next(error.message);
    }
};

export const createProduct = async (req, res, next) => {
    try {
        const newProd = await service.createProduct(req.body);
        if (!newProd) res.status(404).json({ msg: "Error adding the product" });
        else res.status(200).json(newProd);
    } catch (error) {
        next(error.message);
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const prodUpd = await service.updateProduct(productId, req.body);
        if (!prodUpd)
            res.status(404).json({ msg: "Error updating the product" });
        else res.status(200).json(prodUpd);
    } catch (error) {
        next(error.message);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const prodDel = await service.deleteProduct(productId);
        if (prodDel)
            res.status(404).json({ msg: "Error deleting the product" });
        else
            res.status(200).json({
                msg: `Product ID ${productId} deleted successfully`,
            });
    } catch (error) {
        next(error.message);
    }
};
