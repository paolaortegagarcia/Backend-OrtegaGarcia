import express from "express";
import { __dirname } from "./utils.js";
import productRouter from "./routes/product.router.js";
import cartRouter from "./routes/cart.router.js";
import viewRouter from "./routes/view.router.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { errorHandler } from "./middlewares/error-handler.middleware.js";
import { initMongoDB } from "./dao/mongodb/connection.js";
import * as productServices from "./services/product.services.js";

/* --------------------------------- Express -------------------------------- */

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

/* --------------------------------- Routers -------------------------------- */

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewRouter);

/* ---------------------------------- Error Handler--------------------------------- */

app.use(errorHandler);

/* ------------------------------- Handlebars ------------------------------- */

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

/* --------------------------------- Server --------------------------------- */

const PORT = 8080;
const httpServer = app.listen(PORT, () =>
    console.log(`🚀 Server is running on port ${PORT}`)
);

/* ------------------------------- Persistence ------------------------------ */

const persistence = "MONGO";

if (persistence === "MONGO") await initMongoDB();

/* -------------------------------- WebSocket ------------------------------- */

export const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
    console.log(`🟢 Usuario Conectado ${socket.id}`);

    socket.on("disconnect", () => {
        console.log("🔴 Usuario Desconectado");
    });

    socket.on("newProduct", async (product) => {
        try {
            const newProduct = await productServices.createProduct(product);
            socketServer.emit("productAdded", newProduct);

            const products = await productServices.getProducts();
            console.log("Products sent over WebSocket:", products);
            socketServer.emit("arrayProducts", products);
        } catch (error) {
            console.error("Error adding product:", error);
        }
    });
});
