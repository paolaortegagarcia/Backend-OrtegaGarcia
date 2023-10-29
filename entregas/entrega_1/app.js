import express from "express";
import productRouter from "./src/routes/product.router.js"
import cartRouter from "./src/routes/carts.router.js"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);


const PORT = 8080;

app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));