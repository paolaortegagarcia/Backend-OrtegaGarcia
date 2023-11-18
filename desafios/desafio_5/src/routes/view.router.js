import { Router } from "express";
import { ProductManager } from "../managers/product.manager.js";

const router = Router();


/* ---------------------------------- Home ---------------------------------- */
router.get("/", async (req, res) => {
  try {
    const productManager = new ProductManager("./src/db/products.json");
    const products = await productManager.getProducts(); 

    res.render("home", { products }); 
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


router.get("/realtimeproducts", async (req, res) => {
  try {
    const productManager = new ProductManager("./src/db/products.json");
    const products = await productManager.getProducts();

    res.render("realTimeProducts", { products });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


export default router;