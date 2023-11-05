import express from "express";
import { __dirname } from "./utils.js";
import productRouter from "./routes/product.router.js"
import cartRouter from "./routes/cart.router.js"
import viewRouter from "./routes/view.router.js"
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { ProductManager } from "./managers/product.manager.js";


const app = express();

/* --------------------------------- Express -------------------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

/* --------------------------------- Routers -------------------------------- */
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewRouter);

/* ------------------------------- Handlebars ------------------------------- */
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");


/* --------------------------------- Server --------------------------------- */

const PORT = 8080;
const httpServer = app.listen(PORT, ()=> console.log(`🚀 Server is running on port ${PORT}`));

const socketServer = new Server(httpServer);


// Resto del código...

socketServer.on("connection", (socket) => {
  console.log(`🟢 Usuario Conectado ${socket.id}`);

  socket.on("disconnect", () => {
    console.log("🔴 Usuario Desconectado");
  });

  socket.on("newProduct", async (product) => {
    try {
      const productManager = new ProductManager("./src/db/products.json");
      await productManager.createProduct(product);
      const products = await productManager.getProducts();
      socketServer.emit("arrayProducts", products);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  });
});
