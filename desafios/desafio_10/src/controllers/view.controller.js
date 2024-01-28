import Controllers from "./class.controller.js";
import ProductService from "../services/product.service.js";
import ChatService from "../services/chat.service.js";
const productService = new ProductService();
const chatService = new ChatService();

export default class ViewController extends Controllers {
    constructor() {
        super(productService, chatService);
    }

    async renderHome(req, res, next) {
        res.render("welcome");
    }

    async renderProducts(req, res, next) {
        try {
            console.log("en el home");
            const products = await service.getAll();
            /* ------------------------------- FileSystem ------------------------------- */
            // res.render("home", { products });

            /* ---------------------------------- Mongo --------------------------------- */
            const productsMongo = products.map((product) =>
                Object.assign({}, product.toJSON())
            );

            const { email, role } = req.session;
            console.log("rol en controller", role);

            res.render("home", {
                products: productsMongo,
                user: { email, role },
            });
        } catch (error) {
            next(error.message);
        }
    }

    async renderRealTimeProducts(req, res, next) {
        try {
            const products = await service.getAll();
            res.render("realTimeProducts", { products });
        } catch (error) {
            next(error.message);
        }
    }

    async renderChat(req, res, next) {
        try {
            const messages = await chatService.getAll();
            res.render("chat", { messages });
        } catch (error) {
            next(error.message);
        }
    }

    async renderLogInForm(req, res, next) {
        try {
            res.render("login");
        } catch (error) {
            next(error.message);
        }
    }

    async renderRegisterForm(req, res, next) {
        try {
            res.render("register");
        } catch (error) {
            next(error.message);
        }
    }

    async renderUserProfile(req, res, next) {
        try {
            res.render("profile");
        } catch (error) {
            next(error.message);
        }
    }
}
