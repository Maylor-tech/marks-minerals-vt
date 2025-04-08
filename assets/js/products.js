document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const filterSelects = document.querySelectorAll('.filter-select');
    const galleryGrid = document.querySelector('.gallery-grid');
    const loadMoreBtn = document.querySelector('.load-more button');
    const modal = document.getElementById('specimen-modal');
    const modalClose = modal.querySelector('.modal-close');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalOrigin = document.getElementById('modal-origin');
    const modalType = document.getElementById('modal-type');
    const modalSize = document.getElementById('modal-size');

    // Filter functionality
    filterSelects.forEach(select => {
        select.addEventListener('change', updateGallery);
    });

    function updateGallery() {
        const mineralType = document.getElementById('mineral-type').value;
        const origin = document.getElementById('origin').value;
        const color = document.getElementById('color').value;
        const sort = document.getElementById('sort').value;

        // Get all specimen cards
        const specimens = document.querySelectorAll('.specimen-card');

        specimens.forEach(specimen => {
            const type = specimen.dataset.type;
            const specimenOrigin = specimen.dataset.origin;
            const specimenColor = specimen.dataset.color;

            const typeMatch = mineralType === 'all' || type === mineralType;
            const originMatch = origin === 'all' || specimenOrigin === origin;
            const colorMatch = color === 'all' || specimenColor === color;

            if (typeMatch && originMatch && colorMatch) {
                specimen.style.display = '';
            } else {
                specimen.style.display = 'none';
            }
        });

        // Sort specimens
        const specimenArray = Array.from(specimens);
        specimenArray.sort((a, b) => {
            switch(sort) {
                case 'name-asc':
                    return a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent);
                case 'name-desc':
                    return b.querySelector('h3').textContent.localeCompare(a.querySelector('h3').textContent);
                case 'new':
                    return b.dataset.date.localeCompare(a.dataset.date);
                default: // 'featured'
                    return b.classList.contains('featured') ? 1 : -1;
            }
        });

        // Reorder specimens in the DOM
        specimenArray.forEach(specimen => {
            galleryGrid.appendChild(specimen);
        });
    }

    // Modal functionality
    const viewButtons = document.querySelectorAll('.view-details');
    viewButtons.forEach(button => {
        button.addEventListener('click', openModal);
    });

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    function openModal(e) {
        const card = e.currentTarget.closest('.specimen-card');
        const image = card.querySelector('img');
        const title = card.querySelector('h3');
        const description = card.querySelector('p');
        const meta = card.querySelectorAll('.specimen-meta span');

        modalImage.src = image.src;
        modalImage.alt = image.alt;
        modalTitle.textContent = title.textContent;
        modalDescription.textContent = description.textContent;
        modalOrigin.textContent = meta[0].textContent.replace('location_on', '').trim();
        modalType.textContent = meta[1].textContent.replace('diamond', '').trim();
        modalSize.textContent = card.dataset.size || 'Various sizes available';

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Load more functionality
    let currentPage = 1;
    const itemsPerPage = 8;

    loadMoreBtn.addEventListener('click', loadMoreSpecimens);

    function loadMoreSpecimens() {
        currentPage++;
        // Here you would typically fetch more specimens from the server
        // For now, we'll just hide the button as we don't have more specimens
        loadMoreBtn.style.display = 'none';
    }

    // Keyboard navigation for modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}); 