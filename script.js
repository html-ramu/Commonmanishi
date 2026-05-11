// script.js
import { db } from './firebase-config.js';
import { collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// DOM Elements
const newsContainer = document.getElementById('news-container');
const navItems = document.querySelectorAll('.nav-item');
const searchToggle = document.getElementById('search-toggle');
const searchContainer = document.getElementById('search-container');
const searchInput = document.getElementById('search-input');
const scrollTopBtn = document.getElementById('scroll-top');
const loader = document.getElementById('loader');

// Store fetched data locally for quick category filtering
let allNewsData = []; 

// Fetch news dynamically from Firebase
async function fetchNews() {
    try {
        const q = query(collection(db, "news"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        
        allNewsData = [];
        querySnapshot.forEach((doc) => {
            allNewsData.push({ id: doc.id, ...doc.data() });
        });
        
        renderNews(allNewsData);
    } catch (error) {
        console.error("Error fetching news:", error);
        newsContainer.innerHTML = '<p style="text-align:center; grid-column: 1/-1; color: red;">వార్తలను లోడ్ చేయడంలో లోపం ఏర్పడింది.</p>';
    } finally {
        // Hide Loader
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 500);
        }, 500);
    }
}

// Render News Cards
function renderNews(data) {
    newsContainer.innerHTML = '';
    
    if (data.length === 0) {
        newsContainer.innerHTML = '<p style="text-align:center; grid-column: 1/-1;">ఎలాంటి వార్తలు కనుగొనబడలేదు.</p>';
        return;
    }

    data.forEach(news => {
        // Create Breaking News Badge if true
        const breakingBadge = news.breakingNews ? `<span style="position: absolute; top: 10px; left: 10px; background: red; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; z-index: 10;">Breaking</span>` : '';

        const card = document.createElement('article');
        card.className = 'news-card';
        card.innerHTML = `
            <div class="card-img-wrapper">
                ${breakingBadge}
                <img src="${news.imageUrl}" alt="${news.title}" loading="lazy">
            </div>
            <div class="card-content">
                <span class="card-date">${news.dateString || ''} • ${news.category}</span>
                <h2 class="card-title">${news.title}</h2>
                <p class="card-desc">${news.shortDescription}</p>
                <div class="card-footer">
                    <a href="news.html?id=${news.id}" class="btn-read">Read More</a>
                    <button class="btn-share" aria-label="Share">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                    </button>
                </div>
            </div>
        `;
        newsContainer.appendChild(card);
    });
}

// Category Filtering logic 
navItems.forEach(item => {
    item.addEventListener('click', () => {
        // Handle Active Class
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');

        // Filter Data using the globally stored array
        const category = item.getAttribute('data-category');
        if (category === 'home') {
            renderNews(allNewsData);
        } else {
            const filtered = allNewsData.filter(news => news.category === category);
            renderNews(filtered);
        }
    });
});

// Search Functionality
searchToggle.addEventListener('click', () => {
    searchContainer.classList.toggle('hidden');
    if (!searchContainer.classList.contains('hidden')) {
        searchInput.focus();
    }
});

searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = allNewsData.filter(news => 
        news.title.toLowerCase().includes(term) || 
        news.shortDescription.toLowerCase().includes(term)
    );
    renderNews(filtered);
});

// Scroll to Top Logic
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.remove('hidden');
    } else {
        scrollTopBtn.classList.add('hidden');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Initialize App: Fetch news instead of using static array
window.addEventListener('load', fetchNews);