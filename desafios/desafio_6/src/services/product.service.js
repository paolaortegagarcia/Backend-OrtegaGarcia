/* --------------------------------- MongoDB -------------------------------- */
import { ProductDaoMongoDB } from "../dao/mongodb/product.dao.js";
const prodDao = new ProductDaoMongoDB();

/* --------------------------------- FileSystem -------------------------------- */
// import { ProductDaoFS } from "../dao/filesystem/product.dao.js";
// import { __dirname } from "../utils.js";
// const prodDao = new ProductDaoFS(
//     __dirname + "/dao/filesystem/db/products.json"
// );

/* -------------------------- subir un JSON a MONGO ------------------------- */
// import fs from "fs";
// import { __dirname } from "../utils.js";
// const productFile = JSON.parse(
//     fs.readFileSync(__dirname + "/dao/filesystem/db/products.json")
// );

// export const bulkProducts = async () => {
//     try {
//         const newProducts = await prodDao.createProduct(productFile);
//         if (!newProducts) return false;
//         return { msg: "File uploaded successfully" };
//     } catch (error) {
//         console.log(error);
//     }
// };

/* -------------------------------- Pipeline -------------------------------- */
export const aggregationCategory = async (category) => {
    try {
        return await prodDao.aggregationCategory(category);
    } catch (error) {
        console.log(error);
    }
};

export const aggregationPrice = async (sort) => {
    try {
        return await prodDao.aggregationPrice(sort);
    } catch (error) {
        console.log(error);
    }
};

/* --------------------------------- Queries -------------------------------- */

export const getProductByCategory = async (category) => {
    try {
        return await prodDao.getProductByCategory(category);
    } catch (error) {
        console.log(error);
    }
};

/* ------------------------------- Add to Cart ------------------------------ */
export const addProductToCart = async (cartId, productId) => {
    try {
        const exists = await prodDao.getProductsById(productId);
        const newProduct = await prodDao.addProductToCart(cartId, productId);
        if (!exists) throw new Error("Product not found");
        return newProduct;
    } catch (error) {
        console.log(error);
    }
};
/* ------------------------------------ CRUD ----------------------------------- */

export const getProducts = async (page, limit) => {
    try {
        return await prodDao.getProducts(page, limit);
    } catch (error) {
        console.log(error);
    }
};

export const getProductsById = async (productId) => {
    try {
        const prod = await prodDao.getProductsById(productId);
        if (!prod) return false;
        else return prod;
    } catch (error) {
        console.log(error);
    }
};

export const createProduct = async (obj) => {
    try {
        const newProd = await prodDao.createProduct(obj);
        if (!newProd) return false;
        else return newProd;
    } catch (error) {
        console.log(error);
    }
};

export const updateProduct = async (productId, obj) => {
    try {
        const prodUpd = await prodDao.updateProduct(productId, obj);
        if (!prodUpd) return false;
        else return prodUpd;
    } catch (error) {
        console.log(error);
    }
};

export const deleteProduct = async (productId) => {
    try {
        const prodDel = await prodDao.deleteProduct(productId);
        if (!prodDel) return false;
        else return prodDel;
    } catch (error) {
        console.log(error);
    }
};
