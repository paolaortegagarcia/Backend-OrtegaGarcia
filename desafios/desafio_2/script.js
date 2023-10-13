const fs = require("fs");

class ProductManager {
  constructor() {
    this.products = [];
    this.path = "./productos.json"
    this.createFile();
  }

/* -------------------------------- PRODUCTOS ------------------------------- */

  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.log("Todos los campos son obligatorios");
        return;
      }
  
      //ID incrementable que no se repite
      const existingProducts = await this.getFile();
      const prevId = Math.max(...existingProducts.map(product => product.id), 0);
      const newId = prevId + 1;
  
      const product = {
        id: newId,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
  
      this.products.push(product); 

      await this.saveFile(this.products); 

      console.log("Detalle de producto agregado:", product);
      return product;

    } catch (error) {
      console.log("Error al al agregar el producto");
    }
    
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const products = await this.getFile();
        console.log("Cantidad de productos:", products.length);
        return products;
      } else{
        console.log("No existe una lista de productos")
        return [];
      }
    } catch (error) {
      console.log("No existe una lista de productos")
      return [];
    }

  }

  async getProductsById(id) {
    try {
      const products = await this.getFile();
      const productId = products.find((product) => product.id === id);
      
      if (productId) {
        console.log("Detalle del ID solicitado", productId);
        return productId;
      } else {
        console.error("No se encuentra el producto con ese ID");
      }
    } catch (error) {
      console.error("Error al obtener el producto por ID", error);
    }
  }

  async updateProduct(id, updatedFields) {
    try {
      if (!id) {
        console.log("El campo 'ID' es obligatorio.");
        return;
      }
  
      const products = await this.getFile();
      const productIndex = products.findIndex((product) => product.id === id);
  
      if (productIndex === -1) {
        console.log("No se encuentra el producto con ese ID");
        return;
      }
  
      products[productIndex] = { ...products[productIndex], ...updatedFields };
  
      await this.updateFile(products);
      console.log("Producto actualizado con éxito:", products[productIndex]);
      return products[productIndex];
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  }

  async deleteProduct(id) {
    try {
      if (!id) {
        console.log("El campo 'ID' es obligatorio.");
        return;
      }
  
      const products = await this.getFile();
      const productIndex = products.findIndex((product) => product.id === id);
  
      if (productIndex === -1) {
        console.log("No se encuentra el producto con ese ID");
        return;
      }
  
      products.splice(productIndex, 1);
  
      await this.updateFile(products);
      console.log("Producto eliminado con éxito.");
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  }
  
/* ------------------------------- ARCHIVO JSON ------------------------------ */

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
      console.error(error);
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
      console.error(error);
    }
  }
  
  

}


/* --------------------------------- TESTING -------------------------------- */

async function test() {

  // Creando una instancia
  const productManager = new ProductManager();

  // traer productos
  //const productList = await productManager.getProducts();
  //console.log(productList); // lista de productos

  // agregar producto
  //await productManager.addProduct("producto prueba", "este es un producto prueba", 200,"sin imagen", "abc123", 25 ); 

  // buscar producto por ID
  //await productManager.getProductsById(1);

  // actualizar producto
  //await productManager.updateProduct(1, {description: "hago un cambio"});

  // Eliminar producto
  await productManager.deleteProduct(1);

}


test();

