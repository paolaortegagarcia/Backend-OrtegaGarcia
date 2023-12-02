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

/* -------------------------------- Pipeline -------------------------------- */
export const aggregationCategory = async (req, res, next) => {
    try {
        const { category } = req.query;
        if (category === undefined) {
            const products = await service.getProducts();
            return res.json(products);
        } else {
            const response = await service.aggregationCategory(category);
            res.json(response);
        }
    } catch (error) {
        next(error.message);
    }
};

export const aggregationPrice = async (req, res, next) => {
    try {
        const { sort } = req.query;
        if (sort === undefined) {
            const products = await service.getProducts();
            return res.json(products);
        } else {
            const response = await service.aggregationPrice(sort);
            res.json(response);
        }
    } catch (error) {
        next(error.message);
    }
};

/* --------------------------------- Queries -------------------------------- */

export const getProductByCategory = async (req, res, next) => {
    try {
        const { category } = req.query;
        if (category === undefined) {
            const products = await service.getProducts();
            return res.json(products);
        } else {
            const response = await service.getProductByCategory(category);
            res.json(response);
        }
    } catch (error) {
        next(error.message);
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
        const { page, limit } = req.query;
        const response = await service.getProducts(page, limit);
        if (!response)
            res.status(404).json({ msg: "Error getting the products" });
        const next = response.hasNextPage
            ? `http://localhost:8080/api/products/all?page=${response.nextPage}`
            : null;
        const prev = response.hasPrevPage
            ? `http://localhost:8080/api/products/all?page=${response.prevPage}`
            : null;
        res.status(200).json({
            payload: response.docs,
            info: {
                count: response.totalDocs,
                totalPages: response.totalPages,
                hasNextPage: response.hasNextPage,
                hasPrevPage: response.hasPrevPage,
                page: response.page,
                nextPage: next,
                prevPage: prev,
            },
        });
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
