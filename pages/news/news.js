// News Page Functionality
let currentNewsFilter = 'all';
let currentNewsPage = 1;
const newsPerPage = 6;
let allNewsData = [];

// Initialize news page
function initializeNewsPage() {
  loadNewsData();
  setupNewsFilters();
  setupPagination();
  renderNews();
}

// Load news data
function loadNewsData() {
  // Generate news data if not exists
  if (!state.news || state.news.length === 0) {
    state.news = generateNewsData();
    localStorage.setItem('lwm_state', JSON.stringify(state));
  }
  allNewsData = state.news;
}

// Generate sample news data
function generateNewsData() {
  const newsTypes = [
    'announcements',
    'programs', 
    'exhibitions',
    'press-releases',
    'news'
  ];

  const newsTitles = {
    announcements: [
      'Museum Reopening After Renovation',
      'New Gallery Opening Ceremony',
      'Special Holiday Hours',
      'Temporary Closure Notice',
      'New Educational Program Launch'
    ],
    programs: [
      'Student History Workshop',
      'Veterans Day Commemoration',
      'Independence Day Program',
      'Victory Day Celebration',
      'International Mother Language Day'
    ],
    exhibitions: [
      'Rare Artifacts from 1971',
      'Heroes of Liberation War',
      'Women in Freedom Struggle',
      'International Support for Bangladesh',
      'Liberation War Photography'
    ],
    'press-releases': [
      'Museum Wins Heritage Award',
      'Digital Archive Project Launch',
      'Partnership with Educational Institutions',
      'New Research Publication',
      'International Recognition'
    ],
    news: [
      'Visitor Milestone Reached',
      'New Museum App Released',
      'Scholarship Program Announcement',
      'Cultural Exchange Program',
      'Memorial Service Updates'
    ]
  };

  const news = [];
  let id = 1;

  newsTypes.forEach(type => {
    newsTitles[type].forEach((title, index) => {
      news.push({
        id: id++,
        title: title,
        excerpt: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.`,
        content: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                 <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                 <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>`,
        type: type,
        image: `https://picsum.photos/400/300?random=${id}`,
        date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
        author: `Author ${Math.floor(Math.random() * 5) + 1}`,
        featured: index < 2
      });
    });
  });

  return news.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Setup news filters
function setupNewsFilters() {
  const filterButtons = document.querySelectorAll('.news-filters .btn');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Update current filter
      currentNewsFilter = button.dataset.filter;
      currentNewsPage = 1; // Reset to first page
      
      // Re-render news
      renderNews();
      updatePagination();
    });
  });
}

// Filter news by type
function getFilteredNews() {
  if (currentNewsFilter === 'all') {
    return allNewsData;
  }
  return allNewsData.filter(news => news.type === currentNewsFilter);
}

// Get paginated news
function getPaginatedNews() {
  const filteredNews = getFilteredNews();
  const startIndex = (currentNewsPage - 1) * newsPerPage;
  const endIndex = startIndex + newsPerPage;
  return filteredNews.slice(startIndex, endIndex);
}

// Render news cards
function renderNews() {
  const newsGrid = document.getElementById('newsGrid');
  const paginatedNews = getPaginatedNews();
  
  if (paginatedNews.length === 0) {
    newsGrid.innerHTML = `
      <div class="col-12 text-center">
        <p class="text-muted">${LANG[currentLang].noNewsFound || 'No news found for this category.'}</p>
      </div>
    `;
    return;
  }
  
  newsGrid.innerHTML = paginatedNews.map(news => 
    newsCard(news, true) // true for detailed view
  ).join('');
  
  // Add click listeners for read more buttons
  newsGrid.querySelectorAll('.read-more-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const newsId = parseInt(e.target.dataset.newsId);
      showNewsModal(newsId);
    });
  });
}

// Enhanced news card function
function newsCard(news, detailed = false) {
  const typeLabels = {
    announcements: 'Announcement',
    programs: 'Program',
    exhibitions: 'Exhibition',
    'press-releases': 'Press Release',
    news: 'News'
  };

  return `
    <div class="col-md-6 col-lg-4">
      <div class="card news-card h-100">
        <div class="news-image" style="background-image: url('${news.image}')">
          <span class="news-badge">${typeLabels[news.type] || 'News'}</span>
        </div>
        <div class="card-body">
          <h5 class="card-title">${news.title}</h5>
          <div class="news-meta">
            <span><i class="fas fa-calendar-alt"></i> ${formatDate(news.date)}</span>
            <span><i class="fas fa-user"></i> ${news.author}</span>
          </div>
          <p class="news-excerpt text-muted">${news.excerpt}</p>
          <button class="btn btn-outline-primary read-more-btn" data-news-id="${news.id}">
            <i class="fas fa-arrow-right me-2"></i>Read More
          </button>
        </div>
      </div>
    </div>
  `;
}

// Show news detail modal
function showNewsModal(newsId) {
  const news = allNewsData.find(n => n.id === newsId);
  if (!news) return;
  
  const modal = document.getElementById('newsModal');
  const modalTitle = document.getElementById('modalNewsTitle');
  const modalContent = document.getElementById('modalNewsContent');
  
  modalTitle.textContent = news.title;
  modalContent.innerHTML = `
    <div class="news-image mb-3" style="background-image: url('${news.image}'); height: 300px;"></div>
    <div class="news-meta mb-3">
      <span><i class="fas fa-calendar-alt"></i> ${formatDate(news.date)}</span>
      <span><i class="fas fa-user"></i> ${news.author}</span>
      <span><i class="fas fa-tag"></i> ${news.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
    </div>
    ${news.content}
  `;
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close news modal
function closeNewsModal() {
  const modal = document.getElementById('newsModal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Setup pagination
function setupPagination() {
  updatePagination();
  
  // Add click listeners for pagination buttons
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('page-btn')) {
      const page = parseInt(e.target.dataset.page);
      if (page && page !== currentNewsPage) {
        currentNewsPage = page;
        renderNews();
        updatePagination();
        
        // Scroll to top of news section
        document.querySelector('.page-header').scrollIntoView({ 
          behavior: 'smooth' 
        });
      }
    }
    
    if (e.target.classList.contains('prev-btn')) {
      if (currentNewsPage > 1) {
        currentNewsPage--;
        renderNews();
        updatePagination();
      }
    }
    
    if (e.target.classList.contains('next-btn')) {
      const totalPages = Math.ceil(getFilteredNews().length / newsPerPage);
      if (currentNewsPage < totalPages) {
        currentNewsPage++;
        renderNews();
        updatePagination();
      }
    }
  });
}

// Update pagination display
function updatePagination() {
  const filteredNews = getFilteredNews();
  const totalPages = Math.ceil(filteredNews.length / newsPerPage);
  const paginationContainer = document.getElementById('newsPagination');
  
  if (totalPages <= 1) {
    paginationContainer.innerHTML = '';
    return;
  }
  
  let paginationHTML = `
    <button class="btn prev-btn" ${currentNewsPage === 1 ? 'disabled' : ''}>
      <i class="fas fa-chevron-left"></i>
    </button>
  `;
  
  // Show page numbers
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentNewsPage - 2 && i <= currentNewsPage + 2)) {
      paginationHTML += `
        <button class="btn page-btn ${i === currentNewsPage ? 'active' : ''}" data-page="${i}">
          ${i}
        </button>
      `;
    } else if (i === currentNewsPage - 3 || i === currentNewsPage + 3) {
      paginationHTML += `<span class="pagination-dots">...</span>`;
    }
  }
  
  paginationHTML += `
    <button class="btn next-btn" ${currentNewsPage === totalPages ? 'disabled' : ''}>
      <i class="fas fa-chevron-right"></i>
    </button>
  `;
  
  paginationContainer.innerHTML = paginationHTML;
}

// Format date helper
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('news-modal')) {
    closeNewsModal();
  }
});

// Close modal on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeNewsModal();
  }
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Wait for core to be loaded
  if (typeof initializeCore === 'function') {
    initializeCore();
  }
  initializeNewsPage();
});

// Make functions available globally for modal
window.closeNewsModal = closeNewsModal;
