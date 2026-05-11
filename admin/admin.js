import { auth, db, storage } from '../firebase-config.js';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";

// --- AUTHENTICATION LOGIC ---
const currentPage = window.location.pathname;

onAuthStateChanged(auth, (user) => {
    if (user && currentPage.includes('login.html')) {
        window.location.href = 'index.html'; // Redirect to dash if logged in
    } else if (!user && !currentPage.includes('login.html')) {
        window.location.href = 'login.html'; // Kick out if not logged in
    }
});

// Login Form
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        try {
            await signInWithEmailAndPassword(auth, email, password);
            window.location.href = 'index.html';
        } catch (error) {
            document.getElementById('error-msg').innerText = "Invalid credentials!";
            document.getElementById('error-msg').style.display = 'block';
        }
    });
}

// Logout
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => signOut(auth));
}

// --- ADD NEWS LOGIC ---
const addNewsForm = document.getElementById('add-news-form');
if (addNewsForm) {
    addNewsForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const btn = document.getElementById('publish-btn');
        const status = document.getElementById('upload-status');
        btn.disabled = true;
        btn.innerText = "Uploading Image...";

        try {
            // 1. Upload Image to Storage
            const imageFile = document.getElementById('n-image').files[0];
            const imageRef = ref(storage, `news_images/${Date.now()}_${imageFile.name}`);
            await uploadBytes(imageRef, imageFile);
            const imageUrl = await getDownloadURL(imageRef);

            // 2. Save Data to Firestore
            btn.innerText = "Saving Database...";
            await addDoc(collection(db, "news"), {
                title: document.getElementById('n-title').value,
                category: document.getElementById('n-category').value,
                location: document.getElementById('n-location').value,
                shortDescription: document.getElementById('n-short').value,
                fullNews: document.getElementById('n-full').value,
                imageUrl: imageUrl,
                breakingNews: document.getElementById('n-breaking').checked,
                createdAt: serverTimestamp(),
                dateString: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
            });

            status.style.color = "green";
            status.innerText = "News Published Successfully!";
            addNewsForm.reset();
        } catch (error) {
            console.error(error);
            status.style.color = "red";
            status.innerText = "Error publishing news: " + error.message;
        } finally {
            btn.disabled = false;
            btn.innerText = "Publish News";
        }
    });
}