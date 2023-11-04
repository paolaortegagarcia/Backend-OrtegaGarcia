import fs from "fs";
import { uuid } from "uuidv4";

export class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
    this.createFile();
  }

/* -------------------------------- Productos ------------------------------- */

  async createProduct(obj) {
    try {
      const product = {
        id: uuid(),
        status: "true",
        ...obj
      };
  
      this.products.push(product); 
      await this.saveFile(this.products); 
      console.log("New product added, details:", product);
      return product;

    } catch (error) {
      console.log("Error adding the product:", error);
    }
    
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const products = await this.getFile();
        console.log("Number of products:", products.length);
        return products;
      } else{
        console.log("No product list found")
        return [];
      }
    } catch (error) {
      console.log("Error getting the products:", error)
      return [];
    }

  }

  async getProductsById(id) {
    try {
      const products = await this.getFile();
      const productId = products.find((product) => product.id === id);
      
      if (productId) {
        console.log("Requested ID details:", productId);
        return productId;
      } else {
        console.error("Product with that ID not found");
      }
    } catch (error) {
      console.error("Error getting the product by ID:", error);
    }
  }

  async updateProduct(id, updatedFields) {
    try {
      if (!id) {
        console.log("The 'ID' field is required");
        return;
      }
  
      const products = await this.getFile();
      const productIndex = products.findIndex((product) => product.id === id);
  
      if (productIndex === -1) {
        console.log("Product with that ID not found");
        return;
      }
  
      products[productIndex] = { ...products[productIndex], ...updatedFields };
  
      await this.updateFile(products);
      console.log("Product updated successfully:", products[productIndex]);
      return products[productIndex];
    } catch (error) {
      console.error("Error updating the product:", error);
    }
  }

  async deleteProduct(id) {
    try {
      if (!id) {
        console.log("The 'ID' field is required");
        return;
      }
  
      const products = await this.getFile();
      const productIndex = products.findIndex((product) => product.id === id);
  
      if (productIndex === -1) {
        console.log("Product with that ID not found");
        return;
      }
  
      products.splice(productIndex, 1);
  
      await this.updateFile(products);
      console.log("Producto deleted successfully");
    } catch (error) {
      console.error("Error deleting the product:", error);
    }
  }


  async getProductsByLimit(limit){
    try {
        const products = await this.getFile();
        if(!limit || limit >= products.length) return products;
        else return products.slice(0, limit);
    } catch (error) {
        console.log("Error getting the products by limit", error);
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
      const products = await fs.promises.readFile(this.path,"utf-8");
      return JSON.parse(products);
    } catch (error) {
      console.error("Error reading the file:", error);
      return [];
    }
  }

  async saveFile(products) {
    try {
      if (fs.existsSync(this.path)) {
        const existingProducts = await this.getFile();
        existingProducts.push(...products);
        await fs.promises.writeFile(this.path, JSON.stringify(existingProducts));
      } else {
        await fs.promises.writeFile(this.path, JSON.stringify(products));
      }
    } catch (error) {
      console.error("Error saving the file:", error);
    }
  }

  async updateFile(products) {
    try {
      if (fs.existsSync(this.path)) {
        await fs.promises.writeFile(this.path, JSON.stringify(products));
      } else {
        await fs.promises.writeFile(this.path, JSON.stringify(products));
      }
    } catch (error) {
      console.error("Error updating the file:", error);
    }
  }

}
