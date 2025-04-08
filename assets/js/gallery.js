document.addEventListener('DOMContentLoaded', () => {
    // Gallery functionality
    const mineralItems = document.querySelectorAll('.mineral-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.getElementById('lightbox-content');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const lightboxZoomIn = document.getElementById('lightbox-zoom-in');
    const lightboxZoomOut = document.getElementById('lightbox-zoom-out');
    const lightboxRotate = document.getElementById('lightbox-rotate');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    let currentIndex = 0;
    let zoomLevel = 1;
    let rotationAngle = 0;
    let is360View = false;
    let current360Images = [];
    let current360Index = 0;
    
    // Initialize gallery
    function initGallery() {
        // Add click event to all mineral items
        mineralItems.forEach((item, index) => {
            const imageContainer = item.querySelector('.mineral-image-container');
            const detailsButton = item.querySelector('.btn-details');
            
            // Open lightbox when clicking on the image
            imageContainer.addEventListener('click', () => {
                openLightbox(index);
            });
            
            // Open lightbox when clicking on the details button
            detailsButton.addEventListener('click', () => {
                openLightbox(index);
            });
        });
        
        // Close lightbox when clicking on the close button
        lightboxClose.addEventListener('click', closeLightbox);
        
        // Close lightbox when clicking outside the content
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Navigate to previous image
        lightboxPrev.addEventListener('click', () => {
            navigateLightbox('prev');
        });
        
        // Navigate to next image
        lightboxNext.addEventListener('click', () => {
            navigateLightbox('next');
        });
        
        // Zoom in
        lightboxZoomIn.addEventListener('click', () => {
            zoomLevel = Math.min(zoomLevel + 0.5, 3);
            updateLightboxImage();
        });
        
        // Zoom out
        lightboxZoomOut.addEventListener('click', () => {
            zoomLevel = Math.max(zoomLevel - 0.5, 0.5);
            updateLightboxImage();
        });
        
        // Toggle 360-degree rotation
        lightboxRotate.addEventListener('click', toggle360View);
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (lightbox.classList.contains('active')) {
                if (e.key === 'Escape') {
                    closeLightbox();
                } else if (e.key === 'ArrowLeft') {
                    navigateLightbox('prev');
                } else if (e.key === 'ArrowRight') {
                    navigateLightbox('next');
                } else if (e.key === '+') {
                    zoomLevel = Math.min(zoomLevel + 0.5, 3);
                    updateLightboxImage();
                } else if (e.key === '-') {
                    zoomLevel = Math.max(zoomLevel - 0.5, 0.5);
                    updateLightboxImage();
                } else if (e.key === 'r') {
                    toggle360View();
                }
            }
        });
    }
    
    // Open lightbox
    function openLightbox(index) {
        currentIndex = index;
        const item = mineralItems[index];
        const img = item.querySelector('img');
        const title = item.querySelector('h3').textContent;
        const description = item.querySelector('.mineral-description').textContent;
        
        // Check if this item has 360-degree images
        const has360View = item.hasAttribute('data-360-images');
        if (has360View) {
            const imagesJson = item.getAttribute('data-360-images');
            current360Images = JSON.parse(imagesJson);
            current360Index = 0;
            is360View = false;
            lightboxRotate.classList.add('has-360');
        } else {
            lightboxRotate.classList.remove('has-360');
        }
        
        // Reset zoom and rotation
        zoomLevel = 1;
        rotationAngle = 0;
        
        // Update lightbox content
        lightboxImage.src = img.getAttribute('data-src');
        lightboxCaption.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
        
        // Show lightbox
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset zoom and rotation
        zoomLevel = 1;
        rotationAngle = 0;
        is360View = false;
        updateLightboxImage();
    }
    
    // Navigate lightbox
    function navigateLightbox(direction) {
        if (direction === 'prev') {
            currentIndex = (currentIndex - 1 + mineralItems.length) % mineralItems.length;
        } else {
            currentIndex = (currentIndex + 1) % mineralItems.length;
        }
        
        const item = mineralItems[currentIndex];
        const img = item.querySelector('img');
        const title = item.querySelector('h3').textContent;
        const description = item.querySelector('.mineral-description').textContent;
        
        // Check if this item has 360-degree images
        const has360View = item.hasAttribute('data-360-images');
        if (has360View) {
            const imagesJson = item.getAttribute('data-360-images');
            current360Images = JSON.parse(imagesJson);
            current360Index = 0;
            is360View = false;
            lightboxRotate.classList.add('has-360');
        } else {
            lightboxRotate.classList.remove('has-360');
        }
        
        // Reset zoom and rotation
        zoomLevel = 1;
        rotationAngle = 0;
        
        // Update lightbox content
        lightboxImage.src = img.getAttribute('data-src');
        lightboxCaption.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
        
        // Update lightbox image
        updateLightboxImage();
    }
    
    // Toggle 360-degree view
    function toggle360View() {
        if (!lightboxRotate.classList.contains('has-360')) {
            return;
        }
        
        is360View = !is360View;
        
        if (is360View) {
            // Start 360-degree view
            lightboxImage.src = current360Images[current360Index];
            start360Rotation();
        } else {
            // Return to normal view
            const item = mineralItems[currentIndex];
            const img = item.querySelector('img');
            lightboxImage.src = img.getAttribute('data-src');
            stop360Rotation();
        }
        
        updateLightboxImage();
    }
    
    // Start 360-degree rotation
    function start360Rotation() {
        if (window.rotationInterval) {
            clearInterval(window.rotationInterval);
        }
        
        window.rotationInterval = setInterval(() => {
            current360Index = (current360Index + 1) % current360Images.length;
            lightboxImage.src = current360Images[current360Index];
        }, 100);
    }
    
    // Stop 360-degree rotation
    function stop360Rotation() {
        if (window.rotationInterval) {
            clearInterval(window.rotationInterval);
            window.rotationInterval = null;
        }
    }
    
    // Update lightbox image with current zoom and rotation
    function updateLightboxImage() {
        lightboxImage.style.transform = `scale(${zoomLevel}) rotate(${rotationAngle}deg)`;
    }
    
    // Initialize gallery when DOM is loaded
    initGallery();
    
    // Filter functionality
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const locationFilter = document.getElementById('location-filter');
    const characteristicFilter = document.getElementById('characteristic-filter');
    
    function filterItems() {
        const selectedCategory = categoryFilter.value;
        const selectedPrice = priceFilter.value;
        const selectedLocation = locationFilter.value;
        const selectedCharacteristic = characteristicFilter.value;
        
        mineralItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            const itemPrice = item.getAttribute('data-price');
            const itemLocation = item.getAttribute('data-location');
            const itemCharacteristics = item.getAttribute('data-characteristics') ? 
                item.getAttribute('data-characteristics').split(',') : [];
            
            const categoryMatch = selectedCategory === 'all' || itemCategory === selectedCategory;
            const priceMatch = selectedPrice === 'all' || itemPrice === selectedPrice;
            const locationMatch = selectedLocation === 'all' || itemLocation === selectedLocation;
            const characteristicMatch = selectedCharacteristic === 'all' || 
                itemCharacteristics.includes(selectedCharacteristic);
            
            if (categoryMatch && priceMatch && locationMatch && characteristicMatch) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    // Add event listeners to filters
    if (categoryFilter && priceFilter && locationFilter && characteristicFilter) {
        categoryFilter.addEventListener('change', filterItems);
        priceFilter.addEventListener('change', filterItems);
        locationFilter.addEventListener('change', filterItems);
        characteristicFilter.addEventListener('change', filterItems);
    }
}); 