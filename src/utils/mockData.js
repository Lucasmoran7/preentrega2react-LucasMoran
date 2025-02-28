import { db } from "./firebase"; // Asegúrate de importar la configuración de Firebase
import { collection, getDocs } from "firebase/firestore";

// Función para obtener todos los productos desde Firestore
export const getProducts = async () => {
  try {
    const productsCollection = collection(db, "products");  // "products" es la colección en Firestore
    const snapshot = await getDocs(productsCollection);
    const productList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return productList;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw new Error("No se pudieron obtener los productos");
  }
};
