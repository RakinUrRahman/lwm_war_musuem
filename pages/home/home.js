// Home Page Functionality
(function() {
  'use strict';

  // Home page specific functions
  function loadHomeContent() {
    // Update statistics with actual data
    updateStatistics();
    
    // Load latest news
    loadLatestNews();
    
    // Load featured artifacts
    loadFeaturedArtifacts();
    
    // Load upcoming events
    loadUpcomingEvents();
  }

  function updateStatistics() {
    const artifactCount = document.getElementById('artifactCount');
    const storyCount = document.getElementById('storyCount');
    const eventCount = document.getElementById('eventCount');

    if (window._LWM && window._LWM.state) {
      if (artifactCount) artifactCount.textContent = window._LWM.state.artifacts.length + '+';
      if (storyCount) storyCount.textContent = window._LWM.state.stories.length + '+';
      if (eventCount) eventCount.textContent = window._LWM.state.events.length;
    }
  }

  function loadLatestNews() {
    const newsGrid = document.getElementById('newsGrid');
    if (!newsGrid || !window._LWM || !window._LWM.state) return;

    const latestNews = window._LWM.state.news.slice(0, 3);
    newsGrid.innerHTML = latestNews.map(n => newsCard(n)).join('');
  }

  function loadFeaturedArtifacts() {
    const featuredGrid = document.getElementById('featuredGrid');
    if (!featuredGrid || !window._LWM || !window._LWM.state) return;

    const featuredArtifacts = window._LWM.state.artifacts.filter(a => a.featured).slice(0, 3);
    featuredGrid.innerHTML = featuredArtifacts.map(a => artifactCard(a)).join('');
  }

  function loadUpcomingEvents() {
    const eventsGrid = document.getElementById('eventsGrid');
    if (!eventsGrid || !window._LWM || !window._LWM.state) return;

    const upcomingEvents = window._LWM.state.events.slice(0, 3);
    eventsGrid.innerHTML = upcomingEvents.map(e => eventCard(e)).join('');
  }

  // Home page specific navigation override
  function navigate(page) {
    // Navigate to per-page filenames from within /pages/home/
    const target = `../${page}/${page}.html`;
    window.location.href = target;
  }

  // Home page specific action handlers
  function readNews(id) {
    navigate('news');
  }

  function viewArtifact(id) {
    navigate('explore');
  }

  function viewEvent(id) {
    navigate('programs');
  }

  // Override global navigation for home page
  window.navigate = navigate;
  window.readNews = readNews;
  window.viewArtifact = viewArtifact;
  window.viewEvent = viewEvent;

  // Initialize home page when DOM is ready
  function initHomePage() {
    // Wait for core to be loaded
    if (window._LWM) {
      loadHomeContent();
    } else {
      // Retry after a short delay
      setTimeout(initHomePage, 100);
    }
  }

  // Set the active nav item for home
  function setActiveNav() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.dataset.page === 'home') {
        item.classList.add('active');
      }
    });
  }

  // Initialize when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(() => {
        initHomePage();
        setActiveNav();
      }, 200);
    });
  } else {
    setTimeout(() => {
      initHomePage();
      setActiveNav();
    }, 200);
  }

  // Add some home page specific animations
  function addAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeInUp 0.6s ease-out';
        }
      });
    });

    // Observe grid sections
    const grids = document.querySelectorAll('.grid');
    grids.forEach(grid => observer.observe(grid));
  }

  // Initialize animations after content is loaded
  setTimeout(addAnimations, 500);

})();
