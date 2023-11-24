/* --------------------------------- MongoDB -------------------------------- */
import { ProductDaoMongoDB } from "../dao/mongodb/product.dao.js";
const prodDao = new ProductDaoMongoDB();

/* --------------------------------- FileSystem -------------------------------- */
// import { ProductDaoFS } from "../dao/filesystem/product.dao.js";
// import { __dirname } from "../utils.js";
// const prodDao = new ProductDaoFS(
//     __dirname + "/dao/filesystem/db/products.json"
// );

/* ------------------------------------ - ----------------------------------- */

export const getProducts = async () => {
    try {
        return await prodDao.getProducts();
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
