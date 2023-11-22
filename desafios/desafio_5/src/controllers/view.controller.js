import * as service from "../services/product.services.js";

export const renderHome = async (req, res, next) => {
    try {
        const products = await service.getProducts();
        console.log(products[0].description); //prueba de que si lee el producto
        res.render("home", { products });
    } catch (error) {
        next(error.message);
    }
};

export const renderRealTimeProducts = async (req, res, next) => {
    try {
        const products = await service.getProducts();
        res.render("realTimeProducts", { products });
    } catch (error) {
        next(error.message);
    }
};