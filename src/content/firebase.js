// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCc2-9EUKb2q0epmkkKa_xeylGCjbF2ZxE",
  authDomain: "fimfiction-bookclub.firebaseapp.com",
  projectId: "fimfiction-bookclub",
  storageBucket: "fimfiction-bookclub.appspot.com",
  messagingSenderId: "709246955360",
  appId: "1:709246955360:web:85987366c1bd2517b07805",
  measurementId: "G-ZMDH857L0L"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);