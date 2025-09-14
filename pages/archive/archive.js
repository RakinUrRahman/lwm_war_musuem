// Archive Page Functionality
let archiveData = [];
let filteredArchives = [];
let currentPage = 1;
let itemsPerPage = 12;
let currentFilters = {
    category: 'all',
    year: 'all',
    search: ''
};
let currentView = 'grid';
let currentTab = 'featured';

// Initialize archive page
function initializeArchive() {
    loadArchiveData();
    setupFilters();
    setupTabs();
    setupViewControls();
    setupSearch();
    renderArchives();
    renderSidebar();
    updateArchiveStats();
}

// Load archive data
function loadArchiveData() {
    archiveData = generateArchiveData();
    filteredArchives = [...archiveData];
}

// Generate archive data
function generateArchiveData() {
    const categories = ['documents', 'photographs', 'letters', 'newspapers', 'maps', 'recordings'];
    const years = [1971, 1970, 1969, 1952];
    const qualities = ['high', 'medium', 'low'];
    
    const archives = [];
    
    // Generate sample archive items
    for (let i = 1; i <= 60; i++) {
        const category = categories[Math.floor(Math.random() * categories.length)];
        const year = years[Math.floor(Math.random() * years.length)];
        const quality = qualities[Math.floor(Math.random() * qualities.length)];
        
        archives.push({
            id: i,
            title: generateArchiveTitle(category, i),
            description: generateArchiveDescription(category),
            category: category,
            year: year,
            date: generateArchiveDate(year),
            author: generateAuthor(category),
            location: generateLocation(),
            language: generateLanguage(),
            quality: quality,
            thumbnailUrl: category === 'photographs' ? `https://picsum.photos/400/300?random=${i}` : null,
            fileSize: generateFileSize(category),
            format: generateFormat(category),
            tags: generateArchiveTags(category),
            views: Math.floor(Math.random() * 5000) + 100,
            downloads: Math.floor(Math.random() * 1000) + 10,
            featured: Math.random() > 0.85,
            uploadDate: generateUploadDate(),
            condition: generateCondition(),
            significance: generateSignificance(category),
            keywords: generateKeywords(category),
            relatedItems: []
        });
    }
    
    return archives;
}

// Generate archive title
function generateArchiveTitle(category, index) {
    const titles = {
        documents: [
            'Proclamation of Independence',
            'Six Point Program Document',
            'Agartala Conspiracy Case Files',
            'Military Communication Records',
            'Government Correspondence',
            'Official War Declaration',
            'Surrender Document',
            'Victory Speech Transcript',
            'International Recognition Letters',
            'Constitutional Assembly Records'
        ],
        photographs: [
            'Liberation War Battle Scene',
            'Freedom Fighter Group Photo',
            'Refugee Camp Documentation',
            'Victory Day Celebration',
            'Martyred Heroes Memorial',
            'International Support Rally',
            'Civil Disobedience Movement',
            'Student Protest March',
            'Rural Resistance Activity',
            'Post-War Reconstruction'
        ],
        letters: [
            'Personal Letter from Freedom Fighter',
            'Family Correspondence During War',
            'International Support Letter',
            'Diplomatic Communication',
            'Soldier\'s Last Letter Home',
            'Civilian Account of Events',
            'Political Leader\'s Message',
            'Military Command Instructions',
            'Relief Organization Correspondence',
            'Victory Celebration Invitation'
        ],
        newspapers: [
            'Liberation War Coverage',
            'Independence Declaration Report',
            'International Media Coverage',
            'Victory Day Headlines',
            'Freedom Fighter Features',
            'War Progress Updates',
            'Civilian Impact Stories',
            'Political Development News',
            'International Support Reports',
            'Post-War Reconstruction News'
        ],
        maps: [
            'Military Operation Map',
            'Sector Division Chart',
            'Battle Position Layout',
            'Refugee Movement Routes',
            'Strategic Location Map',
            'Liberation Progress Map',
            'International Border Map',
            'Supply Route Chart',
            'Victory March Route',
            'Post-War Administrative Map'
        ],
        recordings: [
            'Liberation War Speech Recording',
            'Freedom Fighter Interview',
            'Victory Day Address',
            'Political Rally Audio',
            'Military Communication Record',
            'Civilian Testimony Recording',
            'International Support Speech',
            'Radio Broadcast Archive',
            'Press Conference Audio',
            'Cultural Program Recording'
        ]
    };
    
    const categoryTitles = titles[category] || titles.documents;
    return categoryTitles[index % categoryTitles.length];
}

// Generate archive description
function generateArchiveDescription(category) {
    const descriptions = {
        documents: 'Official document containing important historical information and legal significance related to Bangladesh\'s Liberation War.',
        photographs: 'Historical photograph capturing significant moments, people, and events during the 1971 Liberation War period.',
        letters: 'Personal correspondence providing intimate insights into the experiences and perspectives during the Liberation War.',
        newspapers: 'Contemporary newspaper coverage documenting events, opinions, and public sentiment during the Liberation War.',
        maps: 'Strategic and geographical documentation showing military positions, movements, and territorial aspects of the war.',
        recordings: 'Audio documentation preserving voices, speeches, and sounds from the Liberation War era.'
    };
    
    return descriptions[category] || descriptions.documents;
}

// Generate archive date
function generateArchiveDate(year) {
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1;
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
}

// Generate author
function generateAuthor(category) {
    const authors = {
        documents: ['Government of Bangladesh', 'Military Command', 'Political Party', 'Official Authority'],
        photographs: ['War Correspondent', 'Freedom Fighter', 'Civilian Witness', 'Press Photographer'],
        letters: ['Freedom Fighter', 'Civilian', 'Political Leader', 'Family Member'],
        newspapers: ['Daily Ittefaq', 'The People', 'Bangladesh Observer', 'International Press'],
        maps: ['Military Intelligence', 'Survey Department', 'Strategic Command', 'Geographic Office'],
        recordings: ['Radio Bangladesh', 'Political Leader', 'Freedom Fighter', 'News Reporter']
    };
    
    const categoryAuthors = authors[category] || authors.documents;
    return categoryAuthors[Math.floor(Math.random() * categoryAuthors.length)];
}

// Generate location
function generateLocation() {
    const locations = [
        'Dhaka', 'Chittagong', 'Sylhet', 'Jessore', 'Comilla', 'Rangpur',
        'Mymensingh', 'Barisal', 'Rajshahi', 'Khulna', 'Faridpur', 'Noakhali'
    ];
    return locations[Math.floor(Math.random() * locations.length)];
}

// Generate language
function generateLanguage() {
    const languages = ['Bengali', 'English', 'Urdu', 'Hindi'];
    const weights = [0.6, 0.3, 0.08, 0.02];
    const rand = Math.random();
    let sum = 0;
    
    for (let i = 0; i < weights.length; i++) {
        sum += weights[i];
        if (rand <= sum) return languages[i];
    }
    
    return 'Bengali';
}

// Generate file size
function generateFileSize(category) {
    const sizes = {
        documents: () => `${(Math.random() * 5 + 1).toFixed(1)} MB`,
        photographs: () => `${(Math.random() * 10 + 2).toFixed(1)} MB`,
        letters: () => `${(Math.random() * 3 + 0.5).toFixed(1)} MB`,
        newspapers: () => `${(Math.random() * 15 + 5).toFixed(1)} MB`,
        maps: () => `${(Math.random() * 8 + 3).toFixed(1)} MB`,
        recordings: () => `${(Math.random() * 25 + 5).toFixed(1)} MB`
    };
    
    return sizes[category]();
}

// Generate format
function generateFormat(category) {
    const formats = {
        documents: ['PDF', 'TIFF', 'DOC'],
        photographs: ['JPEG', 'PNG', 'TIFF'],
        letters: ['PDF', 'JPEG', 'TIFF'],
        newspapers: ['PDF', 'JPEG', 'PNG'],
        maps: ['PDF', 'JPEG', 'PNG', 'SVG'],
        recordings: ['MP3', 'WAV', 'AAC']
    };
    
    const categoryFormats = formats[category] || formats.documents;
    return categoryFormats[Math.floor(Math.random() * categoryFormats.length)];
}

// Generate archive tags
function generateArchiveTags(category) {
    const tagPools = {
        documents: ['official', 'government', 'military', 'political', 'legal', 'historical'],
        photographs: ['war', 'people', 'events', 'documentary', 'historical', 'visual'],
        letters: ['personal', 'correspondence', 'testimony', 'witness', 'family', 'private'],
        newspapers: ['media', 'news', 'public', 'coverage', 'journalism', 'contemporary'],
        maps: ['military', 'strategy', 'geography', 'tactical', 'planning', 'territorial'],
        recordings: ['audio', 'speech', 'interview', 'broadcast', 'oral', 'testimony']
    };
    
    const pool = tagPools[category] || tagPools.documents;
    const numTags = Math.floor(Math.random() * 3) + 2;
    const shuffled = pool.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numTags);
}

// Generate upload date
function generateUploadDate() {
    const start = new Date(2015, 0, 1);
    const end = new Date();
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split('T')[0];
}

// Generate condition
function generateCondition() {
    const conditions = ['Excellent', 'Good', 'Fair', 'Poor'];
    const weights = [0.3, 0.4, 0.2, 0.1];
    const rand = Math.random();
    let sum = 0;
    
    for (let i = 0; i < weights.length; i++) {
        sum += weights[i];
        if (rand <= sum) return conditions[i];
    }
    
    return 'Good';
}

// Generate significance
function generateSignificance(category) {
    const significance = {
        documents: 'Primary source document crucial for understanding official decisions and policies during the Liberation War.',
        photographs: 'Visual documentation providing authentic representation of historical events and personalities.',
        letters: 'Personal account offering intimate perspective on individual experiences during the war.',
        newspapers: 'Contemporary media coverage reflecting public opinion and information dissemination of the time.',
        maps: 'Strategic documentation essential for understanding military operations and geographical aspects.',
        recordings: 'Audio preservation of historical voices and sounds from the Liberation War period.'
    };
    
    return significance[category] || significance.documents;
}

// Generate keywords
function generateKeywords(category) {
    const keywordPools = {
        documents: ['liberation war', 'independence', 'bangladesh', 'official', 'government', 'military', 'politics'],
        photographs: ['liberation war', 'bangladesh', 'freedom fighters', 'war', 'independence', 'history', 'visual'],
        letters: ['liberation war', 'personal', 'correspondence', 'witness', 'testimony', 'family', 'private'],
        newspapers: ['liberation war', 'news', 'media', 'journalism', 'contemporary', 'coverage', 'public'],
        maps: ['liberation war', 'military', 'strategy', 'geography', 'tactical', 'operations', 'territorial'],
        recordings: ['liberation war', 'audio', 'speech', 'interview', 'oral history', 'testimony', 'broadcast']
    };
    
    const pool = keywordPools[category] || keywordPools.documents;
    return pool.slice(0, 5);
}

// Setup filters
function setupFilters() {
    document.getElementById('categoryFilter').addEventListener('change', (e) => {
        currentFilters.category = e.target.value;
        applyFilters();
    });
    
    document.getElementById('yearFilter').addEventListener('change', (e) => {
        currentFilters.year = e.target.value;
        applyFilters();
    });
    
    document.getElementById('advancedSearchBtn').addEventListener('click', showAdvancedSearch);
}

// Setup tabs
function setupTabs() {
    document.querySelectorAll('[data-bs-toggle="tab"]').forEach(tab => {
        tab.addEventListener('shown.bs.tab', (e) => {
            const tabId = e.target.getAttribute('data-bs-target').replace('#', '');
            currentTab = tabId;
            renderArchives();
        });
    });
}

// Setup view controls
function setupViewControls() {
    document.querySelectorAll('[data-view]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const view = e.currentTarget.getAttribute('data-view');
            setView(view);
        });
    });
}

// Set view mode
function setView(view) {
    currentView = view;
    
    // Update buttons
    document.querySelectorAll('[data-view]').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-view') === view);
    });
    
    // Update grids
    document.querySelectorAll('.archive-grid').forEach(grid => {
        grid.classList.toggle('list-view', view === 'list');
    });
}

// Setup search
function setupSearch() {
    const searchInput = document.getElementById('archiveSearch');
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

// Apply filters
function applyFilters() {
    filteredArchives = archiveData.filter(item => {
        const categoryMatch = currentFilters.category === 'all' || item.category === currentFilters.category;
        const yearMatch = currentFilters.year === 'all' || item.year.toString() === currentFilters.year;
        
        const searchMatch = !currentFilters.search || 
                           item.title.toLowerCase().includes(currentFilters.search) ||
                           item.description.toLowerCase().includes(currentFilters.search) ||
                           item.author.toLowerCase().includes(currentFilters.search) ||
                           item.keywords.some(keyword => keyword.toLowerCase().includes(currentFilters.search)) ||
                           item.tags.some(tag => tag.toLowerCase().includes(currentFilters.search));
        
        return categoryMatch && yearMatch && searchMatch;
    });
    
    currentPage = 1;
    renderArchives();
    renderPagination();
}

// Render archives
function renderArchives() {
    const containers = {
        featured: 'featuredCollections',
        documents: 'documentsGrid',
        photos: 'photosGrid',
        records: 'recordsGrid'
    };
    
    const containerId = containers[currentTab];
    if (!containerId) return;
    
    const container = document.getElementById(containerId);
    if (!container) return;
    
    let itemsToShow = [];
    
    if (currentTab === 'featured') {
        itemsToShow = archiveData.filter(item => item.featured);
    } else if (currentTab === 'documents') {
        itemsToShow = filteredArchives.filter(item => item.category === 'documents' || item.category === 'letters' || item.category === 'newspapers');
    } else if (currentTab === 'photos') {
        itemsToShow = filteredArchives.filter(item => item.category === 'photographs');
    } else if (currentTab === 'records') {
        itemsToShow = filteredArchives.filter(item => item.category === 'maps' || item.category === 'recordings');
    }
    
    // Pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageItems = itemsToShow.slice(startIndex, endIndex);
    
    if (pageItems.length === 0) {
        container.innerHTML = `
            <div class="col-12">
                <div class="text-center py-5">
                    <i class="fas fa-search fa-3x text-muted mb-3"></i>
                    <h5>No archives found</h5>
                    <p class="text-muted">Try adjusting your filters or search terms.</p>
                </div>
            </div>
        `;
        return;
    }
    
    container.innerHTML = pageItems.map(item => `
        <div class="archive-item" onclick="showArchiveModal(${item.id})">
            <div class="archive-thumbnail">
                ${item.thumbnailUrl ? 
                    `<img src="${item.thumbnailUrl}" alt="${item.title}" loading="lazy">` :
                    `<div class="archive-placeholder-icon">
                        <i class="fas fa-${getArchiveIcon(item.category)}"></i>
                     </div>`
                }
                <div class="archive-type-indicator ${item.category}">${item.category.toUpperCase()}</div>
            </div>
            <div class="archive-content">
                <h6 class="archive-title">${item.title}</h6>
                <p class="archive-description">${item.description}</p>
                <div class="archive-meta">
                    <div class="archive-meta-item">
                        <i class="fas fa-calendar"></i>
                        <span>${item.date}</span>
                    </div>
                    <div class="archive-meta-item">
                        <i class="fas fa-user"></i>
                        <span>${item.author}</span>
                    </div>
                    <div class="archive-meta-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${item.location}</span>
                    </div>
                </div>
                <div class="archive-tags">
                    ${item.tags.map(tag => `<span class="archive-tag">${tag}</span>`).join('')}
                </div>
                <div class="archive-actions">
                    <button class="btn btn-outline-primary btn-sm" onclick="event.stopPropagation(); downloadArchive(${item.id})">
                        <i class="fas fa-download"></i>
                    </button>
                    <button class="btn btn-outline-secondary btn-sm" onclick="event.stopPropagation(); shareArchive(${item.id})">
                        <i class="fas fa-share"></i>
                    </button>
                    <span class="archive-quality ${item.quality}">${item.quality}</span>
                </div>
            </div>
        </div>
    `).join('');
    
    // Update results count
    updateResultsCount(currentTab, itemsToShow.length);
}

// Get archive icon
function getArchiveIcon(category) {
    const icons = {
        documents: 'file-alt',
        photographs: 'image',
        letters: 'envelope',
        newspapers: 'newspaper',
        maps: 'map',
        recordings: 'volume-up'
    };
    return icons[category] || 'file';
}

// Show archive modal
function showArchiveModal(archiveId) {
    const archive = archiveData.find(item => item.id === archiveId);
    if (!archive) return;
    
    const modal = new bootstrap.Modal(document.getElementById('archiveModal'));
    const title = document.getElementById('archiveModalTitle');
    const body = document.getElementById('archiveModalBody');
    
    title.textContent = archive.title;
    
    body.innerHTML = `
        <div class="archive-modal-content">
            <div class="archive-preview">
                ${archive.thumbnailUrl ? 
                    `<img src="${archive.thumbnailUrl}" alt="${archive.title}">` :
                    `<div class="archive-preview-placeholder">
                        <i class="fas fa-${getArchiveIcon(archive.category)}"></i>
                        <h5>${archive.category.charAt(0).toUpperCase() + archive.category.slice(1)}</h5>
                     </div>`
                }
            </div>
            
            <div class="archive-full-description">
                <h5>Description</h5>
                <p>${archive.description}</p>
                <p><strong>Historical Significance:</strong> ${archive.significance}</p>
            </div>
            
            <div class="archive-details">
                <div class="detail-item">
                    <div class="detail-label">Date</div>
                    <div class="detail-value">${archive.date}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Author/Creator</div>
                    <div class="detail-value">${archive.author}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Location</div>
                    <div class="detail-value">${archive.location}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Language</div>
                    <div class="detail-value">${archive.language}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Format</div>
                    <div class="detail-value">${archive.format}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">File Size</div>
                    <div class="detail-value">${archive.fileSize}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Condition</div>
                    <div class="detail-value">${archive.condition}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Quality</div>
                    <div class="detail-value">
                        <span class="archive-quality ${archive.quality}">${archive.quality}</span>
                    </div>
                </div>
            </div>
            
            <div class="mt-4">
                <h6>Keywords</h6>
                <div class="archive-tags">
                    ${archive.keywords.map(keyword => `<span class="archive-tag">${keyword}</span>`).join('')}
                </div>
            </div>
            
            <div class="citation-box mt-4">
                <strong>Citation:</strong><br>
                ${generateCitation(archive)}
            </div>
        </div>
    `;
    
    // Setup modal actions
    setupArchiveModalActions(archive);
    
    // Track view
    archive.views++;
    
    modal.show();
}

// Generate citation
function generateCitation(archive) {
    return `${archive.author}. "${archive.title}." ${archive.date}. Liberation War Museum Digital Archive. Accessed ${new Date().toLocaleDateString()}.`;
}

// Setup archive modal actions
function setupArchiveModalActions(archive) {
    document.getElementById('downloadArchiveBtn').onclick = () => downloadArchive(archive.id);
    document.getElementById('shareArchiveBtn').onclick = () => shareArchive(archive.id);
    document.getElementById('citeArchiveBtn').onclick = () => copyCitation(archive);
    document.getElementById('saveArchiveBtn').onclick = () => saveArchive(archive.id);
}

// Download archive
function downloadArchive(archiveId) {
    const archive = archiveData.find(item => item.id === archiveId);
    if (!archive) return;
    
    archive.downloads++;
    alert(`Downloading ${archive.title}...`);
}

// Share archive
function shareArchive(archiveId) {
    const archive = archiveData.find(item => item.id === archiveId);
    if (!archive) return;
    
    if (navigator.share) {
        navigator.share({
            title: archive.title,
            text: archive.description,
            url: window.location.href
        });
    } else {
        const url = `${window.location.href}?archive=${archiveId}`;
        navigator.clipboard.writeText(url).then(() => {
            alert('Archive link copied to clipboard!');
        });
    }
}

// Copy citation
function copyCitation(archive) {
    const citation = generateCitation(archive);
    navigator.clipboard.writeText(citation).then(() => {
        alert('Citation copied to clipboard!');
    });
}

// Save archive
function saveArchive(archiveId) {
    const saved = JSON.parse(localStorage.getItem('savedArchives') || '[]');
    if (!saved.includes(archiveId)) {
        saved.push(archiveId);
        localStorage.setItem('savedArchives', JSON.stringify(saved));
        
        const btn = document.getElementById('saveArchiveBtn');
        btn.innerHTML = '<i class="fas fa-bookmark me-1"></i>Saved';
        btn.classList.remove('btn-outline-info');
        btn.classList.add('btn-info');
        
        alert('Archive saved to your collection!');
    } else {
        alert('Archive already saved!');
    }
}

// Render sidebar
function renderSidebar() {
    renderRecentAdditions();
    renderPopularArchives();
}

// Render recent additions
function renderRecentAdditions() {
    const container = document.getElementById('recentAdditions');
    const recent = [...archiveData]
        .sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate))
        .slice(0, 5);
    
    container.innerHTML = recent.map(item => `
        <div class="recent-item" onclick="showArchiveModal(${item.id})">
            <div class="recent-thumbnail">
                ${item.thumbnailUrl ? 
                    `<img src="${item.thumbnailUrl}" alt="${item.title}">` :
                    `<i class="fas fa-${getArchiveIcon(item.category)}"></i>`
                }
            </div>
            <div class="recent-info">
                <div class="recent-title">${item.title}</div>
                <div class="recent-meta">${item.category} • ${item.uploadDate}</div>
            </div>
        </div>
    `).join('');
}

// Render popular archives
function renderPopularArchives() {
    const container = document.getElementById('popularArchives');
    const popular = [...archiveData]
        .sort((a, b) => b.views - a.views)
        .slice(0, 5);
    
    container.innerHTML = popular.map(item => `
        <div class="recent-item" onclick="showArchiveModal(${item.id})">
            <div class="recent-thumbnail">
                ${item.thumbnailUrl ? 
                    `<img src="${item.thumbnailUrl}" alt="${item.title}">` :
                    `<i class="fas fa-${getArchiveIcon(item.category)}"></i>`
                }
            </div>
            <div class="recent-info">
                <div class="recent-title">${item.title}</div>
                <div class="recent-meta">${formatNumber(item.views)} views</div>
            </div>
        </div>
    `).join('');
}

// Update archive stats
function updateArchiveStats() {
    const documentsCount = archiveData.filter(item => 
        ['documents', 'letters', 'newspapers'].includes(item.category)).length;
    const photographsCount = archiveData.filter(item => item.category === 'photographs').length;
    const recordsCount = archiveData.filter(item => 
        ['maps', 'recordings'].includes(item.category)).length;
    
    document.getElementById('documentsCount').textContent = documentsCount;
    document.getElementById('photographsCount').textContent = photographsCount;
    document.getElementById('recordsCount').textContent = recordsCount;
}

// Update results count
function updateResultsCount(tab, count) {
    const resultElements = {
        documents: 'documentsResults',
        photos: 'photosResults',
        records: 'recordsResults'
    };
    
    const elementId = resultElements[tab];
    if (elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = `Showing ${count} items`;
        }
    }
}

// Render pagination
function renderPagination() {
    const pagination = document.getElementById('archivePagination');
    const totalItems = filteredArchives.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
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
    const totalPages = Math.ceil(filteredArchives.length / itemsPerPage);
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    renderArchives();
    renderPagination();
    
    // Scroll to top of archive grid
    document.querySelector('.archive-collections').scrollIntoView({ behavior: 'smooth' });
}

// Quick search
function quickSearch(query) {
    document.getElementById('archiveSearch').value = query;
    currentFilters.search = query.toLowerCase();
    applyFilters();
}

// Show advanced search
function showAdvancedSearch() {
    const modal = new bootstrap.Modal(document.getElementById('advancedSearchModal'));
    modal.show();
}

// Perform advanced search
function performAdvancedSearch() {
    const form = document.getElementById('advancedSearchForm');
    const formData = new FormData(form);
    
    // Get form values
    const titleSearch = document.getElementById('titleSearch').value.toLowerCase();
    const authorSearch = document.getElementById('authorSearch').value.toLowerCase();
    const keywordSearch = document.getElementById('keywordSearch').value.toLowerCase();
    const locationSearch = document.getElementById('locationSearch').value.toLowerCase();
    const typeSearch = document.getElementById('typeSearch').value;
    const languageSearch = document.getElementById('languageSearch').value;
    const dateFrom = document.getElementById('dateFromSearch').value;
    const dateTo = document.getElementById('dateToSearch').value;
    
    // Filter archives based on advanced criteria
    filteredArchives = archiveData.filter(item => {
        const titleMatch = !titleSearch || item.title.toLowerCase().includes(titleSearch);
        const authorMatch = !authorSearch || item.author.toLowerCase().includes(authorSearch);
        const locationMatch = !locationSearch || item.location.toLowerCase().includes(locationSearch);
        const typeMatch = !typeSearch || item.category === typeSearch;
        const languageMatch = !languageSearch || item.language.toLowerCase() === languageSearch.toLowerCase();
        
        const keywordMatch = !keywordSearch || 
            keywordSearch.split(',').some(keyword => 
                item.keywords.some(itemKeyword => 
                    itemKeyword.toLowerCase().includes(keyword.trim())
                )
            );
        
        let dateMatch = true;
        if (dateFrom || dateTo) {
            const itemDate = new Date(item.date);
            if (dateFrom) dateMatch = dateMatch && itemDate >= new Date(dateFrom);
            if (dateTo) dateMatch = dateMatch && itemDate <= new Date(dateTo);
        }
        
        return titleMatch && authorMatch && locationMatch && typeMatch && 
               languageMatch && keywordMatch && dateMatch;
    });
    
    currentPage = 1;
    renderArchives();
    renderPagination();
    
    // Close modal
    bootstrap.Modal.getInstance(document.getElementById('advancedSearchModal')).hide();
    
    // Show results notification
    alert(`Found ${filteredArchives.length} archives matching your criteria.`);
}

// Clear advanced search
function clearAdvancedSearch() {
    document.getElementById('advancedSearchForm').reset();
}

// Research tool functions
function showCitationTool() {
    showResearchTool('Citation Generator', `
        <div class="citation-tool">
            <h5>Citation Generator</h5>
            <p>Generate properly formatted citations for archive materials.</p>
            <div class="citation-formats">
                <h6>Available Formats:</h6>
                <ul>
                    <li><strong>APA:</strong> Author, A. A. (Year). Title. Archive Name.</li>
                    <li><strong>MLA:</strong> Author. "Title." Archive Name, Date.</li>
                    <li><strong>Chicago:</strong> Author. "Title." Archive Name. Date.</li>
                </ul>
            </div>
            <div class="mt-3">
                <p class="text-muted">Select any archive item to automatically generate citations in your preferred format.</p>
            </div>
        </div>
    `);
}

function showResearchGuide() {
    showResearchTool('Research Guide', `
        <div class="research-guide">
            <h5>Digital Archive Research Guide</h5>
            <div class="guide-section">
                <h6>Getting Started:</h6>
                <ol>
                    <li>Use the search bar for keyword searches</li>
                    <li>Filter by category, year, or document type</li>
                    <li>Use advanced search for specific criteria</li>
                    <li>Browse featured collections for highlights</li>
                </ol>
            </div>
            <div class="guide-section">
                <h6>Search Tips:</h6>
                <ul>
                    <li>Use specific keywords for better results</li>
                    <li>Try different spelling variations</li>
                    <li>Use date ranges to narrow results</li>
                    <li>Check multiple categories</li>
                </ul>
            </div>
            <div class="guide-section">
                <h6>Using Archives:</h6>
                <ul>
                    <li>Always cite your sources properly</li>
                    <li>Note the condition and quality of materials</li>
                    <li>Cross-reference with other sources</li>
                    <li>Consider historical context</li>
                </ul>
            </div>
        </div>
    `);
}

function exportSearchResults() {
    if (filteredArchives.length === 0) {
        alert('No search results to export.');
        return;
    }
    
    const csvContent = generateCSV(filteredArchives);
    downloadCSV(csvContent, 'archive_search_results.csv');
}

function requestDocument() {
    showResearchTool('Document Request', `
        <div class="document-request">
            <h5>Request Document Access</h5>
            <p>Request access to restricted documents or high-resolution versions.</p>
            <form id="documentRequestForm">
                <div class="mb-3">
                    <label for="requestName" class="form-label">Full Name</label>
                    <input type="text" class="form-control" id="requestName" required>
                </div>
                <div class="mb-3">
                    <label for="requestEmail" class="form-label">Email</label>
                    <input type="email" class="form-control" id="requestEmail" required>
                </div>
                <div class="mb-3">
                    <label for="requestAffiliation" class="form-label">Institution/Affiliation</label>
                    <input type="text" class="form-control" id="requestAffiliation">
                </div>
                <div class="mb-3">
                    <label for="requestPurpose" class="form-label">Research Purpose</label>
                    <textarea class="form-control" id="requestPurpose" rows="3" required></textarea>
                </div>
                <div class="mb-3">
                    <label for="requestDocuments" class="form-label">Requested Documents</label>
                    <textarea class="form-control" id="requestDocuments" rows="2" placeholder="List specific documents or provide archive IDs"></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Submit Request</button>
            </form>
        </div>
    `);
}

function showResearchTool(title, content) {
    const modal = new bootstrap.Modal(document.getElementById('researchToolModal'));
    document.getElementById('researchToolModalTitle').textContent = title;
    document.getElementById('researchToolModalBody').innerHTML = content;
    modal.show();
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

function generateCSV(data) {
    const headers = ['Title', 'Category', 'Date', 'Author', 'Location', 'Language', 'Format'];
    const rows = data.map(item => [
        item.title,
        item.category,
        item.date,
        item.author,
        item.location,
        item.language,
        item.format
    ]);
    
    const csvContent = [headers, ...rows]
        .map(row => row.map(field => `"${field}"`).join(','))
        .join('\n');
    
    return csvContent;
}

function downloadCSV(content, filename) {
    const blob = new Blob([content], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait for core to be loaded
    if (typeof initializeCore === 'function') {
        initializeCore();
    }
    initializeArchive();
});

// Make functions available globally
window.showArchiveModal = showArchiveModal;
window.downloadArchive = downloadArchive;
window.shareArchive = shareArchive;
window.changePage = changePage;
window.quickSearch = quickSearch;
window.showAdvancedSearch = showAdvancedSearch;
window.performAdvancedSearch = performAdvancedSearch;
window.clearAdvancedSearch = clearAdvancedSearch;
window.showCitationTool = showCitationTool;
window.showResearchGuide = showResearchGuide;
window.exportSearchResults = exportSearchResults;
window.requestDocument = requestDocument;
