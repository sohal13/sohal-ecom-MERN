
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "bidforsneaks.firebaseapp.com",
  projectId: "bidforsneaks",
  storageBucket: "bidforsneaks.appspot.com",
  messagingSenderId: "915775869073",
  appId: "1:915775869073:web:ec54c1b9495ee2e32def30"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);