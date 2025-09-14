// Media Page Functionality
let mediaData = [];
let filteredMedia = [];
let currentPage = 1;
let itemsPerPage = 12;
let currentFilters = {
    type: 'all',
    category: 'all',
    year: 'all',
    search: ''
};
let currentSort = 'newest';
let currentView = 'grid';

// Initialize media page
function initializeMedia() {
    loadMediaData();
    setupFilters();
    setupViewControls();
    setupSearch();
    setupSort();
    setupPagination();
    renderMedia();
    renderSidebar();
    updateMediaStats();
}

// Load media data
function loadMediaData() {
    mediaData = generateMediaData();
    filteredMedia = [...mediaData];
}

// Generate media data
function generateMediaData() {
    const mediaTypes = ['photo', 'video', 'audio'];
    const categories = ['battles', 'heroes', 'civilians', 'ceremonies', 'artifacts', 'documents'];
    const years = [1971, 1970, 1969, 1952];
    
    const media = [];
    
    // Generate sample media items
    for (let i = 1; i <= 48; i++) {
        const type = mediaTypes[Math.floor(Math.random() * mediaTypes.length)];
        const category = categories[Math.floor(Math.random() * categories.length)];
        const year = years[Math.floor(Math.random() * years.length)];
        
        media.push({
            id: i,
            type: type,
            title: generateMediaTitle(type, category, i),
            description: generateMediaDescription(type, category),
            category: category,
            year: year,
            duration: type === 'photo' ? null : generateDuration(),
            thumbnailUrl: `https://picsum.photos/400/300?random=${i}`,
            mediaUrl: generateMediaUrl(type, i),
            uploadDate: generateUploadDate(),
            views: Math.floor(Math.random() * 10000) + 100,
            downloads: Math.floor(Math.random() * 1000) + 10,
            favorites: Math.floor(Math.random() * 500) + 5,
            tags: generateTags(category, type),
            featured: Math.random() > 0.8,
            uploader: generateUploader(),
            fileSize: generateFileSize(type)
        });
    }
    
    return media;
}

// Generate media title
function generateMediaTitle(type, category, index) {
    const titles = {
        photo: {
            battles: [`Battle of ${['Jessore', 'Comilla', 'Sylhet', 'Rangpur'][index % 4]}`, 'Freedom Fighters in Action', 'Guerrilla Warfare Scene', 'Liberation Front'],
            heroes: [`Portrait of ${['Colonel Taher', 'Captain Mohiuddin', 'Major Khaled'][index % 3]}`, 'War Hero Medal Ceremony', 'Freedom Fighter Group', 'Martyred Hero Memorial'],
            civilians: ['Civilian Evacuation', 'Refugee Camp Life', 'Village Destruction', 'Civilian Support'],
            ceremonies: ['Victory Day Celebration', 'Flag Hoisting Ceremony', 'Independence Parade', 'Memorial Service'],
            artifacts: ['Historical Weapon', 'War Document', 'Military Equipment', 'Personal Belongings'],
            documents: ['Official War Document', 'Military Communication', 'Government Order', 'Historical Letter']
        },
        video: {
            battles: ['Battle Footage', 'Combat Documentary', 'Military Operation', 'War Zone Report'],
            heroes: ['Hero Interview', 'Veteran Testimony', 'Commander Speech', 'Memorial Tribute'],
            civilians: ['Civilian Stories', 'Refugee Accounts', 'Village Life', 'Support Activities'],
            ceremonies: ['Victory Ceremony', 'Independence Day', 'Memorial Event', 'Parade Footage'],
            artifacts: ['Artifact Exhibition', 'Museum Tour', 'Collection Overview', 'Historical Display'],
            documents: ['Document Reading', 'Archive Footage', 'Historical Records', 'Official Announcement']
        },
        audio: {
            battles: ['Battle Sound Recording', 'Military Communication', 'Combat Audio', 'War Report'],
            heroes: ['Hero Interview Audio', 'Veteran Testimony', 'Speech Recording', 'Personal Account'],
            civilians: ['Civilian Interview', 'Personal Story', 'Witness Account', 'Family Testimony'],
            ceremonies: ['Ceremony Audio', 'Speech Recording', 'National Anthem', 'Victory Song'],
            artifacts: ['Audio Guide', 'Narration', 'Description', 'Historical Context'],
            documents: ['Document Reading', 'Official Announcement', 'News Report', 'Radio Broadcast']
        }
    };
    
    const typeArray = titles[type][category];
    return typeArray[index % typeArray.length];
}

// Generate media description
function generateMediaDescription(type, category) {
    const descriptions = {
        photo: {
            battles: 'Historical photograph capturing a significant moment during the Liberation War battles.',
            heroes: 'Portrait and tribute to the brave freedom fighters who sacrificed for independence.',
            civilians: 'Documentation of civilian life and experiences during the war period.',
            ceremonies: 'Ceremonial events commemorating independence and honoring heroes.',
            artifacts: 'Historical artifacts and personal belongings from the Liberation War.',
            documents: 'Important historical documents and official papers from 1971.'
        },
        video: {
            battles: 'Video footage documenting military operations and battles during Liberation War.',
            heroes: 'Interview and documentary footage featuring war heroes and veterans.',
            civilians: 'Stories and accounts from civilians who lived through the war.',
            ceremonies: 'Video documentation of victory celebrations and memorial services.',
            artifacts: 'Virtual tour and exhibition of historical artifacts.',
            documents: 'Digital presentation of important historical documents.'
        },
        audio: {
            battles: 'Audio recordings from battle scenes and military communications.',
            heroes: 'Voice recordings of war heroes sharing their experiences.',
            civilians: 'Personal testimonies and stories from civilians.',
            ceremonies: 'Audio from ceremonial events and official announcements.',
            artifacts: 'Audio guide narrations for museum artifacts.',
            documents: 'Recorded readings of historical documents and speeches.'
        }
    };
    
    return descriptions[type][category];
}

// Generate duration for video/audio
function generateDuration() {
    const minutes = Math.floor(Math.random() * 45) + 1;
    const seconds = Math.floor(Math.random() * 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Generate media URL
function generateMediaUrl(type, index) {
    const baseUrls = {
        photo: 'https://picsum.photos/800/600?random=',
        video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_720x480_1mb.mp4',
        audio: 'https://www.soundjay.com/misc/bell-ringing-05.wav'
    };
    
    return baseUrls[type] + index;
}

// Generate upload date
function generateUploadDate() {
    const start = new Date(2020, 0, 1);
    const end = new Date();
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split('T')[0];
}

// Generate tags
function generateTags(category, type) {
    const tagPool = {
        battles: ['liberation war', 'battle', 'military', '1971', 'freedom fighters'],
        heroes: ['heroes', 'freedom fighters', 'martyrs', 'veterans', 'courage'],
        civilians: ['civilians', 'refugees', 'stories', 'testimony', 'witness'],
        ceremonies: ['victory', 'independence', 'celebration', 'memorial', 'parade'],
        artifacts: ['artifacts', 'museum', 'historical', 'collection', 'heritage'],
        documents: ['documents', 'historical', 'official', 'archive', 'records']
    };
    
    const categoryTags = tagPool[category] || [];
    const typeTags = [type, 'bangladesh', 'history'];
    
    return [...categoryTags.slice(0, 3), ...typeTags].slice(0, 5);
}

// Generate uploader name
function generateUploader() {
    const uploaders = [
        'Liberation War Museum',
        'Historical Archive',
        'Bangladesh National Archive',
        'Freedom Fighter Foundation',
        'Heritage Preservation Society',
        'Documentary Center',
        'Cultural Ministry',
        'War Memorial Committee'
    ];
    
    return uploaders[Math.floor(Math.random() * uploaders.length)];
}

// Generate file size
function generateFileSize(type) {
    const sizes = {
        photo: () => `${(Math.random() * 5 + 1).toFixed(1)} MB`,
        video: () => `${(Math.random() * 100 + 10).toFixed(1)} MB`,
        audio: () => `${(Math.random() * 10 + 1).toFixed(1)} MB`
    };
    
    return sizes[type]();
}

// Setup filters
function setupFilters() {
    document.getElementById('mediaTypeFilter').addEventListener('change', (e) => {
        currentFilters.type = e.target.value;
        applyFilters();
    });
    
    document.getElementById('categoryFilter').addEventListener('change', (e) => {
        currentFilters.category = e.target.value;
        applyFilters();
    });
    
    document.getElementById('yearFilter').addEventListener('change', (e) => {
        currentFilters.year = e.target.value;
        applyFilters();
    });
}

// Setup view controls
function setupViewControls() {
    document.getElementById('gridViewBtn').addEventListener('click', () => {
        setView('grid');
    });
    
    document.getElementById('listViewBtn').addEventListener('click', () => {
        setView('list');
    });
}

// Set view mode
function setView(view) {
    currentView = view;
    
    // Update buttons
    document.getElementById('gridViewBtn').classList.toggle('active', view === 'grid');
    document.getElementById('listViewBtn').classList.toggle('active', view === 'list');
    
    // Update grid class
    const mediaGrid = document.getElementById('mediaGrid');
    mediaGrid.classList.toggle('list-view', view === 'list');
    
    renderMedia();
}

// Setup search
function setupSearch() {
    const searchInput = document.getElementById('mediaSearch');
    const searchBtn = document.getElementById('searchBtn');
    
    searchInput.addEventListener('input', debounce((e) => {
        currentFilters.search = e.target.value.toLowerCase();
        applyFilters();
    }, 300));
    
    searchBtn.addEventListener('click', () => {
        currentFilters.search = searchInput.value.toLowerCase();
        applyFilters();
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            currentFilters.search = e.target.value.toLowerCase();
            applyFilters();
        }
    });
}

// Setup sort
function setupSort() {
    document.getElementById('sortSelect').addEventListener('change', (e) => {
        currentSort = e.target.value;
        applySort();
        renderMedia();
    });
}

// Apply filters
function applyFilters() {
    filteredMedia = mediaData.filter(item => {
        const typeMatch = currentFilters.type === 'all' || 
                         (currentFilters.type === 'photos' && item.type === 'photo') ||
                         (currentFilters.type === 'videos' && item.type === 'video') ||
                         (currentFilters.type === 'audio' && item.type === 'audio');
        
        const categoryMatch = currentFilters.category === 'all' || item.category === currentFilters.category;
        const yearMatch = currentFilters.year === 'all' || item.year.toString() === currentFilters.year;
        
        const searchMatch = !currentFilters.search || 
                           item.title.toLowerCase().includes(currentFilters.search) ||
                           item.description.toLowerCase().includes(currentFilters.search) ||
                           item.tags.some(tag => tag.toLowerCase().includes(currentFilters.search));
        
        return typeMatch && categoryMatch && yearMatch && searchMatch;
    });
    
    applySort();
    currentPage = 1;
    renderMedia();
    renderPagination();
    updateResultsCount();
}

// Apply sort
function applySort() {
    filteredMedia.sort((a, b) => {
        switch (currentSort) {
            case 'newest':
                return new Date(b.uploadDate) - new Date(a.uploadDate);
            case 'oldest':
                return new Date(a.uploadDate) - new Date(b.uploadDate);
            case 'title':
                return a.title.localeCompare(b.title);
            case 'popular':
                return b.views - a.views;
            default:
                return 0;
        }
    });
}

// Setup pagination
function setupPagination() {
    // Pagination will be handled in renderPagination()
}

// Render media
function renderMedia() {
    const mediaGrid = document.getElementById('mediaGrid');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageItems = filteredMedia.slice(startIndex, endIndex);
    
    if (pageItems.length === 0) {
        mediaGrid.innerHTML = `
            <div class="col-12">
                <div class="text-center py-5">
                    <i class="fas fa-search fa-3x text-muted mb-3"></i>
                    <h5>No media found</h5>
                    <p class="text-muted">Try adjusting your filters or search terms.</p>
                </div>
            </div>
        `;
        return;
    }
    
    mediaGrid.innerHTML = pageItems.map(item => `
        <div class="media-item" onclick="showMediaModal(${item.id})">
            <div class="media-thumbnail">
                <img src="${item.thumbnailUrl}" alt="${item.title}" loading="lazy">
                <div class="media-type-indicator ${item.type}">${item.type.toUpperCase()}</div>
                ${item.duration ? `<div class="media-duration">${item.duration}</div>` : ''}
                ${item.type !== 'photo' ? '<div class="play-overlay"><i class="fas fa-play"></i></div>' : ''}
            </div>
            <div class="media-content">
                <h6 class="media-title">${item.title}</h6>
                <p class="media-description">${item.description}</p>
                <div class="media-meta">
                    <span class="media-category">${item.category}</span>
                    <div class="media-stats-small">
                        <span><i class="fas fa-eye"></i> ${formatNumber(item.views)}</span>
                        <span><i class="fas fa-download"></i> ${formatNumber(item.downloads)}</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Show media modal
function showMediaModal(mediaId) {
    const media = mediaData.find(item => item.id === mediaId);
    if (!media) return;
    
    const modal = new bootstrap.Modal(document.getElementById('mediaModal'));
    const title = document.getElementById('mediaModalTitle');
    const body = document.getElementById('mediaModalBody');
    
    title.textContent = media.title;
    
    let mediaPreview = '';
    if (media.type === 'photo') {
        mediaPreview = `<img src="${media.mediaUrl}" alt="${media.title}" class="media-modal-preview">`;
    } else if (media.type === 'video') {
        mediaPreview = `
            <div class="video-player">
                <video controls class="media-modal-preview">
                    <source src="${media.mediaUrl}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
        `;
    } else if (media.type === 'audio') {
        mediaPreview = `
            <div class="audio-player">
                <div class="audio-controls">
                    <button class="play-pause-btn" onclick="toggleAudio(this)">
                        <i class="fas fa-play"></i>
                    </button>
                    <div class="audio-progress">
                        <div class="audio-progress-bar"></div>
                    </div>
                    <span class="audio-time">0:00</span>
                </div>
                <audio>
                    <source src="${media.mediaUrl}" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>
            </div>
        `;
    }
    
    body.innerHTML = `
        <div class="media-modal-content">
            ${mediaPreview}
            <div class="media-modal-info">
                <div class="row">
                    <div class="col-md-8">
                        <h6>Description</h6>
                        <p>${media.description}</p>
                        
                        <h6>Details</h6>
                        <div class="row">
                            <div class="col-6">
                                <strong>Category:</strong> ${media.category}<br>
                                <strong>Year:</strong> ${media.year}<br>
                                <strong>Type:</strong> ${media.type}
                            </div>
                            <div class="col-6">
                                <strong>Views:</strong> ${formatNumber(media.views)}<br>
                                <strong>Downloads:</strong> ${formatNumber(media.downloads)}<br>
                                <strong>Size:</strong> ${media.fileSize}
                            </div>
                        </div>
                        
                        <div class="media-modal-tags">
                            ${media.tags.map(tag => `<span class="media-tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                    <div class="col-md-4">
                        <h6>Upload Information</h6>
                        <p><strong>Uploaded by:</strong> ${media.uploader}</p>
                        <p><strong>Date:</strong> ${media.uploadDate}</p>
                        <p><strong>Favorites:</strong> ${formatNumber(media.favorites)}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Setup modal action buttons
    setupModalActions(media);
    
    modal.show();
}

// Setup modal actions
function setupModalActions(media) {
    document.getElementById('downloadMediaBtn').onclick = () => downloadMedia(media);
    document.getElementById('shareMediaBtn').onclick = () => shareMedia(media);
    document.getElementById('favoriteMediaBtn').onclick = () => toggleFavorite(media);
}

// Download media
function downloadMedia(media) {
    // Simulate download
    alert(`Downloading ${media.title}...`);
    media.downloads++;
}

// Share media
function shareMedia(media) {
    if (navigator.share) {
        navigator.share({
            title: media.title,
            text: media.description,
            url: window.location.href
        });
    } else {
        // Fallback
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            alert('Link copied to clipboard!');
        });
    }
}

// Toggle favorite
function toggleFavorite(media) {
    const btn = document.getElementById('favoriteMediaBtn');
    const icon = btn.querySelector('i');
    
    if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        btn.innerHTML = '<i class="fas fa-heart me-1"></i>Favorited';
        media.favorites++;
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        btn.innerHTML = '<i class="far fa-heart me-1"></i>Favorite';
        media.favorites--;
    }
}

// Render pagination
function renderPagination() {
    const pagination = document.getElementById('mediaPagination');
    const totalPages = Math.ceil(filteredMedia.length / itemsPerPage);
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let paginationHtml = '';
    
    // Previous button
    paginationHtml += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage - 1})">Previous</a>
        </li>
    `;
    
    // Page numbers
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        paginationHtml += `
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
            </li>
        `;
    }
    
    // Next button
    paginationHtml += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Next</a>
        </li>
    `;
    
    pagination.innerHTML = paginationHtml;
}

// Change page
function changePage(page) {
    const totalPages = Math.ceil(filteredMedia.length / itemsPerPage);
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    renderMedia();
    renderPagination();
    
    // Scroll to top of media grid
    document.getElementById('mediaGrid').scrollIntoView({ behavior: 'smooth' });
}

// Render sidebar
function renderSidebar() {
    renderFeaturedMedia();
    renderPopularDownloads();
    renderCategoryList();
}

// Render featured media
function renderFeaturedMedia() {
    const featuredContainer = document.getElementById('featuredMedia');
    const featured = mediaData.filter(item => item.featured).slice(0, 5);
    
    featuredContainer.innerHTML = featured.map(item => `
        <div class="featured-item" onclick="showMediaModal(${item.id})">
            <div class="featured-thumbnail">
                <img src="${item.thumbnailUrl}" alt="${item.title}">
            </div>
            <div class="featured-info">
                <div class="featured-title">${item.title}</div>
                <div class="featured-meta">${item.type} • ${formatNumber(item.views)} views</div>
            </div>
        </div>
    `).join('');
}

// Render popular downloads
function renderPopularDownloads() {
    const popularContainer = document.getElementById('popularDownloads');
    const popular = [...mediaData]
        .sort((a, b) => b.downloads - a.downloads)
        .slice(0, 5);
    
    popularContainer.innerHTML = popular.map(item => `
        <div class="featured-item" onclick="showMediaModal(${item.id})">
            <div class="featured-thumbnail">
                <img src="${item.thumbnailUrl}" alt="${item.title}">
            </div>
            <div class="featured-info">
                <div class="featured-title">${item.title}</div>
                <div class="featured-meta">${formatNumber(item.downloads)} downloads</div>
            </div>
        </div>
    `).join('');
}

// Render category list
function renderCategoryList() {
    const categoryContainer = document.getElementById('categoryList');
    const categories = ['battles', 'heroes', 'civilians', 'ceremonies', 'artifacts', 'documents'];
    
    categoryContainer.innerHTML = categories.map(category => {
        const count = mediaData.filter(item => item.category === category).length;
        return `
            <a href="#" class="category-item" onclick="filterByCategory('${category}')">
                <span>${category.charAt(0).toUpperCase() + category.slice(1)}</span>
                <span class="category-count">${count}</span>
            </a>
        `;
    }).join('');
}

// Filter by category
function filterByCategory(category) {
    document.getElementById('categoryFilter').value = category;
    currentFilters.category = category;
    applyFilters();
}

// Update media stats
function updateMediaStats() {
    const photoCount = mediaData.filter(item => item.type === 'photo').length;
    const videoCount = mediaData.filter(item => item.type === 'video').length;
    const audioCount = mediaData.filter(item => item.type === 'audio').length;
    
    document.getElementById('photoCount').textContent = photoCount;
    document.getElementById('videoCount').textContent = videoCount;
    document.getElementById('audioCount').textContent = audioCount;
}

// Update results count
function updateResultsCount() {
    document.getElementById('resultsCount').textContent = 
        `Showing ${filteredMedia.length} of ${mediaData.length} items`;
}

// Show upload modal
function showUploadModal() {
    const modal = new bootstrap.Modal(document.getElementById('uploadModal'));
    modal.show();
}

// Submit upload
function submitUpload() {
    const form = document.getElementById('uploadForm');
    const formData = new FormData(form);
    
    // Validate form
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    // Simulate upload
    alert('Media uploaded successfully! It will be reviewed before being published.');
    
    // Close modal and reset form
    bootstrap.Modal.getInstance(document.getElementById('uploadModal')).hide();
    form.reset();
}

// Audio player controls
function toggleAudio(button) {
    const audioPlayer = button.closest('.audio-player');
    const audio = audioPlayer.querySelector('audio');
    const icon = button.querySelector('i');
    
    if (audio.paused) {
        audio.play();
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
    } else {
        audio.pause();
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    }
}

// Utility functions
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait for core to be loaded
    if (typeof initializeCore === 'function') {
        initializeCore();
    }
    initializeMedia();
});

// Make functions available globally
window.showMediaModal = showMediaModal;
window.changePage = changePage;
window.filterByCategory = filterByCategory;
window.showUploadModal = showUploadModal;
window.submitUpload = submitUpload;
window.toggleAudio = toggleAudio;
