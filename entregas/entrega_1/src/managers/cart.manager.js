import fs from "fs";

export class CartManager {
  constructor(path) {
    this.carts = [];
    this.path = path;
    this.createFile();
  }

/* -------------------------------- Carritos ------------------------------- */

  async createCart() {
    try {
      const existingCarts = await this.getFile();
      const prevId = Math.max(...existingCarts.map(cart => cart.id), 0);
      const newId = prevId + 1;
  
      const cart = {
        id: newId,
        products: []
      };
  
      this.carts.push(cart); 
      await this.saveFile(this.carts); 
      console.log("Detalle de carrito agregado:", cart);
      return cart;

    } catch (error) {
      console.log("Error al al agregar el carrito");
    }
    
  }

  async getCarts() {
    try {
      if (fs.existsSync(this.path)) {
        const carts = await this.getFile();
        console.log("Cantidad de carritos:", carts.length);
        return carts;
      } else{
        console.log("No existe una lista de carritos")
        return [];
      }
    } catch (error) {
      console.log("No existe una lista de carritos")
      return [];
    }

  }

  async getCartById(id) {
    try {
      const carts = await this.getFile();
      const cartId = carts.find((cart) => cart.id === id);
      
      if (cartId) {
        console.log("Detalle del ID solicitado", cartId);
        return cartId;
      } else {
        console.error("No se encuentra el carrito con ese ID");
      }
    } catch (error) {
      console.error("Error al obtener el carrito por ID", error);
    }
  }


  async addProductToCart(cartId, productId, quantity) {
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
        console.error('No se encontró el carrito con ese ID');
      }
    } catch (error) {
      console.error('Error al agregar producto al carrito', error);
    }
  }
  
    
  
/* ------------------------------- Archivo JSON ------------------------------ */

  async createFile() {
    if (!fs.existsSync(this.path)) {
      await fs.promises.writeFile(this.path, JSON.stringify([]));
    }
  }

  async getFile(){
    try {
      const products = await fs.promises.readFile(this.path,"utf-8");
      return JSON.parse(products);
    } catch (error) {
      console.error(error);
    }
  }

  async saveFile(carts) {
    try {
      if (fs.existsSync(this.path)) {
        const existingCarts= await this.getFile();
        existingCarts.push(...carts);
        await fs.promises.writeFile(this.path, JSON.stringify(existingCarts));
      } else {
        await fs.promises.writeFile(this.path, JSON.stringify(carts));
      }
    } catch (error) {
      console.error(error);
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
      console.error(error);
    }
  }
  
  

}

