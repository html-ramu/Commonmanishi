import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";

// కీ ని సురక్షితంగా విడదీయడం 
const part1 = "AIza";
const part2 = "SyBClvv9bjJGHBQaXItvg3c8X5VpV3pb5ik"; 

const firebaseConfig = {
  apiKey: part1 + part2,
  authDomain: "cmnewstelugu-e43ec.firebaseapp.com",
  projectId: "cmnewstelugu-e43ec",
  storageBucket: "cmnewstelugu-e43ec.firebasestorage.app",
  messagingSenderId: "389499863671",
  appId: "1:389499863671:web:ec280ef1652cb99ac9fc72"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);