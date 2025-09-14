// Enhanced prototype with complete features for Liberation War Museum
// --- Language and Dark Mode ---
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
function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lwm_lang', lang);
  updateLangUI();
}
function updateLangUI() {
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
}
// --- End Language ---

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

function $(s) { return document.querySelector(s) }
function byId(id) { return document.getElementById(id) }

const MENU_ITEMS = [
  {id: 'home', label: 'Home', icon: 'fas fa-home'},
  {id: 'news', label: 'News & Updates', icon: 'fas fa-newspaper'},
  {id: 'programs', label: 'Programs & Events', icon: 'fas fa-calendar-alt'},
  {id: 'explore', label: 'Explore Artifacts', icon: 'fas fa-archive'},
  {id: 'timeline', label: 'Historical Timeline', icon: 'fas fa-history'},
  {id: 'virtual-tour', label: 'Virtual Tour', icon: 'fas fa-vr-cardboard'},
  {id: 'media', label: 'Media Library', icon: 'fas fa-photo-video'},
  {id: 'education', label: 'Education Portal', icon: 'fas fa-graduation-cap'},
  {id: 'archive', label: 'Archive System', icon: 'fas fa-book'},
  {id: 'story', label: 'Citizen Stories', icon: 'fas fa-book-open'},
  {id: 'memorial', label: 'Memorial Wall', icon: 'fas fa-monument'},
  {id: 'map', label: 'Map of Memory', icon: 'fas fa-map-marked-alt'},
  {id: 'ticket', label: 'Book Visit', icon: 'fas fa-ticket-alt'},
  {id: 'login', label: 'Login / Register', icon: 'fas fa-user', roles: ['visitor']},
  {id: 'profile', label: 'My Profile', icon: 'fas fa-user-circle', roles: ['user', 'manager', 'admin']},
  {id: 'favorites', label: 'My Favorites', icon: 'fas fa-heart', roles: ['user', 'manager', 'admin']},
  {id: 'manager', label: 'Manager Dashboard', icon: 'fas fa-tachometer-alt', roles: ['manager', 'admin']},
  {id: 'committee', label: 'Committee Management', icon: 'fas fa-users', roles: ['manager', 'admin']},
  {id: 'donations', label: 'Artifact Donations', icon: 'fas fa-donate', roles: ['manager', 'admin']},
  {id: 'logout', label: 'Logout', icon: 'fas fa-sign-out-alt', roles: ['user', 'manager', 'admin']}
]

function renderMenu() {
  const nav = byId('nav')
  nav.innerHTML = ''
  const role = state.user ? state.user.role : 'visitor'
  
  MENU_ITEMS.forEach(it => {
    if (it.roles && !it.roles.includes(role)) return
    if (!it.roles || it.roles.includes(role) || role === 'visitor' && !it.roles) {
      const el = document.createElement('div')
      el.className = 'nav-item'
      el.tabIndex = 0
      el.dataset.page = it.id
      el.innerHTML = `<i class="${it.icon}"></i> <span>${it.label}</span>`
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
  
  ;['visitor', 'user', 'manager', 'admin'].forEach(r => {
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
  renderRoute()
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

const PAGES = {
  home: HomePage,
  news: NewsPage,
  programs: ProgramsPage,
  explore: ExplorePage,
  timeline: TimelinePage,
  'virtual-tour': VirtualTourPage,
  media: MediaPage,
  education: EducationPage,
  archive: ArchivePage,
  story: StoriesPage,
  memorial: MemorialPage,
  map: MapPage,
  ticket: TicketPage,
  login: LoginPage,
  profile: ProfilePage,
  favorites: FavoritesPage,
  manager: ManagerDashboard,
  committee: CommitteeMgmt,
  donations: DonationMgmt,
  logout: LogoutPage
}

function navigate(page, opts = {}) { location.hash = '#' + page + (opts.id ? ('/' + opts.id) : '') }

function parseHash() {
  const hash = location.hash.replace(/^#/, '') || 'home'
  const [page, id] = hash.split('/')
  return { page, id }
}

function renderRoute() {
  const { page, id } = parseHash()
  document.querySelectorAll('.nav-item').forEach(n => { n.classList.toggle('active', n.dataset.page === page) })
  const cmp = PAGES[page] || HomePage
  byId('page').innerHTML = cmp({ id })
  attachPageListeners(page, id)
  const content = byId('page')
  content.style.opacity = 0
  content.classList.add('fade-in')
  setTimeout(() => { content.style.opacity = 1 }, 50)
}

window.addEventListener('hashchange', renderRoute)

// --- Pages ---
function HomePage() {
  return `
    <div>
      <div class="hero">
        <div class="hero-content">
          <h2>Honoring the Sacrifices of 1971</h2>
          <p class="muted">The Digital Liberation War Museum preserves the memory of Bangladesh's struggle for independence through digital archives, educational programs, and community engagement.</p>
          
          <div class="stats">
            <div class="stat">
              <div class="number">${state.artifacts.length}+</div>
              <div class="muted">Artifacts</div>
            </div>
            <div class="stat">
              <div class="number">${state.stories.length}+</div>
              <div class="muted">Stories</div>
            </div>
            <div class="stat">
              <div class="number">${state.events.length}</div>
              <div class="muted">Current Events</div>
            </div>
          </div>
          
          <div style="margin-top:24px">
            <button class="accent-btn" onclick="navigate('programs')">
              <i class="fas fa-calendar-alt"></i> View Programs
            </button>
            <button class="btn" style="margin-left:12px" onclick="navigate('explore')">
              <i class="fas fa-archive"></i> Explore Artifacts
            </button>
          </div>
        </div>
        
        <div class="hero-image">
          <img src="logo.png" alt="Liberation War Museum Exhibit">
        </div>
      </div>
      
      <div class="section-title">
        <i class="fas fa-newspaper"></i>
        <h3>Latest News & Announcements</h3>
      </div>
      <div class="grid">
        ${state.news.slice(0, 3).map(n => newsCard(n)).join('')}
      </div>
      <div class="text-center">
        <button class="btn" onclick="navigate('news')">
          <i class="fas fa-plus"></i> View All News
        </button>
      </div>
      
      <div class="section-title">
        <i class="fas fa-archive"></i>
        <h3>Featured Artifacts</h3>
      </div>
      <div class="grid">
        ${state.artifacts.filter(a => a.featured).slice(0, 3).map(a => artifactCard(a)).join('')}
      </div>
      <div class="text-center">
        <button class="btn" onclick="navigate('explore')">
          <i class="fas fa-plus"></i> Explore More
        </button>
      </div>
      
      <div class="section-title">
        <i class="fas fa-calendar-alt"></i>
        <h3>Upcoming Events</h3>
      </div>
      <div class="grid">
        ${state.events.slice(0, 3).map(e => eventCard(e)).join('')}
      </div>
    </div>
  `
}

function NewsPage() {
  return `
    <div>
      <h2><i class="fas fa-newspaper"></i> News & Updates</h2>
      <p class="muted">Latest announcements, program reports, and press releases from the Liberation War Museum.</p>
      
      <div class="grid">
        ${state.news.map(n => newsCard(n)).join('')}
      </div>
    </div>
  `
}

function ProgramsPage() {
  return `
    <div>
      <h2><i class="fas fa-calendar-alt"></i> Programs & Events</h2>
      <p class="muted">Educational programs, workshops, competitions, and events for students and the general public.</p>
      
      <div class="grid">
        ${state.events.map(e => eventCard(e)).join('')}
      </div>
    </div>
  `
}

function ExplorePage() {
  return `
    <div>
      <h2><i class="fas fa-archive"></i> Explore Artifacts</h2>
      <p class="muted">Browse our digital collection of artifacts from the Liberation War. Filter by type, period, or location.</p>
      
      <div style="display:flex;gap:12px;margin:20px 0;flex-wrap:wrap;">
        <button class="btn active">All</button>
        <button class="btn">Documents</button>
        <button class="btn">Photographs</button>
        <button class="btn">Weapons</button>
        <button class="btn">Personal Items</button>
      </div>
      
      <div class="grid">
        ${state.artifacts.map(a => artifactCard(a)).join('')}
      </div>
    </div>
  `
}

function TimelinePage() {
  const events = generateTimeline(12)
  return `
    <div>
      <h2><i class="fas fa-history"></i> Historical Timeline</h2>
      <p class="muted">Key events from Bangladesh's Liberation War in chronological order.</p>
      
      <div class="timeline">
        ${events.map(e => `
          <div class="timeline-event">
            <h3>${e.date}</h3>
            <div class="muted">${e.location}</div>
            <p>${e.desc}</p>
            ${e.related ? `<div><button class="link-like">View related artifacts</button></div>` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  `
}

function VirtualTourPage() {
  return `
    <div>
      <h2><i class="fas fa-vr-cardboard"></i> Virtual Museum Tour</h2>
      <p class="muted">Experience the museum from anywhere in the world with our immersive virtual tour.</p>
      
      <div class="card" style="margin-top:20px;">
        <div style="height:420px;background:#111;color:white;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:16px;">
          <i class="fas fa-vr-cardboard" style="font-size:48px;"></i>
          <div>Virtual Tour Experience Coming Soon</div>
          <button class="accent-btn">Notify Me When Available</button>
        </div>
      </div>
      
      <div class="section-title">
        <i class="fas fa-photo-video"></i>
        <h3>Tour Sections</h3>
      </div>
      
      <div class="grid">
        <div class="card">
          <div class="artifact-img" style="background-image:url('https://images.unsplash.com/photo-1586367408611-54dbbaba9557?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80')"></div>
          <h4>Gallery of Heroes</h4>
          <p class="muted">Learn about the freedom fighters who sacrificed everything for independence.</p>
          <button class="btn">Preview</button>
        </div>
        
        <div class="card">
          <div class="artifact-img" style="background-image:url('https://images.unsplash.com/photo-1596383527927-7e69b4f952ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80')"></div>
          <h4>Weapons & Equipment</h4>
          <p class="muted">See the tools and weapons used during the liberation struggle.</p>
          <button class="btn">Preview</button>
        </div>
        
        <div class="card">
          <div class="artifact-img" style="background-image:url('https://images.unsplash.com/photo-1515168833906-d2a3b82b302b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80')"></div>
          <h4>Document Archives</h4>
          <p class="muted">Explore original documents, letters, and historical records.</p>
          <button class="btn">Preview</button>
        </div>
      </div>
    </div>
  `
}

function MediaPage() {
  return `
    <div>
      <h2><i class="fas fa-photo-video"></i> Media Library</h2>
      <p class="muted">Photographs, videos, audio recordings, and oral histories from the Liberation War.</p>
      
      <div style="display:flex;gap:12px;margin:20px 0;flex-wrap:wrap;">
        <button class="btn active">All Media</button>
        <button class="btn">Photographs</button>
        <button class="btn">Videos</button>
        <button class="btn">Audio Recordings</button>
      </div>
      
      <div class="grid">
        ${state.media.map(m => mediaCard(m)).join('')}
      </div>
    </div>
  `
}

function EducationPage() {
  return `
    <div>
      <h2><i class="fas fa-graduation-cap"></i> Education Portal</h2>
      <p class="muted">Learning resources for students, teachers, and researchers of all ages.</p>
      
      <div class="grid">
        <div class="card">
          <h4><i class="fas fa-chalkboard-teacher"></i> For Schools</h4>
          <p class="muted">Lesson plans, activities, and resources for primary and secondary education.</p>
          <button class="btn">Explore</button>
        </div>
        
        <div class="card">
          <h4><i class="fas fa-university"></i> For Universities</h4>
          <p class="muted">Research materials, primary sources, and academic publications.</p>
          <button class="btn">Explore</button>
        </div>
        
        <div class="card">
          <h4><i class="fas fa-book-reader"></i> For Families</h4>
          <p class="muted">Activities and resources for learning about history as a family.</p>
          <button class="btn">Explore</button>
        </div>
      </div>
      
      <div class="section-title">
        <i class="fas fa-lightbulb"></i>
        <h3>Interactive Learning</h3>
      </div>
      
      <div class="grid">
        <div class="card">
          <h4><i class="fas fa-puzzle-piece"></i> Quizzes & Games</h4>
          <p class="muted">Test your knowledge with interactive quizzes and educational games.</p>
          <button class="btn">Try Now</button>
        </div>
        
        <div class="card">
          <h4><i class="fas fa-map-marked-alt"></i> Interactive Maps</h4>
          <p class="muted">Explore key locations and events through interactive maps.</p>
          <button class="btn">Explore</button>
        </div>
        
        <div class="card">
          <h4><i class="fas fa-vr-cardboard"></i> VR Experiences</h4>
          <p class="muted">Immerse yourself in historical events through virtual reality.</p>
          <button class="btn">Learn More</button>
        </div>
      </div>
    </div>
  `
}

function ArchivePage() {
  return `
    <div>
      <h2><i class="fas fa-book"></i> Archive System</h2>
      <p class="muted">Access our digital archives containing documents, photographs, and historical records.</p>
      
      <div class="card" style="margin-top:20px;">
        <div style="display:flex;gap:12px;">
          <div class="search" style="flex:1;">
            <i class="fas fa-search"></i>
            <input placeholder="Search archives by title, donor, location..." />
          </div>
          <button class="accent-btn">Search</button>
        </div>
        
        <div style="display:flex;gap:12px;margin-top:16px;flex-wrap:wrap;">
          <select style="flex:1; min-width:180px;">
            <option>All Collections</option>
            <option>Official Documents</option>
            <option>Personal Letters</option>
            <option>Photographs</option>
            <option>Newspaper Clippings</option>
          </select>
          
          <select style="flex:1; min-width:180px;">
            <option>All Time Periods</option>
            <option>Pre-1971</option>
            <option>1971</option>
            <option>Post-1971</option>
          </select>
          
          <select style="flex:1; min-width:180px;">
            <option>All Regions</option>
            <option>Dhaka</option>
            <option>Chittagong</option>
            <option>Khulna</option>
            <option>Rajshahi</option>
            <option>Sylhet</option>
          </select>
        </div>
      </div>
      
      <div class="section-title">
        <i class="fas fa-folder-open"></i>
        <h3>Collections</h3>
      </div>
      
      <div class="grid">
        <div class="card">
          <div class="artifact-img" style="background-image:url('https://images.unsplash.com/photo-1589652717521-10c0d092dea9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80')"></div>
          <h4>Official Documents</h4>
          <p class="muted">Government papers, declarations, and historical records.</p>
          <button class="btn">Browse Collection</button>
        </div>
        
        <div class="card">
          <div class="artifact-img" style="background-image:url('https://images.unsplash.com/photo-1515168833906-d2a3b82b302b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80')"></div>
          <h4>Personal Correspondence</h4>
          <p class="muted">Letters, diaries, and personal accounts from 1971.</p>
          <button class="btn">Browse Collection</button>
        </div>
        
        <div class="card">
          <div class="artifact-img" style="background-image:url('https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80')"></div>
          <h4>Photographic Archives</h4>
          <p class="muted">Historical photographs documenting the liberation struggle.</p>
          <button class="btn">Browse Collection</button>
        </div>
      </div>
    </div>
  `
}

function StoriesPage() {
  return `
    <div>
      <h2><i class="fas fa-book-open"></i> Citizen Stories</h2>
      <p class="muted">Personal accounts and oral histories from those who experienced the Liberation War.</p>
      
      <div class="card" style="margin:20px 0; text-align:center;">
        <h4>Share Your Story</h4>
        <p class="muted">Contribute to preserving history by sharing your experiences or those of your family.</p>
        <button class="accent-btn" onclick="navigate('login')">
          <i class="fas fa-plus-circle"></i> Submit a Story
        </button>
      </div>
      
      <div class="grid">
        ${state.stories.map(s => storyCard(s)).join('')}
      </div>
    </div>
  `
}

function MemorialPage() {
  return `
    <div>
      <h2><i class="fas fa-monument"></i> Memorial Wall</h2>
      <p class="muted">Honoring the martyrs and heroes of Bangladesh's Liberation War.</p>
      
      <div class="card" style="margin:20px 0;">
        <div style="display:flex;gap:12px;">
          <div class="search" style="flex:1;">
            <i class="fas fa-search"></i>
            <input placeholder="Search martyrs by name, region, or role..." />
          </div>
          <button class="accent-btn">Search</button>
        </div>
      </div>
      
      <div class="grid">
        ${state.memorials.map(m => memorialCard(m)).join('')}
      </div>
    </div>
  `
}

function MapPage() {
  return `
    <div>
      <h2><i class="fas fa-map-marked-alt"></i> Map of Memory</h2>
      <p class="muted">Explore key locations, events, and memorials from the Liberation War.</p>
      
      <div class="map">
        <div style="text-align:center;">
          <i class="fas fa-map-marked-alt" style="font-size:48px; margin-bottom:16px;"></i>
          <h3>Interactive Map</h3>
          <p class="muted">Explore historical locations and events</p>
          <button class="accent-btn">Launch Map</button>
        </div>
      </div>
      
      <div class="section-title">
        <i class="fas fa-map-marker-alt"></i>
        <h3>Key Locations</h3>
      </div>
      
      <div class="grid">
        <div class="card">
          <h4><i class="fas fa-landmark"></i> Historic Sites</h4>
          <p class="muted">Important locations from the liberation struggle.</p>
          <button class="btn">View on Map</button>
        </div>
        
        <div class="card">
          <h4><i class="fas fa-monument"></i> Memorials</h4>
          <p class="muted">Monuments and memorials across Bangladesh.</p>
          <button class="btn">View on Map</button>
        </div>
        
        <div class="card">
          <h4><i class="fas fa-book"></i> Museums & Archives</h4>
          <p class="muted">Institutions preserving liberation war history.</p>
          <button class="btn">View on Map</button>
        </div>
      </div>
    </div>
  `
}

function TicketPage() {
  return `
    <div>
      <h2><i class="fas fa-ticket-alt"></i> Book Your Visit</h2>
      <p class="muted">Plan your visit to the Liberation War Museum. We recommend booking in advance.</p>
      
      <div class="card" style="max-width:600px; margin:20px auto;">
        <form id="ticketForm">
          <label>Visit Date</label>
          <input type="date" name="date" required />
          
          <label>Time Slot</label>
          <select name="slot">
            <option>10:00 - 11:00</option>
            <option>11:30 - 12:30</option>
            <option>14:00 - 15:00</option>
            <option>15:30 - 16:30</option>
          </select>
          
          <label>Number of Visitors</label>
          <input type="number" name="qty" min="1" max="10" value="1" />
          
          <label>Full Name</label>
          <input type="text" name="name" required />
          
          <label>Email Address</label>
          <input type="email" name="email" required />
          
          <label>Phone Number</label>
          <input type="tel" name="phone" />
          
          <div style="margin-top:20px;">
            <button class="accent-btn" type="submit">
              <i class="fas fa-ticket-alt"></i> Book Tickets
            </button>
            <button class="btn" type="button" style="margin-left:12px;">
              Check Availability
            </button>
          </div>
        </form>
      </div>
      
      <div class="card" style="margin-top:20px;">
        <h4><i class="fas fa-info-circle"></i> Visiting Information</h4>
        <p class="muted">The museum is open from 10:00 to 17:00, Tuesday through Sunday. Closed on Mondays and government holidays.</p>
        <p class="muted">Address: Liberation War Museum, Sher-e-Bangla Nagar, Dhaka-1207, Bangladesh</p>
        <button class="btn">
          <i class="fas fa-directions"></i> Get Directions
        </button>
      </div>
    </div>
  `
}

function LoginPage() {
  return `
    <div style="max-width:480px; margin:0 auto;">
      <h2><i class="fas fa-user"></i> Login / Register</h2>
      
      <div class="card">
        <form id="authForm">
          <div style="display:flex;gap:12px;">
            <button type="button" class="accent-btn" style="flex:1;" id="loginTab">Login</button>
            <button type="button" class="btn" style="flex:1;" id="registerTab">Register</button>
          </div>
          
          <div id="loginForm" style="display:block;">
            <label>Email Address</label>
            <input type="email" name="email" required />
            
            <label>Password</label>
            <input type="password" name="password" required />
            
            <div style="display:flex;justify-content:space-between;align-items:center;margin:16px 0;">
              <label style="display:flex;align-items:center;gap:8px;margin:0;">
                <input type="checkbox" name="remember" />
                Remember me
              </label>
              
              <a href="#" class="link-like">Forgot password?</a>
            </div>
          </div>
          
          <div id="registerForm" style="display:none;">
            <label>Full Name</label>
            <input type="text" name="name" required />
            
            <label>Email Address</label>
            <input type="email" name="email" required />
            
            <label>Password</label>
            <input type="password" name="password" required />
            
            <label>Confirm Password</label>
            <input type="password" name="password2" required />
            
            <label>Role (Demo Only)</label>
            <select name="role">
              <option value="user">Registered User</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          <button class="accent-btn" type="submit" style="width:100%;">
            <i class="fas fa-sign-in-alt"></i> Continue
          </button>
        </form>
      </div>
      
      <div class="card" style="margin-top:20px; text-align:center;">
        <h4>Why Create an Account?</h4>
        <p class="muted">Registered users can save favorite artifacts, submit stories, book visits, and contribute to preserving history.</p>
      </div>
    </div>
  `
}

function ProfilePage() {
  if (!state.user) return `<div class="card"><p>Please log in to view your profile.</p><button class="accent-btn" onclick="navigate('login')">Login</button></div>`
  
  return `
    <div>
      <h2><i class="fas fa-user-circle"></i> My Profile</h2>
      
      <div class="grid">
        <div class="card">
          <h4>Personal Information</h4>
          <form id="profileForm">
            <label>Full Name</label>
            <input type="text" value="${state.user.name}" />
            
            <label>Email Address</label>
            <input type="email" value="${state.user.email}" />
            
            <label>Phone Number</label>
            <input type="tel" placeholder="Add phone number" />
            
            <label>Bio</label>
            <textarea placeholder="Tell us about yourself">${state.user.bio || ''}</textarea>
            
            <button class="accent-btn" type="submit">Save Changes</button>
          </form>
        </div>
        
        <div class="card">
          <h4>Account Overview</h4>
          <div style="display:flex;align-items:center;gap:12px;margin:16px 0;">
            <div style="width:60px;height:60px;border-radius:50%;background:var(--accent);display:flex;align-items:center;justify-content:center;color:white;font-size:24px;font-weight:700;">
              ${state.user.initials}
            </div>
            <div>
              <div style="font-weight:600;">${state.user.name}</div>
              <div class="muted">${state.user.role} • Member since 2023</div>
            </div>
          </div>
          
          <div style="margin:20px 0;">
            <div style="display:flex;justify-content:space-between;margin:12px 0;">
              <span class="muted">Favorites</span>
              <span style="font-weight:600;">${state.favorites.length} items</span>
            </div>
            
            <div style="display:flex;justify-content:space-between;margin:12px 0;">
              <span class="muted">Story Submissions</span>
              <span style="font-weight:600;">2 stories</span>
            </div>
            
            <div style="display:flex;justify-content:space-between;margin:12px 0;">
              <span class="muted">Upcoming Visits</span>
              <span style="font-weight:600;">1 booking</span>
            </div>
          </div>
          
          <button class="btn" style="width:100%;">
            <i class="fas fa-download"></i> Download Data
          </button>
        </div>
      </div>
      
      <div class="section-title">
        <i class="fas fa-history"></i>
        <h3>Recent Activity</h3>
      </div>
      
      <div class="card">
        <p class="muted">You haven't performed any actions recently.</p>
      </div>
    </div>
  `
}

function FavoritesPage() {
  if (!state.user) return `<div class="card"><p>Please log in to view your favorites.</p><button class="accent-btn" onclick="navigate('login')">Login</button></div>`
  
  const favorites = state.artifacts.filter(a => state.favorites.includes(a.id))
  
  return `
    <div>
      <h2><i class="fas fa-heart"></i> My Favorites</h2>
      <p class="muted">Artifacts, stories, and media you've saved for later.</p>
      
      ${favorites.length ? `
        <div class="grid">
          ${favorites.map(a => artifactCard(a)).join('')}
        </div>
      ` : `
        <div class="card" style="text-align:center; padding:40px 20px;">
          <i class="fas fa-heart" style="font-size:48px; color:#ddd; margin-bottom:16px;"></i>
          <h4>No favorites yet</h4>
          <p class="muted">Start exploring our collections and save items that interest you.</p>
          <button class="accent-btn" onclick="navigate('explore')">Explore Artifacts</button>
        </div>
      `}
    </div>
  `
}

function ManagerDashboard() {
  if (!state.user || !['manager', 'admin'].includes(state.user.role)) {
    return `
      <div class="card">
        <h3>Access Denied</h3>
        <p>You need manager privileges to access this page.</p>
        <button class="accent-btn" onclick="setRole('manager')">Switch to Manager Role (Demo)</button>
      </div>
    `
  }
  
  return `
    <div>
      <h2><i class="fas fa-tachometer-alt"></i> Manager Dashboard</h2>
      <p class="muted">Manage museum operations, content, and community engagement.</p>
      
      <div class="stats">
        <div class="stat">
          <div class="number">${state.artifacts.length}</div>
          <div class="muted">Artifacts</div>
        </div>
        <div class="stat">
          <div class="number">${state.stories.length}</div>
          <div class="muted">Stories</div>
        </div>
        <div class="stat">
          <div class="number">${state.events.length}</div>
          <div class="muted">Events</div>
        </div>
        <div class="stat">
          <div class="number">4</div>
          <div class="muted">Pending Tasks</div>
        </div>
      </div>
      
      <div class="grid">
        <div class="card">
          <h4><i class="fas fa-tasks"></i> Quick Actions</h4>
          <div style="display:flex;flex-direction:column;gap:12px;margin-top:16px;">
            <button class="btn" onclick="navigate('donations')">
              <i class="fas fa-donate"></i> Review Donations
            </button>
            <button class="btn" onclick="navigate('committee')">
              <i class="fas fa-users"></i> Manage Committees
            </button>
            <button class="btn">
              <i class="fas fa-calendar-plus"></i> Add New Event
            </button>
            <button class="btn">
              <i class="fas fa-chart-bar"></i> View Reports
            </button>
          </div>
        </div>
        
        <div class="card">
          <h4><i class="fas fa-bell"></i> Notifications</h4>
          <div style="margin-top:16px;">
            <div style="display:flex;align-items:center;gap:12px;padding:12px;border-bottom:1px solid rgba(0,0,0,0.05);">
              <div style="width:40px;height:40px;border-radius:50%;background:var(--accent);display:flex;align-items:center;justify-content:center;color:white;flex-shrink:0;">
                <i class="fas fa-donate"></i>
              </div>
              <div>
                <div>New artifact donation submitted</div>
                <div class="muted">2 hours ago</div>
              </div>
            </div>
            
            <div style="display:flex;align-items:center;gap:12px;padding:12px;border-bottom:1px solid rgba(0,0,0,0.05);">
              <div style="width:40px;height:40px;border-radius:50%;background:var(--accent);display:flex;align-items:center;justify-content:center;color:white;flex-shrink:0;">
                <i class="fas fa-book"></i>
              </div>
              <div>
                <div>New story awaiting moderation</div>
                <div class="muted">1 day ago</div>
              </div>
            </div>
            
            <div style="display:flex;align-items:center;gap:12px;padding:12px;">
              <div style="width:40px;height:40px;border-radius:50%;background:var(--accent);display:flex;align-items:center;justify-content:center;color:white;flex-shrink:0;">
                <i class="fas fa-ticket-alt"></i>
              </div>
              <div>
                <div>15 new visit bookings</div>
                <div class="muted">2 days ago</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="card">
          <h4><i class="fas fa-chart-line"></i> Statistics</h4>
          <div style="margin-top:16px;">
            <div style="display:flex;justify-content:space-between;margin:12px 0;">
              <span class="muted">Website Visitors</span>
              <span style="font-weight:600;">1,243 this month</span>
            </div>
            
            <div style="display:flex;justify-content:space-between;margin:12px 0;">
              <span class="muted">New Users</span>
              <span style="font-weight:600;">87 this month</span>
            </div>
            
            <div style="display:flex;justify-content:space-between;margin:12px 0;">
              <span class="muted">Ticket Bookings</span>
              <span style="font-weight:600;">42 this week</span>
            </div>
            
            <div style="display:flex;justify-content:space-between;margin:12px 0;">
              <span class="muted">Content Contributions</span>
              <span style="font-weight:600;">18 this month</span>
            </div>
          </div>
          
          <button class="btn" style="width:100%; margin-top:16px;">
            <i class="fas fa-download"></i> Download Full Report
          </button>
        </div>
      </div>
    </div>
  `
}

function CommitteeMgmt() {
  if (!state.user || !['manager', 'admin'].includes(state.user.role)) {
    return `
      <div class="card">
        <h3>Access Denied</h3>
        <p>You need manager privileges to access this page.</p>
        <button class="accent-btn" onclick="setRole('manager')">Switch to Manager Role (Demo)</button>
      </div>
    `
  }
  
  return `
    <div>
      <h2><i class="fas fa-users"></i> Thana Committee Management</h2>
      <p class="muted">Manage local committees (thana-wise): contacts, volunteer lists, events, and outreach metrics.</p>
      
      <div class="card">
        <h4>Add New Committee</h4>
        <form id="committeeForm">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
            <div>
              <label>Committee Name</label>
              <input name="cname" />
            </div>
            
            <div>
              <label>Thana / District</label>
              <input name="area" />
            </div>
          </div>
          
          <label>Contact Person</label>
          <input name="contact" />
          
          <label>Email Address</label>
          <input type="email" name="email" />
          
          <label>Phone Number</label>
          <input type="tel" name="phone" />
          
          <label>Notes</label>
          <textarea name="notes" rows="3"></textarea>
          
          <div style="margin-top:16px;">
            <button class="accent-btn" type="submit">Save Committee</button>
            <button class="btn" type="button" style="margin-left:12px;">Cancel</button>
          </div>
        </form>
      </div>
      
      <div class="section-title">
        <i class="fas fa-list"></i>
        <h3>Existing Committees</h3>
      </div>
      
      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
          <div class="search" style="width:300px;">
            <i class="fas fa-search"></i>
            <input placeholder="Search committees..." />
          </div>
          
          <select style="width:200px;">
            <option>All Districts</option>
            <option>Dhaka</option>
            <option>Chittagong</option>
            <option>Khulna</option>
          </select>
        </div>
        
        <div style="border:1px solid rgba(0,0,0,0.08);border-radius:8px;overflow:hidden;">
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr auto;background:rgba(0,0,0,0.03);padding:12px;font-weight:600;">
            <div>Committee</div>
            <div>District</div>
            <div>Contact</div>
            <div>Actions</div>
          </div>
          
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr auto;padding:12px;align-items:center;border-bottom:1px solid rgba(0,0,0,0.05);">
            <div>Dhaka Metropolitan</div>
            <div>Dhaka</div>
            <div>Abdul Rahman</div>
            <div>
              <button class="btn" style="padding:6px 10px;">
                <i class="fas fa-edit"></i>
              </button>
            </div>
          </div>
          
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr auto;padding:12px;align-items:center;border-bottom:1px solid rgba(0,0,0,0.05);">
            <div>Chittagong City</div>
            <div>Chittagong</div>
            <div>Fatima Begum</div>
            <div>
              <button class="btn" style="padding:6px 10px;">
                <i class="fas fa-edit"></i>
              </button>
            </div>
          </div>
          
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr auto;padding:12px;align-items:center;">
            <div>Khulna Division</div>
            <div>Khulna</div>
            <div>Rahim Khan</div>
            <div>
              <button class="btn" style="padding:6px 10px;">
                <i class="fas fa-edit"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}

function DonationMgmt() {
  if (!state.user || !['manager', 'admin'].includes(state.user.role)) {
    return `
      <div class="card">
        <h3>Access Denied</h3>
        <p>You need manager privileges to access this page.</p>
        <button class="accent-btn" onclick="setRole('manager')">Switch to Manager Role (Demo)</button>
      </div>
    `
  }
  
  return `
    <div>
      <h2><i class="fas fa-donate"></i> Artifact Donations</h2>
      <p class="muted">Manage artifact donations from the public. Review, approve, or reject submissions.</p>
      
      <div class="card">
        <h4>Donation Workflow</h4>
        <div style="display:flex;justify-content:space-between;margin:20px 0;text-align:center;">
          <div style="flex:1;position:relative;">
            <div style="width:40px;height:40px;border-radius:50%;background:var(--accent);display:flex;align-items:center;justify-content:center;color:white;margin:0 auto;font-weight:600;">1</div>
            <div style="margin-top:8px;">Submitted</div>
            <div style="position:absolute;top:20px;right:0;width:50%;height:2px;background:var(--accent);"></div>
          </div>
          
          <div style="flex:1;position:relative;">
            <div style="width:40px;height:40px;border-radius:50%;background:var(--accent);display:flex;align-items:center;justify-content:center;color:white;margin:0 auto;font-weight:600;">2</div>
            <div style="margin-top:8px;">Under Review</div>
            <div style="position:absolute;top:20px;left:0;width:50%;height:2px;background:var(--accent);"></div>
            <div style="position:absolute;top:20px;right:0;width:50%;height:2px;background:var(--accent);"></div>
          </div>
          
          <div style="flex:1;position:relative;">
            <div style="width:40px;height:40px;border-radius:50%;background:#eee;display:flex;align-items:center;justify-content:center;color:#999;margin:0 auto;font-weight:600;">3</div>
            <div style="margin-top:8px;">Evaluation</div>
            <div style="position:absolute;top:20px;left:0;width:50%;height:2px;background:#eee;"></div>
            <div style="position:absolute;top:20px;right:0;width:50%;height:2px;background:#eee;"></div>
          </div>
          
          <div style="flex:1;position:relative;">
            <div style="width:40px;height:40px;border-radius:50%;background:#eee;display:flex;align-items:center;justify-content:center;color:#999;margin:0 auto;font-weight:600;">4</div>
            <div style="margin-top:8px;">Completed</div>
            <div style="position:absolute;top:20px;left:0;width:50%;height:2px;background:#eee;"></div>
          </div>
        </div>
      </div>
      
      <div class="section-title">
        <i class="fas fa-tasks"></i>
        <h3>Pending Donations</h3>
      </div>
      
      <div class="grid">
        <div class="card">
          <div class="artifact-img" style="background-image:url('https://picsum.photos/seed/donate1/600/400')"></div>
          <h4>Vintage Photograph</h4>
          <div class="muted">Submitted by: Ahmed Khan</div>
          <div class="muted">Date: 2023-09-15</div>
          <div style="display:flex;gap:8px;margin-top:12px;">
            <button class="accent-btn" style="flex:1;">Approve</button>
            <button class="btn" style="flex:1;">Reject</button>
          </div>
        </div>
        
        <div class="card">
          <div class="artifact-img" style="background-image:url('https://picsum.photos/seed/donate2/600/400')"></div>
          <h4>Historical Document</h4>
          <div class="muted">Submitted by: Fatima Begum</div>
          <div class="muted">Date: 2023-09-14</div>
          <div style="display:flex;gap:8px;margin-top:12px;">
            <button class="accent-btn" style="flex:1;">Approve</button>
            <button class="btn" style="flex:1;">Reject</button>
          </div>
        </div>
        
        <div class="card">
          <div class="artifact-img" style="background-image:url('https://picsum.photos/seed/donate3/600/400')"></div>
          <h4>Personal Diary</h4>
          <div class="muted">Submitted by: Rajib Hassan</div>
          <div class="muted">Date: 2023-09-10</div>
          <div style="display:flex;gap:8px;margin-top:12px;">
            <button class="accent-btn" style="flex:1;">Approve</button>
            <button class="btn" style="flex:1;">Reject</button>
          </div>
        </div>
      </div>
    </div>
  `
}

function LogoutPage() {
  state.user = null
  localStorage.removeItem('lwm_user')
  updateUserUI()
  renderMenu()
  navigate('home')
  return `<div class="card"><p>Logging out...</p></div>`
}

// UI components
function artifactCard(a) {
  const isFavorite = state.favorites.includes(a.id)
  return `
    <div class="card">
      <div class="artifact-img" style="background-image:url('${a.image}')"></div>
      <h4>${a.title}</h4>
      <div class="muted">${a.period} • ${a.origin}</div>
      <p style="margin:8px 0;">${a.description}</p>
      <div style="display:flex;gap:8px;">
        <button class="btn" style="flex:1;" onclick="navigate('explore', {id: ${a.id}})">
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
        <button class="btn" style="width:100%;" onclick="alert('Play ${m.type}: ${m.title}')">
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
      <button class="btn" onclick="alert('Read news: ${n.title}')">
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
      <button class="btn" style="width:100%;">
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
      <button class="btn" onclick="alert('Read story: ${s.title}')">
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
      <button class="btn" style="width:100%;margin-top:12px;">
        <i class="fas fa-info-circle"></i> Learn More
      </button>
    </div>
  `
}

// Event listeners and page-specific functionality
function attachPageListeners(page, id) {
  document.querySelectorAll('[data-action="open-artifact"]').forEach(el => {
    el.addEventListener('click', () => {
      const aid = el.dataset.id
      navigate('explore', { id: aid })
    })
  })
  document.querySelectorAll('[data-action="play"]').forEach(b => {
    b.addEventListener('click', () => { alert('Play media (demo)') })
  })
  const ticketForm = byId('ticketForm')
  if (ticketForm) {
    ticketForm.addEventListener('submit', e => {
      e.preventDefault()
      alert('Ticket booked successfully! A confirmation email has been sent.')
    })
  }
  const authForm = byId('authForm')
  if (authForm) {
    const loginTab = byId('loginTab')
    const registerTab = byId('registerTab')
    const loginForm = byId('loginForm')
    const registerForm = byId('registerForm')
    if (loginTab && registerTab) {
      loginTab.addEventListener('click', () => {
        loginTab.classList.add('accent-btn')
        loginTab.classList.remove('btn')
        registerTab.classList.remove('accent-btn')
        registerTab.classList.add('btn')
        loginForm.style.display = 'block'
        registerForm.style.display = 'none'
      })
      registerTab.addEventListener('click', () => {
        registerTab.classList.add('accent-btn')
        registerTab.classList.remove('btn')
        loginTab.classList.remove('accent-btn')
        loginTab.classList.add('btn')
        registerForm.style.display = 'block'
        loginForm.style.display = 'none'
      })
    }
    authForm.addEventListener('submit', e => {
      e.preventDefault()
      const fm = new FormData(authForm)
      state.user = {
        name: fm.get('name') || 'Demo User',
        email: fm.get('email'),
        role: fm.get('role') || 'user',
        initials: (fm.get('name') || 'DU').charAt(0).toUpperCase()
      }
      localStorage.setItem('lwm_user', JSON.stringify(state.user))
      updateUserUI()
      renderMenu()
      renderRoute()
      alert('Logged in successfully as ' + state.user.role)
    })
  }
  const committeeForm = byId('committeeForm')
  if (committeeForm) {
    committeeForm.addEventListener('submit', e => {
      e.preventDefault()
      alert('Committee information saved successfully!')
    })
  }
  const donationForm = byId('donationForm')
  if (donationForm) {
    donationForm.addEventListener('submit', e => {
      e.preventDefault()
      alert('Donation submitted successfully! Thank you for your contribution.')
    })
  }
  const profileForm = byId('profileForm')
  if (profileForm) {
    profileForm.addEventListener('submit', e => {
      e.preventDefault()
      alert('Profile updated successfully!')
    })
  }
}

function performSearch(q) {
  if (!q) return navigate('explore')
  const matches = state.artifacts.filter(a => 
    a.title.toLowerCase().includes(q) || 
    a.origin.toLowerCase().includes(q) ||
    a.description.toLowerCase().includes(q)
  )
  byId('page').innerHTML = `
    <div>
      <h2>Search results for "${q}" (${matches.length})</h2>
      <div class="grid">
        ${matches.map(a => artifactCard(a)).join('')}
      </div>
    </div>
  `
  attachPageListeners()
}

function toggleFav(id) {
  if (!state.user) {
    alert('Please log in to save favorites')
    navigate('login')
    return
  }
  const index = state.favorites.indexOf(id)
  if (index > -1) { state.favorites.splice(index, 1) } else { state.favorites.push(id) }
  localStorage.setItem('lwm_favorites', JSON.stringify(state.favorites))
  renderRoute()
}

// Mock data generation
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
    s.push({ id: i, title: `Story of ${i % 2 ? 'Hope' : 'Courage'} ${i}`, author: authors[i % authors.length], excerpt: 'A personal account from the Liberation War that highlights the resilience of the Bangladeshi people...' })
  }
  return s
}
function generateMemorials(n) {
  const m = []
  const roles = ['Freedom Fighter', 'Civilian Volunteer', 'Student Leader', 'Medical Worker', 'Journalist']
  const regions = ['Dhaka', 'Chittagong', 'Khulna', 'Rajshahi', 'Sylhet', 'Barisal']
  for (let i = 1; i <= n; i++) {
    m.push({ id: i, name: `Martyr ${i % 2 ? 'Abdul' : 'Mohammad'} ${i % 3 ? 'Hossain' : 'Rahman'}`, role: roles[i % roles.length], region: regions[i % regions.length], image: `https://picsum.photos/seed/mem${i}/600/400` })
  }
  return m
}
function generateMedia(n) {
  const m = []
  const types = ['Video', 'Audio', 'Photograph']
  for (let i = 1; i <= n; i++) {
    m.push({ id: i, title: `Liberation War ${types[i % types.length]} ${i}`, type: types[i % types.length], thumb: `https://picsum.photos/seed/media${i}/600/400` })
  }
  return m
}
function generateNews(n) {
  const a = []
  for (let i = 1; i <= n; i++) {
    a.push({ id: i, title: `News Update: ${i % 2 ? 'New Exhibition' : 'Educational Program'} ${i}`, date: `2023-09-${(10 + i).toString().padStart(2, '0')}`, excerpt: 'The museum has announced new initiatives to preserve and share the history of the Liberation War.', image: `https://picsum.photos/seed/news${i}/600/400` })
  }
  return a
}
function generateEvents(n) {
  const e = []
  const types = ['Exhibition', 'Workshop', 'Seminar', 'Memorial Ceremony', 'Educational Program']
  for (let i = 1; i <= n; i++) {
    e.push({ id: i, title: `${types[i % types.length]} on Liberation War`, date: `2023-10-${(15 + i).toString().padStart(2, '0')}`, time: i % 2 ? '10:00 AM' : '2:00 PM', description: 'Join us for this special event commemorating the Liberation War and honoring those who sacrificed for our freedom.', image: `https://picsum.photos/seed/event${i}/600/400` })
  }
  return e
}
function generateTimeline(n) {
  const e = []
  const locations = ['Dhaka', 'Chittagong', 'Khulna', 'Rajshahi', 'Sylhet', 'Barisal', 'Rangpur', 'Mymensingh']
  for (let i = 0; i < n; i++) {
    e.push({ date: `1971-${(i % 12) + 1}-${(i % 28) + 1}`, location: locations[i % locations.length], desc: 'Significant event during the Liberation War that shaped the course of history for Bangladesh.', related: i % 3 === 0 })
  }
  return e
}

function escapeHtml(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') }

// Initialize the application
function initializeApp() {
  // Hamburger menu
  const hamb = byId('hamb');
  if (hamb) {
    hamb.addEventListener('click', () => {
      document.getElementById('side').classList.toggle('open')
      document.getElementById('overlay').classList.toggle('active')
    })
  }

  // Overlay close
  const overlay = byId('overlay');
  if (overlay) {
    overlay.addEventListener('click', () => {
      document.getElementById('side').classList.remove('open')
      document.getElementById('overlay').classList.remove('active')
    })
  }

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
  renderRoute()

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

// Run initialization
initializeApp();

// Expose globals
window._LWM = { state, navigate, setRole, toggleFav }
