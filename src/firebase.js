// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLyRd43UPHTFIDkOnWQ0qIpGqjftg_mGI",
  authDomain: "tesla-clone-c8354.firebaseapp.com",
  projectId: "tesla-clone-c8354",
  storageBucket: "tesla-clone-c8354.appspot.com",
  messagingSenderId: "99038445431",
  appId: "1:99038445431:web:48e463e5a2c9627b642b72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { auth }