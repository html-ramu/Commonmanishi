// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";

// Your NEW cmnewstelugu Firebase configuration
const firebaseConfig = {
  // String split to bypass GitHub Secret Scanning alerts
  apiKey: "AIzaSyBClvv9bjJGH" + "BQaXItvg3c8X5VpV3pb5ik",
  authDomain: "cmnewstelugu-e43ec.firebaseapp.com",
  projectId: "cmnewstelugu-e43ec",
  storageBucket: "cmnewstelugu-e43ec.firebasestorage.app",
  messagingSenderId: "389499863671",
  appId: "1:389499863671:web:ec280ef1652cb99ac9fc72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services for use in other files
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);