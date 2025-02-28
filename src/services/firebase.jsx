import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";  // Agregamos la autenticación


    const firebaseConfig = {
        apiKey: "AIzaSyD0cv_Fr3AXtrQwpmvsukH25SHALjlInBw",
        authDomain: "zafira-app.firebaseapp.com",
        projectId: "zafira-app",
        storageBucket: "zafira-app.firebasestorage.app",
        messagingSenderId: "1000116783235",
        appId: "1:1000116783235:web:5d7e05fd62f096951eb3b6"
      };

// Inicializa Firebase con la configuración
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(app);

// Inicializa Firebase Authentication
const auth = getAuth(app);  // Asegúrate de exportarlo correctamente

// Exporta tanto Firestore como Auth para usarlos en otras partes de tu aplicación
export { db, auth };
