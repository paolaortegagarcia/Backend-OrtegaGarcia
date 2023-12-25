import { Server } from "socket.io";
import * as productServices from "../services/product.service.js";
import * as chatServices from "../services/chat.service.js";
import { productValidator } from "../middlewares/product-validator.middleware.js";

const socketConfig = (httpServer) => {
    const socketServer = new Server(httpServer);

    socketServer.on("connection", async (socket) => {
        console.log(`🟢 Usuario Conectado ${socket.id}`);
        socket.on("disconnect", () => {
            console.log("🔴 Usuario Desconectado");
        });

        /* ---------------------------- RealTimeProducts ---------------------------- */
        socket.on("newProduct", productValidator, async (product) => {
            try {
                const newProduct = await productServices.createProduct(product);
                socketServer.emit("productAdded", newProduct);

                const products = await productServices.getProducts();
                socketServer.emit("arrayProducts", products);
            } catch (error) {
                console.error("Error adding product:", error);
            }
        });

        /* ---------------------------------- Chat ---------------------------------- */
        socketServer.emit("messages", await chatServices.getMessages());
        socket.on("newUser", (user) => {
            console.log(`🙋‍♀️🙋‍♂️ ${user} has logged in`);
        });
        socket.on("chat:message", async (msg) => {
            await chatServices.createMessage(msg);
            socketServer.emit("messages", await chatServices.getMessages());
        });
        socket.on("newUser", (user) => {
            socket.broadcast.emit("newUser", user);
        });
        socket.on("chat:typing", (user) => {
            socket.broadcast.emit("chat:typing", user);
        });
    });
};

export default socketConfig;
