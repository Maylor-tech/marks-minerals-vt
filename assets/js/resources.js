// Search Functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('resourceSearch');
    const searchInput = document.getElementById('searchInput');
    const articles = document.querySelectorAll('.blog-card, .category-card');

    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const searchTerm = searchInput.value.toLowerCase();
            const filters = Array.from(searchForm.querySelectorAll('input[name="filter"]:checked'))
                .map(input => input.value);

            articles.forEach(article => {
                const title = article.querySelector('h3').textContent.toLowerCase();
                const content = article.querySelector('p') ? 
                    article.querySelector('p').textContent.toLowerCase() : '';
                const category = article.querySelector('.article-category') ?
                    article.querySelector('.article-category').textContent.toLowerCase() : '';

                const matchesSearch = title.includes(searchTerm) || 
                    content.includes(searchTerm) ||
                    category.includes(searchTerm);

                const matchesFilter = filters.length === 0 || 
                    filters.some(filter => category.includes(filter));

                article.style.display = (matchesSearch && matchesFilter) ? 'block' : 'none';
            });
        });

        // Live search functionality
        searchInput.addEventListener('input', () => {
            const event = new Event('submit');
            searchForm.dispatchEvent(event);
        });
    }

    // Clear search
    const clearSearch = () => {
        searchInput.value = '';
        const checkboxes = searchForm.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => checkbox.checked = false);
        articles.forEach(article => article.style.display = 'block');
    };

    // Add clear search button functionality if needed
});

// Social Sharing
const shareButtons = document.querySelectorAll('.share-btn');

shareButtons.forEach(button => {
    button.addEventListener('click', () => {
        const platform = button.dataset.platform;
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);
        const text = encodeURIComponent('Check out this great resource from Mark\'s Minerals!');

        let shareUrl;
        switch (platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                break;
            case 'email':
                shareUrl = `mailto:?subject=${title}&body=${text}%0A%0A${url}`;
                break;
        }

        if (shareUrl) {
            if (platform === 'email') {
                window.location.href = shareUrl;
            } else {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        }
    });
});

// Interactive Features
document.addEventListener('DOMContentLoaded', () => {
    // 3D Crystal Viewer
    const launchViewer = document.querySelector('.launch-viewer');
    if (launchViewer) {
        launchViewer.addEventListener('click', () => {
            // Implementation for 3D viewer
            console.log('Launching 3D Crystal Viewer...');
        });
    }

    // Mineral Quiz
    const startQuiz = document.querySelector('.start-quiz');
    if (startQuiz) {
        startQuiz.addEventListener('click', () => {
            // Implementation for quiz
            console.log('Starting Mineral Quiz...');
        });
    }

    // Property Calculator
    const openCalculator = document.querySelector('.open-calculator');
    if (openCalculator) {
        openCalculator.addEventListener('click', () => {
            // Implementation for calculator
            console.log('Opening Property Calculator...');
        });
    }
});

// Lazy Loading for Images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}); 