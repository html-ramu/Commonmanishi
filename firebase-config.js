// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";

// Your live Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgJr9SKEDNuVfaQGGSuwAQFBa-0B4g2uw",
  authDomain: "commonmanishi-ad783.firebaseapp.com",
  projectId: "commonmanishi-ad783",
  storageBucket: "commonmanishi-ad783.firebasestorage.app",
  messagingSenderId: "195170767590",
  appId: "1:195170767590:web:d2ab10dbef68172465e127"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services for use in other files
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);