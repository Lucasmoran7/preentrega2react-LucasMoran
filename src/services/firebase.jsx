// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0cv_Fr3AXtrQwpmvsukH25SHALjlInBw",
  authDomain: "zafira-app.firebaseapp.com",
  projectId: "zafira-app",
  storageBucket: "zafira-app.firebasestorage.app",
  messagingSenderId: "1000116783235",
  appId: "1:1000116783235:web:5d7e05fd62f096951eb3b6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)