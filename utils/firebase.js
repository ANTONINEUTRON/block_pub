// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDG-4AhGz3qPAzr0CykT1_ftmCe_aOtikk",
  authDomain: "blockpub-1de23.firebaseapp.com",
  projectId: "blockpub-1de23",
  storageBucket: "blockpub-1de23.appspot.com",
  messagingSenderId: "573826027025",
  appId: "1:573826027025:web:8cb19bda6c56186bfaabb0",
  measurementId: "G-H623LKB994"
};

// Initialize Firebase
export const appFirebaseInstance = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);