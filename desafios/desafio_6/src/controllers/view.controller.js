import * as service from "../services/product.service.js";
import * as chatService from "../services/chat.service.js";

export const renderHome = async (req, res, next) => {
    try {
        const products = await service.getProducts();
        /* ------------------------------- FileSystem ------------------------------- */
        // res.render("home", { products });
        /* ---------------------------------- Mongo --------------------------------- */
        const productsMongo = products.map((product) =>
            Object.assign({}, product.toJSON())
        );
        res.render("home", { products: productsMongo });
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

export const renderChat = async (req, res, next) => {
    try {
        const messages = await chatService.getMessages();
        res.render("chat", { messages });
    } catch (error) {
        next(error.message);
    }
};
