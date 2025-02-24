import products from "../data/products";


// Simula un fetch de todos los productos
export const getProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 5); // Simula un retraso de carga
  });
};

// Simula un fetch de un producto por ID
export const getProductById = (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = products.find((prod) => prod.id.toString() === id.toString()); // Comparación segura
        if (product) {
          resolve(product);
        } else {
          reject("Producto no encontrado");
        }
      }, 500);
    });
  };
  
  
