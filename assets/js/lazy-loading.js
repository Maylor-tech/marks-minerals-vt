document.addEventListener('DOMContentLoaded', () => {
    // Lazy loading implementation
    const lazyImages = document.querySelectorAll('img.lazy');
    
    // Create an Intersection Observer with better performance settings
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                loadImage(img);
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '100px 0px', // Start loading images 100px before they enter the viewport
        threshold: 0.01 // Trigger when at least 1% of the image is visible
    });
    
    // Function to load the image with better error handling
    function loadImage(img) {
        const src = img.getAttribute('data-src');
        if (!src) return;
        
        // Check if the browser supports WebP
        const supportsWebP = document.createElement('canvas')
            .toDataURL('image/webp')
            .indexOf('data:image/webp') === 0;
        
        // Create a new image to preload
        const tempImage = new Image();
        
        tempImage.onload = function() {
            img.src = src;
            img.classList.remove('lazy');
            img.classList.add('loaded');
            
            // Add fade-in effect
            img.style.opacity = '0';
            requestAnimationFrame(() => {
                img.style.transition = 'opacity 0.3s ease-in-out';
                img.style.opacity = '1';
            });
        };
        
        tempImage.onerror = function() {
            console.error('Failed to load image:', src);
            img.classList.add('load-error');
        };
        
        // Set the source and start loading
        tempImage.src = src;
    }
    
    // Observe all lazy images
    lazyImages.forEach(img => {
        // Set initial styles
        img.style.opacity = '0';
        imageObserver.observe(img);
    });
    
    // Add error handling for failed image loads
    document.addEventListener('error', function(e) {
        if (e.target.tagName.toLowerCase() === 'img') {
            e.target.classList.add('load-error');
        }
    }, true);
    
    // Filter functionality
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const mineralItems = document.querySelectorAll('.mineral-item');
    
    function filterItems() {
        const selectedCategory = categoryFilter.value;
        const selectedPrice = priceFilter.value;
        
        mineralItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            const itemPrice = item.getAttribute('data-price');
            
            const categoryMatch = selectedCategory === 'all' || itemCategory === selectedCategory;
            const priceMatch = selectedPrice === 'all' || itemPrice === selectedPrice;
            
            if (categoryMatch && priceMatch) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    // Add event listeners to filters
    if (categoryFilter && priceFilter) {
        categoryFilter.addEventListener('change', filterItems);
        priceFilter.addEventListener('change', filterItems);
    }
}); 