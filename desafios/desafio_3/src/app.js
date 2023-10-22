import express from "express";
import { ProductManager } from "./productManager.js";

const productManager = new ProductManager("./productos.json");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------------------------------- Traer productos con limit --------------------------------- */
app.get("/products", async (req, res) => {
  try {
    const { limit } = req.query;
    //console.log("limit:", limit);
    const products = await productManager.getProducts();

    if(!limit) res.status(200).json(products);
    else {
        const productsByLimit = await productManager.getProductsByLimit(limit);
        res.status(200).json(productsByLimit);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});


/* ---------------------------------- Traer productos con ID --------------------------------- */
app.get('/products/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = await productManager.getProductsById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Producto no Encontrado' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error del Servidor' });
  }
});



const PORT = 8080;

app.listen(PORT, ()=> console.log(`Server ok on port ${PORT}`));