import { Router } from "express";
import { ProductManager } from "../managers/product.manager.js"
import { productValidator } from "../middlewares/product-validator.middleware.js";

const router = Router();
const productManager = new ProductManager("./src/db/products.json");


/* ---------------------------------- Traer productos con limit --------------------------------- */
router.get("/", async (req, res) => {
  try {
    const { limit } = req.query;
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
router.get('/:productId', async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    const product = await productManager.getProductsById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Producto no Encontrado' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error del Servidor' });
  }
});

/* --------------------------------- Agregar Productos -------------------------------- */

router.post("/", productValidator, async (req, res) => {
  try {
    const productCreated = await productManager.createProduct(req.body);
    res.status(200).json(productCreated);
  } catch (error) {
    res.status(500).json({ error: 'Error del Servidor' });
  }
})

/* -------------------------------- Actualizar Productos -------------------------------- */

router.put("/:productId", async (req, res) => {
  try {
    const updatedProduct = { ...req.body};
    const productId = parseInt(req.params.productId);
    const productExists = await productManager.getProductsById(productId);
    if (!productExists) {
      return res.status(404).json({ error: 'Producto no Encontrado' });
    } else {
      await productManager.updateProduct(productId, updatedProduct);
      res.status(200).json({ msg: `El producto con el ID: ${productId} ha sido actualizado` });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error del Servidor' });
  }
})

/* --------------------------------- Delete Products--------------------------------- */

router.delete("/:productId", async (req, res) =>{
  try {
    const productId = parseInt(req.params.productId);
    await productManager.deleteProduct(productId);
    res.status(200).json({ msg: `El producto con el ID: ${productId} ha sido eliminado` });
  } catch (error) {
    res.status(500).json({ error: 'Error del Servidor' });
  }
})


export default router;