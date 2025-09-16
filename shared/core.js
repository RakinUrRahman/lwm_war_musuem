// Shared core functionality for Liberation War Museum
// === Language and Dark Mode ===
const LANG = {
  en: {
    dark: 'Dark Mode',
    light: 'Light Mode',
    accessibility: 'Accessibility',
    options: 'Options for better viewing experience',
    highContrast: 'High Contrast',
    textSize: 'Text Size',
    language: 'Language',
    outreach: 'Outreach & Connect',
    news: 'News • Programs • Social Media',
    demoRole: 'Demo Role Selection',
    visitor: 'Public Visitor',
    login: 'Login / Register',
    logout: 'Logout',
  },
  bn: {
    dark: 'ডার্ক মোড',
    light: 'লাইট মোড',
    accessibility: 'প্রবেশযোগ্যতা',
    options: 'ভিউয়িং অভিজ্ঞতার জন্য অপশন',
    highContrast: 'উচ্চ কনট্রাস্ট',
    textSize: 'টেক্সট সাইজ',
    language: 'ভাষা',
    outreach: 'আউটরিচ ও সংযোগ',
    news: 'সংবাদ • প্রোগ্রাম • সোশ্যাল মিডিয়া',
    demoRole: 'ডেমো রোল নির্বাচন',
    visitor: 'সাধারণ দর্শক',
    login: 'লগইন / রেজিস্টার',
    logout: 'লগআউট',
  }
}

let currentLang = localStorage.getItem('lwm_lang') || 'en';

// Menu labels in Bangla for bilingual UI
const BN_MENU_LABELS = {
  'home': 'হোম',
  'news': 'সংবাদ ও আপডেট',
  'programs': 'প্রোগ্রাম ও ইভেন্ট',
  'explore': 'আর্টিফ্যাক্টস অনুসন্ধান',
  'timeline': 'ঐতিহাসিক টাইমলাইন',
  'virtual-tour': 'ভার্চুয়াল ট্যুর',
  'media': 'মিডিয়া লাইব্রেরি',
  'education': 'শিক্ষা পোর্টাল',
  'archive': 'আর্কাইভ সিস্টেম',
  'stories': 'নাগরিকদের গল্প',
  'memorial': 'স্মারক দেয়াল',
  'map': 'স্মৃতির মানচিত্র',
  'ticket': 'ভ্রমণ বুকিং',
  'login': 'লগইন / রেজিস্টার',
  'profile': 'আমার প্রোফাইল',
  'favorites': 'আমার পছন্দসমূহ',
  'manager': 'ম্যানেজার ড্যাশবোর্ড',
  'committee': 'কমিটি ব্যবস্থাপনা',
  'donations': 'আর্টিফ্যাক্ট দান',
  'logout': 'লগআউট'
};

// Generic UI translations keyed for data-i18n usage and shared UI
const TRANSLATIONS = {
  'brand.title': { en: 'Digital Liberation War Museum', bn: 'ডিজিটাল মুক্তিযুদ্ধ জাদুঘর' },
  'brand.subtitle': { en: "Honoring Bangladesh's History", bn: 'বাংলাদেশের ইতিহাসকে সম্মান' },
  'search.placeholder': { en: 'Search artifacts, stories, memorials...', bn: 'আর্টিফ্যাক্ট, গল্প, স্মৃতিস্তম্ভ খুঁজুন...' },
  'search.button': { en: 'Search', bn: 'খোঁজ করুন' },
  'footer.text': { en: '© Digital Liberation War Museum — Honoring the Sacrifices of 1971 • Prototype v2.0', bn: '© ডিজিটাল মুক্তিযুদ্ধ জাদুঘর — ১৯৭১ এর ত্যাগকে সম্মান • প্রোটোটাইপ v2.0' },
  // Home page common items (used if present)
  'home.hero.title': { en: 'Honoring the Sacrifices of 1971', bn: '১৯৭১ সালের ত্যাগকে সম্মান' },
  'home.hero.subtitle': { en: "The Digital Liberation War Museum preserves the memory of Bangladesh's struggle for independence through digital archives, educational programs, and community engagement.", bn: 'ডিজিটাল মুক্তিযুদ্ধ জাদুঘর ডিজিটাল আর্কাইভ, শিক্ষামূলক প্রোগ্রাম এবং কমিউনিটি অংশগ্রহণের মাধ্যমে বাংলাদেশের স্বাধীনতা সংগ্রামের স্মৃতি সংরক্ষণ করে।' },
  'home.timeline.1952': { en: 'Language Movement', bn: 'ভাষা আন্দোলন' },
  'home.timeline.1971': { en: 'Liberation War', bn: 'মুক্তিযুদ্ধ' },
  'home.timeline.2025': { en: 'Digital Heritage', bn: 'ডিজিটাল ঐতিহ্য' },
};

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lwm_lang', lang);
  updateLangUI();
}

function updateLangUI() {
  // Sidebar headings
  const accessIcon = document.querySelector('aside.side h4 i.fas.fa-universal-access');
  if (accessIcon && accessIcon.nextSibling) {
    accessIcon.nextSibling.textContent = ' ' + LANG[currentLang].accessibility;
  }
  const accessDesc = document.querySelector('aside.side h4 + div');
  if (accessDesc) accessDesc.textContent = LANG[currentLang].options;
  const label = document.getElementById('darkModeLabel');
  if (label) label.textContent = document.body.classList.contains('dark-mode') ? LANG[currentLang].light : LANG[currentLang].dark;
  const langSel = document.getElementById('langSelect');
  if (langSel) langSel.value = currentLang;
  const outreachIcon = document.querySelector('aside.side h4 i.fas.fa-handshake');
  if (outreachIcon && outreachIcon.nextSibling) {
    outreachIcon.nextSibling.textContent = ' ' + LANG[currentLang].outreach;
  }
  const outreachDesc = document.querySelector('aside.side h4 i.fas.fa-handshake').parentElement.nextElementSibling;
  if (outreachDesc) outreachDesc.textContent = LANG[currentLang].news;
  const nav = document.getElementById('nav');
  const demoRole = nav ? nav.querySelector('.muted') : null;
  if (demoRole) demoRole.textContent = LANG[currentLang].demoRole;
  const userStatus = document.getElementById('userStatus');
  if (!state.user && userStatus) userStatus.textContent = LANG[currentLang].visitor;

  // Brand title/subtitle
  const brandTitle = document.querySelector('.brand h1');
  if (brandTitle) brandTitle.textContent = TRANSLATIONS['brand.title'][currentLang];
  const brandSub = document.querySelector('.brand .muted');
  if (brandSub) brandSub.textContent = TRANSLATIONS['brand.subtitle'][currentLang];

  // Search placeholder and button label
  const searchInput = document.getElementById('globalSearch');
  if (searchInput) searchInput.setAttribute('placeholder', TRANSLATIONS['search.placeholder'][currentLang]);
  const searchBtn = document.getElementById('searchBtn');
  if (searchBtn) searchBtn.textContent = TRANSLATIONS['search.button'][currentLang];

  // Footer text (keep © formatting)
  const footer = document.querySelector('footer');
  if (footer) footer.innerHTML = TRANSLATIONS['footer.text'][currentLang];

  // Apply data-i18n keys across DOM
  applyDataI18n();

  // Re-render menu for language changes
  renderMenu();
}

// === Sidebar Toggle (robust, reusable) ===
function toggleSidebar(forceState) {
  const side = document.getElementById('side');
  const overlay = document.getElementById('overlay');
  if (!side || !overlay) return;
  const willOpen = typeof forceState === 'boolean' ? forceState : !side.classList.contains('open');
  side.classList.toggle('open', willOpen);
  overlay.classList.toggle('active', willOpen);
  console.log('toggleSidebar -> open:', willOpen);
}
// Expose globally so inline handlers can call it as a fallback
window.toggleSidebar = toggleSidebar;

// === Core State Management ===
const state = {
  user: JSON.parse(localStorage.getItem('lwm_user') || 'null'),
  artifacts: generateArtifacts(24),
  stories: generateStories(12),
  memorials: generateMemorials(16),
  media: generateMedia(15),
  news: generateNews(8),
  events: generateEvents(6),
  favorites: JSON.parse(localStorage.getItem('lwm_favorites') || '[]'),
  bookings: JSON.parse(localStorage.getItem('lwm_bookings') || '[]')
}

// === Utility Functions ===
function $(s) { return document.querySelector(s) }
function byId(id) { return document.getElementById(id) }

// === Navigation ===
const MENU_ITEMS = [
  { id: 'home', label: 'Home', icon: 'fas fa-home' },
  { id: 'news', label: 'News & Updates', icon: 'fas fa-newspaper' },
  { id: 'programs', label: 'Programs & Events', icon: 'fas fa-calendar-alt' },
  { id: 'community', label: 'Community', icon: 'fas fa-hands-helping' },
  { id: 'explore', label: 'Explore Artifacts', icon: 'fas fa-archive' },
  { id: 'timeline', label: 'Historical Timeline', icon: 'fas fa-history' },
  { id: 'virtual-tour', label: 'Virtual Tour', icon: 'fas fa-vr-cardboard' },
  { id: 'media', label: 'Media Library', icon: 'fas fa-photo-video' },
  { id: 'education', label: 'Education Portal', icon: 'fas fa-graduation-cap' },
  { id: 'engagement', label: 'Engagement & Students', icon: 'fas fa-user-graduate' },
  { id: 'archive', label: 'Archive System', icon: 'fas fa-book' },
  { id: 'stories', label: 'Citizen Stories', icon: 'fas fa-book-open' },
  { id: 'memorial', label: 'Memorial Wall', icon: 'fas fa-monument' },
  { id: 'map', label: 'Map of Memory', icon: 'fas fa-map-marked-alt' },
  { id: 'ticket', label: 'Book Visit', icon: 'fas fa-ticket-alt' },
  { id: 'login', label: 'Login / Register', icon: 'fas fa-user', roles: ['visitor'] },
  { id: 'profile', label: 'My Profile', icon: 'fas fa-user-circle', roles: ['user', 'manager', 'admin'] },
  { id: 'favorites', label: 'My Favorites', icon: 'fas fa-heart', roles: ['user', 'manager', 'admin'] },
  { id: 'manager', label: 'Manager Dashboard', icon: 'fas fa-tachometer-alt', roles: ['manager', 'admin'] },
  { id: 'committee', label: 'Committee Management', icon: 'fas fa-users', roles: ['manager', 'admin'] },
  { id: 'donations', label: 'Artifact Donations', icon: 'fas fa-donate', roles: ['manager', 'admin'] },
  { id: 'logout', label: 'Logout', icon: 'fas fa-sign-out-alt', roles: ['user', 'manager', 'admin'] }
]

// Expose menu items globally to avoid load-order/scoping issues
window.MENU_ITEMS = MENU_ITEMS;

function renderMenu() {
  const nav = byId('nav')
  if (!nav) {
    console.warn('[LWM] #nav container not found — skipping menu render')
    return
  }
  nav.innerHTML = ''
  const role = state.user ? state.user.role : 'visitor'
  const items = Array.isArray(window.MENU_ITEMS) ? window.MENU_ITEMS : []
  if (!items.forEach) {
    console.error('[LWM] MENU_ITEMS missing or invalid — menu will not be rendered')
    return
  }

  items.forEach(it => {
    if (it.roles && !it.roles.includes(role)) return
    if (!it.roles || it.roles.includes(role) || role === 'visitor' && !it.roles) {
      const el = document.createElement('div')
      el.className = 'nav-item'
      el.tabIndex = 0
      el.dataset.page = it.id
      const label = currentLang === 'bn' ? (BN_MENU_LABELS[it.id] || it.label) : it.label
      el.innerHTML = `<i class="${it.icon}"></i> <span>${label}</span>`
      el.addEventListener('click', () => navigate(it.id))
      el.addEventListener('keypress', e => { if (e.key === 'Enter') navigate(it.id) })
      nav.appendChild(el)
    }
  })

  // Demo role selector for testing
  const hr = document.createElement('hr')
  hr.style.margin = '16px 0'
  nav.appendChild(hr)

  const rs = document.createElement('div')
  rs.innerHTML = `<div class="muted" style="font-size:13px; margin-bottom:8px;">Demo Role Selection</div>`
  const roleButtons = document.createElement('div')
  roleButtons.style.display = 'flex'
  roleButtons.style.flexWrap = 'wrap'
  roleButtons.style.gap = '6px'

  const roles = ['visitor', 'user', 'manager', 'admin']
  roles.forEach(r => {
    const b = document.createElement('button')
    b.className = 'btn'
    b.style.fontSize = '12px'
    b.style.padding = '6px 10px'
    b.textContent = r
    b.addEventListener('click', () => setRole(r))
    roleButtons.appendChild(b)
  })

  rs.appendChild(roleButtons)
  nav.appendChild(rs)
}

function navigate(page, opts = {}) {
  // Navigate to different pages using per-page filenames
  // All pages live under /pages/<page>/<page>.html and this script runs from /pages/<current>/
  const target = `../${page}/${page}.html`;
  window.location.href = target;
}

function setRole(r) {
  if (r === 'visitor') {
    state.user = null
  } else {
    state.user = {
      name: 'Demo User',
      email: 'user@example.com',
      role: r,
      initials: r.charAt(0).toUpperCase()
    }
  }
  localStorage.setItem('lwm_user', JSON.stringify(state.user))
  updateUserUI()
  renderMenu()
}

function updateUserUI() {
  const userStatus = byId('userStatus')
  const userInitials = byId('userInitials')

  if (state.user) {
    userStatus.textContent = state.user.name
    userInitials.textContent = state.user.initials
  } else {
    userStatus.textContent = 'Public Visitor'
    userInitials.textContent = 'PV'
  }
}

// === Search Functionality ===
function performSearch(q) {
  if (!q) return navigate('explore')

  const matches = state.artifacts.filter(a =>
    a.title.toLowerCase().includes(q) ||
    a.origin.toLowerCase().includes(q) ||
    a.description.toLowerCase().includes(q)
  )

  window.location.href = `../explore/explore.html?search=${encodeURIComponent(q)}`
}

function toggleFav(id) {
  if (!state.user) {
    alert('Please log in to save favorites')
    navigate('login')
    return
  }

  const index = state.favorites.indexOf(id)
  if (index > -1) {
    state.favorites.splice(index, 1)
  } else {
    state.favorites.push(id)
  }
  localStorage.setItem('lwm_favorites', JSON.stringify(state.favorites))

  // Refresh the current page if needed
  if (typeof refreshFavorites === 'function') {
    refreshFavorites()
  }
}

// === Data Generation Functions ===
function generateArtifacts(n) {
  const arr = []
  const types = ['Document', 'Photograph', 'Weapon', 'Personal Item', 'Uniform', 'Medal']
  const origins = ['Dhaka', 'Chittagong', 'Khulna', 'Rajshahi', 'Sylhet', 'Barisal', 'Rangpur', 'Mymensingh']

  for (let i = 1; i <= n; i++) {
    arr.push({
      id: i,
      title: `Historical ${types[i % types.length]} ${i}`,
      image: `https://picsum.photos/seed/art${i}/600/400`,
      period: `1971`,
      origin: `${origins[i % origins.length]} District`,
      materials: 'Paper/Ink',
      dimensions: 'Various',
      status: i % 3 ? 'On display' : 'In storage',
      description: 'This important artifact from the Liberation War represents the struggle and sacrifice of our people.',
      featured: i % 5 === 0
    })
  }
  return arr
}

function generateStories(n) {
  const s = []
  const authors = ['Ahmed Khan', 'Fatima Begum', 'Abdul Rahman', 'Sultana Ahmed', 'Mohammad Hassan', 'Ayesha Choudhury']

  for (let i = 1; i <= n; i++) {
    s.push({
      id: i,
      title: `Story of ${i % 2 ? 'Hope' : 'Courage'} ${i}`,
      author: authors[i % authors.length],
      excerpt: 'A personal account from the Liberation War that highlights the resilience of the Bangladeshi people...'
    })
  }
  return s
}

function generateMemorials(n) {
  const m = []
  const roles = ['Freedom Fighter', 'Civilian Volunteer', 'Student Leader', 'Medical Worker', 'Journalist']
  const regions = ['Dhaka', 'Chittagong', 'Khulna', 'Rajshahi', 'Sylhet', 'Barisal']

  for (let i = 1; i <= n; i++) {
    m.push({
      id: i,
      name: `Martyr ${i % 2 ? 'Abdul' : 'Mohammad'} ${i % 3 ? 'Hossain' : 'Rahman'}`,
      role: roles[i % roles.length],
      region: regions[i % regions.length],
      image: `https://picsum.photos/seed/mem${i}/600/400`
    })
  }
  return m
}

function generateMedia(n) {
  const m = []
  const types = ['Video', 'Audio', 'Photograph']

  for (let i = 1; i <= n; i++) {
    m.push({
      id: i,
      title: `Liberation War ${types[i % types.length]} ${i}`,
      type: types[i % types.length],
      thumb: `https://picsum.photos/seed/media${i}/600/400`
    })
  }
  return m
}

function generateNews(n) {
  const a = []
  for (let i = 1; i <= n; i++) {
    a.push({
      id: i,
      title: `News Update: ${i % 2 ? 'New Exhibition' : 'Educational Program'} ${i}`,
      date: `2023-09-${(10 + i).toString().padStart(2, '0')}`,
      excerpt: 'The museum has announced new initiatives to preserve and share the history of the Liberation War.',
      image: `https://picsum.photos/seed/news${i}/600/400`
    })
  }
  return a
}

function generateEvents(n) {
  const e = []
  const types = ['Exhibition', 'Workshop', 'Seminar', 'Memorial Ceremony', 'Educational Program']

  for (let i = 1; i <= n; i++) {
    e.push({
      id: i,
      title: `${types[i % types.length]} on Liberation War`,
      date: `2023-10-${(15 + i).toString().padStart(2, '0')}`,
      time: i % 2 ? '10:00 AM' : '2:00 PM',
      description: 'Join us for this special event commemorating the Liberation War and honoring those who sacrificed for our freedom.',
      image: `https://picsum.photos/seed/event${i}/600/400`
    })
  }
  return e
}

function generateTimeline(n) {
  const e = []
  const locations = ['Dhaka', 'Chittagong', 'Khulna', 'Rajshahi', 'Sylhet', 'Barisal', 'Rangpur', 'Mymensingh']

  for (let i = 0; i < n; i++) {
    e.push({
      date: `1971-${(i % 12) + 1}-${(i % 28) + 1}`,
      location: locations[i % locations.length],
      desc: 'Significant event during the Liberation War that shaped the course of history for Bangladesh.',
      related: i % 3 === 0
    })
  }
  return e
}

// === UI Component Functions ===
function artifactCard(a) {
  const isFavorite = state.favorites.includes(a.id)
  return `
    <div class="card">
      <div class="artifact-img" style="background-image:url('${a.image}')"></div>
      <h4>${a.title}</h4>
      <div class="muted">${a.period} • ${a.origin}</div>
      <p style="margin:8px 0;">${a.description}</p>
      <div style="display:flex;gap:8px;">
        <button class="btn" style="flex:1;" onclick="viewArtifact(${a.id})">
          <i class="fas fa-eye"></i> View
        </button>
        <button class="btn" onclick="toggleFav(${a.id})" aria-label="${isFavorite ? 'Remove from favorites' : 'Add to favorites'}">
          <i class="${isFavorite ? 'fas' : 'far'} fa-heart" style="color: ${isFavorite ? 'var(--red)' : 'inherit'}"></i>
        </button>
      </div>
    </div>
  `
}

function mediaCard(m) {
  return `
    <div class="card">
      <div style="height:160px;background-image:url(${m.thumb});background-size:cover;border-radius:8px;position:relative;">
        <div style="position:absolute;top:12px;right:12px;background:rgba(0,0,0,0.7);color:white;padding:4px 8px;border-radius:4px;font-size:12px;">
          ${m.type}
        </div>
        <div style="position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent, rgba(0,0,0,0.7));color:white;padding:12px;">
          <h4 style="color:white;margin:0;">${m.title}</h4>
        </div>
      </div>
      <div style="margin-top:12px;">
        <button class="btn" style="width:100%;" onclick="playMedia('${m.id}')">
          <i class="fas fa-play"></i> Play
        </button>
      </div>
    </div>
  `
}

function newsCard(n) {
  return `
    <div class="card">
      <div class="artifact-img" style="background-image:url('${n.image}')"></div>
      <h4>${n.title}</h4>
      <div class="muted">${n.date}</div>
      <p>${n.excerpt}</p>
      <button class="btn" onclick="readNews('${n.id}')">
        <i class="fas fa-readme"></i> Read More
      </button>
    </div>
  `
}

function eventCard(e) {
  return `
    <div class="card">
      <div class="artifact-img" style="background-image:url('${e.image}')"></div>
      <h4>${e.title}</h4>
      <div class="muted"><i class="far fa-calendar-alt"></i> ${e.date}</div>
      <div class="muted"><i class="far fa-clock"></i> ${e.time}</div>
      <p>${e.description}</p>
      <button class="btn" style="width:100%;" onclick="viewEvent('${e.id}')">
        <i class="fas fa-info-circle"></i> Details & Registration
      </button>
    </div>
  `
}

function storyCard(s) {
  return `
    <div class="card">
      <h4>${s.title}</h4>
      <div class="muted">By ${s.author}</div>
      <p>${s.excerpt}</p>
      <button class="btn" onclick="readStory('${s.id}')">
        <i class="fas fa-book-open"></i> Read Story
      </button>
    </div>
  `
}

function memorialCard(m) {
  return `
    <div class="card">
      <div style="height:160px;background-image:url('${m.image}');background-size:cover;border-radius:8px;"></div>
      <h4>${m.name}</h4>
      <div class="muted">${m.role} • ${m.region}</div>
      <button class="btn" style="width:100%;margin-top:12px;" onclick="viewMemorial('${m.id}')">
        <i class="fas fa-info-circle"></i> Learn More
      </button>
    </div>
  `
}

// === Core Initialization ===
function initializeCore() {
  console.log('initializeCore called');

  // Wait a bit for all elements to be ready
  setTimeout(() => {
    // Manual test to check if sidebar works
    window.testSidebar = function () {
      const side = document.getElementById('side');
      const overlay = document.getElementById('overlay');
      if (side && overlay) {
        side.classList.add('open');
        overlay.classList.add('active');
        console.log('Manual sidebar test - opened');
        setTimeout(() => {
          side.classList.remove('open');
          overlay.classList.remove('active');
          console.log('Manual sidebar test - closed');
        }, 2000);
      }
    };

    // Hamburger menu
    const hamb = byId('hamb');
    if (hamb) {
      console.log('Hamburger button found, adding listener'); // Debug log
      // Bind in capture phase to avoid other handlers (like ripple) swallowing the event
      hamb.addEventListener('click', (e) => {
        console.log('Hamburger button clicked!');
        e.preventDefault();
        e.stopPropagation();
        toggleSidebar();
      }, true)
    } else {
      console.log('Hamburger button not found!'); // Debug log
    }

    // Overlay close
    const overlay = byId('overlay');
    if (overlay) {
      overlay.addEventListener('click', () => toggleSidebar(false))
    }
  }, 100);

  // Search functionality
  const globalSearch = byId('globalSearch');
  const searchBtn = byId('searchBtn');

  if (globalSearch) {
    globalSearch.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        const q = globalSearch.value.toLowerCase();
        performSearch(q);
      }
    })
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const q = byId('globalSearch').value.toLowerCase()
      performSearch(q)
    })
  }

  // Accessibility controls
  const contrastToggle = byId('contrastToggle');
  if (contrastToggle) {
    contrastToggle.addEventListener('click', () => {
      document.body.classList.toggle('high-contrast')
    })
  }

  const textSizeToggle = byId('textSizeToggle');
  if (textSizeToggle) {
    textSizeToggle.addEventListener('click', () => {
      alert(currentLang === 'bn' ? 'টেক্সট সাইজ অপশন এখানে আসবে' : 'Text size options would appear here')
    })
  }

  const darkModeToggle = byId('darkModeToggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const label = document.getElementById('darkModeLabel');
      if (label) label.textContent = document.body.classList.contains('dark-mode') ? LANG[currentLang].light : LANG[currentLang].dark;
      localStorage.setItem('lwm_dark', document.body.classList.contains('dark-mode') ? '1' : '0');
    });
  }

  // Language selector
  const langSelect = byId('langSelect');
  if (langSelect) {
    langSelect.addEventListener('change', e => setLang(e.target.value));
  }

  // Restore dark mode
  if (localStorage.getItem('lwm_dark') === '1') {
    document.body.classList.add('dark-mode');
  }

  // Initial render
  renderMenu()
  updateUserUI()

  // Language and dark mode setup
  setTimeout(() => {
    const sel = document.getElementById('langSelect');
    if (sel) { sel.value = currentLang; updateLangUI(); }
    if (localStorage.getItem('lwm_dark') === '1') {
      document.body.classList.add('dark-mode');
      const label = document.getElementById('darkModeLabel');
      if (label) label.textContent = LANG[currentLang].light;
    }
  }, 100);
}

// Global delegated handlers as a robustness fallback
document.addEventListener('click', (e) => {
  // Toggle sidebar when clicking hamburger (works even if per-page listener didn't bind)
  let hambBtn = null;
  if (e.target.id === 'hamb') {
    hambBtn = e.target;
  } else if (e.target.closest) {
    hambBtn = e.target.closest('#hamb');
  }

  if (hambBtn) {
    e.preventDefault();
    e.stopPropagation();
    toggleSidebar();
    return;
  }

  // Close when clicking overlay (delegated)
  if (e.target.id === 'overlay') {
    toggleSidebar(false);
    console.log('Overlay clicked, sidebar closed'); // Debug log
  }
});

// Apply translations to any element with [data-i18n]
function applyDataI18n() {
  const nodes = document.querySelectorAll('[data-i18n]');
  nodes.forEach(node => {
    const key = node.getAttribute('data-i18n');
    if (!key) return;
    const t = TRANSLATIONS[key];
    if (!t) return;
    if (node.placeholder !== undefined && node.tagName === 'INPUT') {
      node.placeholder = t[currentLang] || node.placeholder;
    } else {
      node.textContent = t[currentLang] || node.textContent;
    }
  });
  // Home-specific ids if present
  const ht = document.getElementById('heroTitle');
  if (ht && TRANSLATIONS['home.hero.title']) ht.textContent = TRANSLATIONS['home.hero.title'][currentLang];
  const hs = document.getElementById('heroSubtitle');
  if (hs && TRANSLATIONS['home.hero.subtitle']) hs.textContent = TRANSLATIONS['home.hero.subtitle'][currentLang];
  document.querySelectorAll('.timeline-item .timeline-content').forEach(el => {
    const txt = el.textContent.trim();
    const map = {
      'Language Movement': 'home.timeline.1952',
      'Liberation War': 'home.timeline.1971',
      'Digital Heritage': 'home.timeline.2025',
      'ভাষা আন্দোলন': 'home.timeline.1952',
      'মুক্তিযুদ্ধ': 'home.timeline.1971',
      'ডিজিটাল ঐতিহ্য': 'home.timeline.2025'
    };
    const key = map[txt];
    if (key && TRANSLATIONS[key]) el.textContent = TRANSLATIONS[key][currentLang];
  });
}

// Placeholder functions for actions (to be implemented in individual pages)
function viewArtifact(id) { alert(`View artifact ${id}`) }
function playMedia(id) { alert(`Play media ${id}`) }
function readNews(id) { alert(`Read news ${id}`) }
function viewEvent(id) { alert(`View event ${id}`) }
function readStory(id) { alert(`Read story ${id}`) }
function viewMemorial(id) { alert(`View memorial ${id}`) }

// Initialize core functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  console.log('Core.js initializing...');
  initializeCore();
});

// Also initialize if DOM is already loaded (fallback)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeCore);
} else {
  console.log('DOM already loaded, initializing core immediately');
  initializeCore();
}

// Expose globals
window._LWM = { state, navigate, setRole, toggleFav, LANG, currentLang, setLang }
