import fs from "fs";
import { uuid } from "uuidv4";

export class CartManager {
  constructor(path) {
    this.carts = [];
    this.path = path;
    this.createFile();
  }

/* -------------------------------- Carritos ------------------------------- */

  async createCart() {
    try {
      const cart = {
        id: uuid(),
        products: []
      };
  
      this.carts.push(cart); 
      await this.saveFile(this.carts); 
      console.log("New cart added, details:", cart);
      return cart;

    } catch (error) {
      console.log("Error adding the cart:", error);
    }
    
  }

  async getCarts() {
    try {
      if (fs.existsSync(this.path)) {
        const carts = await this.getFile();
        console.log("Number of carts:", carts.length);
        return carts;
      } else{
        console.log("No cart list found")
        return [];
      }
    } catch (error) {
      console.log("Error getting the carts:", error)
      return [];
    }

  }

  async getCartById(id) {
    try {
      const carts = await this.getFile();
      const cartId = carts.find((cart) => cart.id === id);
      
      if (cartId) {
        console.log("Requested ID details:", cartId);
        return cartId;
      } else {
        console.error("Cart with that ID not found");
      }
    } catch (error) {
      console.error("Error getting the cart by ID:", error);
    }
  }


  async addProductToCart(cartId, productId) {
    try {
      const carts = await this.getFile();
      const cartIndex = carts.findIndex((cart) => cart.id === cartId);
  
      if (cartIndex !== -1) {
        let productExists = false;
        for (let product of carts[cartIndex].products) {
          if (product.product === productId) {
            product.quantity = product.quantity + 1;
            productExists = true;
            break;
          }
        }
  
        if (!productExists) {
          const product = {
            product: productId,
            quantity: 1,
          };
          carts[cartIndex].products.push(product);
        }
  
        await this.updateFile(carts);
        return carts[cartIndex];
      } else {
        console.error("Cart with that ID not found");
      }
    } catch (error) {
      console.error("Error getting the cart by ID:", error);
    }
  }
  
    
  
/* ------------------------------- Archivo JSON ------------------------------ */

  async createFile() {
    try {
      if (!fs.existsSync(this.path)) {
        await fs.promises.writeFile(this.path, JSON.stringify([]));
      }
    } catch (error) {
      console.error("Error creating the file:", error)
    } 

  }

  async getFile(){
    try {
      const carts = await fs.promises.readFile(this.path,"utf-8");
      return JSON.parse(carts);
    } catch (error) {
      console.error("Error reading the file:", error);
      return [];
    }
  }

  async saveFile(carts) {
    try {
      if (fs.existsSync(this.path)) {
        const existingCarts = await this.getFile();
        existingCarts.push(...products);
        await fs.promises.writeFile(this.path, JSON.stringify(existingCarts));
      } else {
        await fs.promises.writeFile(this.path, JSON.stringify( carts));
      }
    } catch (error) {
      console.error("Error saving the file:", error);
    }
  }

  async updateFile(carts) {
    try {
      if (fs.existsSync(this.path)) {
        await fs.promises.writeFile(this.path, JSON.stringify(carts));
      } else {
        await fs.promises.writeFile(this.path, JSON.stringify(carts));
      }
    } catch (error) {
      console.error("Error updating the file:", error);
    }
  }

}

