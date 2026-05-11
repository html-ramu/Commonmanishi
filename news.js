import { db } from './firebase-config.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

async function loadSingleNews() {
    // Get ID from URL: commonmanishi.in/news.html?id=12345
    const urlParams = new URLSearchParams(window.location.search);
    const newsId = urlParams.get('id');

    if (!newsId) {
        window.location.href = 'index.html';
        return;
    }

    const container = document.getElementById('single-article-container');

    try {
        const docRef = doc(db, "news", newsId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const news = docSnap.data();
            container.innerHTML = `
                <div class="article-header">
                    <span class="card-date">${news.dateString} • ${news.category} • ${news.location}</span>
                    <h1 class="article-title">${news.title}</h1>
                </div>
                <div class="article-image">
                    <img src="${news.imageUrl}" alt="News Image">
                </div>
                <div class="article-body">
                    <p>${news.fullNews.replace(/\n/g, '<br>')}</p>
                </div>
            `;
            document.title = `${news.title} | Commonmanishi`;
        } else {
            container.innerHTML = '<h2>Article not found.</h2>';
        }
    } catch (error) {
        console.error(error);
        container.innerHTML = '<h2>Error loading article.</h2>';
    }
}

window.addEventListener('load', loadSingleNews);