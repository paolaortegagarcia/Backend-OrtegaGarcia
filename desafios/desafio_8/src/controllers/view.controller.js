import * as service from "../services/product.service.js";
import * as chatService from "../services/chat.service.js";

export const renderHome = async (req, res, next) => {
    try {
        const products = await service.getProductsRender(); // Cree otro metodo porque con el paginate no renderiza bien
        /* ------------------------------- FileSystem ------------------------------- */
        // res.render("home", { products });
        /* ---------------------------------- Mongo --------------------------------- */
        const productsMongo = products.map((product) =>
            Object.assign({}, product.toJSON())
        );

        const { email, role } = req.session;
        console.log("rol en controller", role);

        res.render("home", { products: productsMongo, user: { email, role } });
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

export const renderLogInForm = async (req, res, next) => {
    try {
        res.render("login");
    } catch (error) {
        next(error.message);
    }
};

export const renderRegisterForm = async (req, res, next) => {
    try {
        res.render("register");
    } catch (error) {
        next(error.message);
    }
};

export const renderUserProfile = async (req, res, next) => {
    try {
        res.render("profile");
    } catch (error) {
        next(error.message);
    }
};
