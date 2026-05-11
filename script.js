// Sample Telugu News Data
const newsData = [
    {
        id: 1,
        title: "రాష్ట్రంలో భారీ వర్షాలు, అప్రమత్తమైన అధికారులు",
        desc: "రాబోయే రెండు రోజుల్లో పలు జిల్లాల్లో భారీ నుంచి అతి భారీ వర్షాలు కురిసే అవకాశం ఉందని వాతావరణ శాఖ హెచ్చరించింది.",
        category: "లేటెస్ట్",
        image: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&q=80&w=800",
        date: "11 May, 2026"
    },
    {
        id: 2,
        title: "పార్లమెంట్ ఎన్నికల షెడ్యూల్ విడుదల",
        desc: "కేంద్ర ఎన్నికల సంఘం తాజా షెడ్యూల్‌ను ప్రకటించింది. దేశవ్యాప్తంగా ఏడు దశల్లో పోలింగ్ జరగనుంది.",
        category: "జాతీయం",
        image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&q=80&w=800",
        date: "10 May, 2026"
    },
    {
        id: 3,
        title: "అమెరికాలో కొత్త వీసా నిబంధనలు",
        desc: "హెచ్-1బీ వీసా నిబంధనల్లో కీలక మార్పులు చేస్తూ అమెరికా ప్రభుత్వం నిర్ణయం తీసుకుంది.",
        category: "అంతర్జాతీయం",
        image: "https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&q=80&w=800",
        date: "09 May, 2026"
    },
    {
        id: 4,
        title: "స్థానిక సంస్థల ఎన్నికల పై హైకోర్టు కీలక తీర్పు",
        desc: "ఎన్నికల నిర్వహణకు సంబంధించి దాఖలైన పిటిషన్లపై కోర్టు విచారణ చేపట్టింది.",
        category: "రాజకీయాలు",
        image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800",
        date: "08 May, 2026"
    },
    {
        id: 5,
        title: "ఆరోగ్యానికి యోగా ఎంత అవసరమో తెలుసా?",
        desc: "ప్రతిరోజూ ఉదయం యోగా చేయడం వల్ల మానసిక, శారీరక ఒత్తిడి ఎలా తగ్గుతుందో నిపుణులు వివరిస్తున్నారు.",
        category: "ఆరోగ్యం",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800",
        date: "07 May, 2026"
    },
    {
        id: 6,
        title: "వరల్డ్ కప్ సన్నాహకాల్లో భారత జట్టు",
        desc: "వచ్చే నెలలో జరగనున్న టోర్నీ కోసం ఆటగాళ్లు ముమ్మరంగా ప్రాక్టీస్ చేస్తున్నారు.",
        category: "ఆటలు",
        image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800",
        date: "06 May, 2026"
    }
];

// DOM Elements
const newsContainer = document.getElementById('news-container');
const navItems = document.querySelectorAll('.nav-item');
const searchToggle = document.getElementById('search-toggle');
const searchContainer = document.getElementById('search-container');
const searchInput = document.getElementById('search-input');
const scrollTopBtn = document.getElementById('scroll-top');
const loader = document.getElementById('loader');

// Render News Cards
function renderNews(data) {
    newsContainer.innerHTML = '';
    
    if (data.length === 0) {
        newsContainer.innerHTML = '<p style="text-align:center; grid-column: 1/-1;">ఎలాంటి వార్తలు కనుగొనబడలేదు.</p>';
        return;
    }

    data.forEach(news => {
        const card = document.createElement('article');
        card.className = 'news-card';
        card.innerHTML = `
            <div class="card-img-wrapper">
                <img src="${news.image}" alt="${news.title}" loading="lazy">
            </div>
            <div class="card-content">
                <span class="card-date">${news.date} • ${news.category}</span>
                <h2 class="card-title">${news.title}</h2>
                <p class="card-desc">${news.desc}</p>
                <div class="card-footer">
                    <a href="#" class="btn-read">Read More</a>
                    <button class="btn-share" aria-label="Share">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                    </button>
                </div>
            </div>
        `;
        newsContainer.appendChild(card);
    });
}

// Category Filtering
navItems.forEach(item => {
    item.addEventListener('click', () => {
        // Handle Active Class
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');

        // Filter Data
        const category = item.getAttribute('data-category');
        if (category === 'home') {
            renderNews(newsData);
        } else {
            const filtered = newsData.filter(news => news.category === category);
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
    const filtered = newsData.filter(news => 
        news.title.toLowerCase().includes(term) || 
        news.desc.toLowerCase().includes(term)
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

// Initialize App
window.addEventListener('load', () => {
    // Simulate loading time
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 500);
        renderNews(newsData);
    }, 800);
});