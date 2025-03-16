// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDJEfHX1DHTK5qpdkYiFbmyBCIOl_OyNc",
  authDomain: "netflixgpt-167cb.firebaseapp.com",
  projectId: "netflixgpt-167cb",
  storageBucket: "netflixgpt-167cb.firebasestorage.app",
  messagingSenderId: "551387837251",
  appId: "1:551387837251:web:7e52d96a9b8dd98a1cf5f6",
  measurementId: "G-K7YB629HJ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();