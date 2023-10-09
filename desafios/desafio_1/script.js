class ProductManager {
  static id = 1;
  static codes = [];  

  constructor() {
    this.productos = [];
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.warn("Todos los campos son obligatorios");
      return;
    }

    if (ProductManager.codes.includes(code)){
      console.error("El campo 'code' está repetido");
      return;
    }

    const producto = {
      id: ProductManager.id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.productos.push(producto);
    ProductManager.codes.push(code);
    ProductManager.id++;
    console.log("Detalle de producto agregado:", producto);
  }

  getProducts() {
    return console.log("Lista de productos:", this.productos);
  }

  getProductsById(id) {
    const productoId = this.productos.find((producto) => producto.id === id);
    
    if(productoId) {
      console.log("Detalle del ID solicitado", productoId);
    } else {
      console.error("No se encuentra el producto con ese ID");
    }
  }

}


/* ------------------------------------ Creación de Instancia ----------------------------------- */

const productManager = new ProductManager();

/* ---------------------------- Agregar Productos --------------------------- */

/* correcto */
productManager.addProduct("producto prueba", "este es un producto prueba", 200,"sin imagen", "abc123", 25 );
productManager.addProduct("producto prueba 2", "este es un producto prueba 2", 300,"sin imagen", "abc124", 20 );

/* sin algun valor */
productManager.addProduct("producto prueba", "este es un producto prueba", 200,"sin imagen");

/* code repetido*/
productManager.addProduct("producto prueba", "este es un producto prueba", 200,"sin imagen", "abc123", 25 );


/* ---------------------------- Recibir Productos --------------------------- */

productManager.getProducts();

/* ----------------------------- Buscar Producto ---------------------------- */

/* correcto */

productManager.getProductsById(2);

/* no encontrado */

productManager.getProductsById(5);
