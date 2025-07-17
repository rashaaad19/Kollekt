// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "iti-firebase-c86d2.firebaseapp.com",
  projectId: "iti-firebase-c86d2",
  storageBucket: "iti-firebase-c86d2.firebasestorage.app",
  messagingSenderId: "433185019634",
  appId: "1:433185019634:web:11b185b99ba469e1fbe26b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);

