// TrekMate JavaScript functionality

document.addEventListener('DOMContentLoaded', function () {

    // Search functionality
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.btn-search');

    if (searchButton) {
        searchButton.addEventListener('click', function (e) {
            e.preventDefault();

            const searchTerm = searchInput.value;
            const location = document.querySelectorAll('.form-input')[0]?.value || '';
            const region = document.querySelectorAll('.form-input')[1]?.value || '';
            const date = document.querySelectorAll('.form-input')[2]?.value || '';

            if (!searchTerm.trim()) {
                alert('Please enter a search term');
                return;
            }

            console.log('Search params:', { search: searchTerm, location, region, date });
            alert(`Searching for "${searchTerm}" in ${location || 'all locations'}...`);
        });
    }

    // Handle "Join This Trek" buttons
    const adventureCards = document.querySelectorAll('.adventure-card');

    adventureCards.forEach(card => {
        const joinButton = card.querySelector('.btn-secondary');

        if (joinButton) {
            joinButton.addEventListener('click', function () {
                const adventureTitleEl = card.querySelector('.adventure-title');
                const adventureTitle = adventureTitleEl ? adventureTitleEl.textContent.trim() : '';

                if (adventureTitle) {
                    const url = `join-trek.html?title=${encodeURIComponent(adventureTitle)}`;
                    console.log(`Navigating to: ${url}`);
                    window.location.href = url;
                } else {
                    alert('Trek title not found.');
                }
            });
        }
    });
    // Handle "Join This Group" buttons
    const groupCards = document.querySelectorAll('.group-card');

    groupCards.forEach(card => {
        const joinButton = card.querySelector('.btn-secondary');

        if (joinButton) {
            joinButton.addEventListener('click', function () {
                const groupTitleEl = card.querySelector('.group-title');
                const groupTitle = groupTitleEl ? groupTitleEl.textContent.trim() : '';

                if (groupTitle) {
                    const url = `groupinfo.html?title=${encodeURIComponent(groupTitle)}`;
                    console.log(`Navigating to: ${url}`);
                    window.location.href = url;
                } else {
                    alert('Group title not found.');
                }
            });
        }
    });

    // Header button navigation
    const loginButton = document.querySelector('.btn-ghost');
    const joinButton = document.querySelector('.header-buttons .btn-primary');

    if (loginButton) {
        loginButton.addEventListener('click', function () {
            window.location.href = 'login.html';
        });
    }

    if (joinButton) {
        joinButton.addEventListener('click', function () {
            window.location.href = 'signup.html';
        });
    }

    // Smooth scrolling for anchors
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Reveal animations with IntersectionObserver
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    const animatedElements = document.querySelectorAll('.stat-card, .adventure-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Utility functions
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// export { formatDate, validateEmail, debounce }; // If using modules
