import { Router } from "express";
import { CartManager } from "../managers/cart.manager.js"

const router = Router();
const cartManager = new CartManager("./src/db/carts.json");


/* ---------------------------------- Crear el Carrito --------------------------------- */
router.post('/', async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(200).json(newCart);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

/* -------------------------------- Traer Carrito por ID -------------------------------- */

router.get('/:cartId', async (req, res) => {
  try {
    const cartId = parseInt(req.params.cartId);
    const cart = await cartManager.getCartById(cartId);

    if (!cart) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

/* ------------------------- Agregar Producto al Carrito ------------------------- */

router.post('/:cartId/products/:productId', async (req, res) => {
  try {
    const cartId = parseInt(req.params.cartId);
    const productId = parseInt(req.params.productId);

    const cart = await cartManager.addProductToCart(cartId, productId);

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


export default router;