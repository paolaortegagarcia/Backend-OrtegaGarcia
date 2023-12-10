import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";
import { __dirname, mongoStoreOptions } from "./utils.js";
import productRouter from "./routes/product.router.js";
import cartRouter from "./routes/cart.router.js";
import chatRouter from "./routes/chat.router.js";
import viewRouter from "./routes/view.router.js";
import userRouter from "./routes/user.router.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { errorHandler } from "./middlewares/error-handler.middleware.js";
import { initMongoDB } from "./dao/mongodb/connection.js";
import * as productServices from "./services/product.service.js";
import * as chatServices from "./services/chat.service.js";
import { productValidator } from "./middlewares/product-validator.middleware.js";
import "./passport/local-strategy.js";
import passport from "passport";
import "./passport/github-strategy.js";

/* --------------------------------- Express -------------------------------- */

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));

app.use(session(mongoStoreOptions));

app.use(passport.initialize());
app.use(passport.session());

/* --------------------------------- Routers -------------------------------- */

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/chats", chatRouter);
app.use("/views", viewRouter);
app.use("/users", userRouter);

/* ------------------------------- Handlebars ------------------------------- */

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

/* --------------------------------- Server --------------------------------- */

const PORT = 8080;
const httpServer = app.listen(PORT, () =>
    console.log(`🚀 Server is running on port ${PORT}`)
);

/* ---------------------------------- Error Handler--------------------------------- */

app.use(errorHandler);

/* ------------------------------- Persistence ------------------------------ */

const persistence = "MONGO";

if (persistence === "MONGO") await initMongoDB();

/* -------------------------------- WebSocket ------------------------------- */

export const socketServer = new Server(httpServer);

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
