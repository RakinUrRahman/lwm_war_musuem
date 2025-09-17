// Shared core functionality for Liberation War Museum
// === Language and Dark Mode ===
// Added external JSON translation loader + missing phrase collector (2025-09-17)
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

// ===== Global Deep Translation Engine =====
// A fallback dictionary for free text (non-marked) phrases.
const GLOBAL_LEXICON = {
  en: {}, // identity
  bn: {
    'Home': 'হোম',
    'News & Updates': 'সংবাদ ও আপডেট',
    'Programs & Events': 'প্রোগ্রাম ও ইভেন্ট',
    'Media Library': 'মিডিয়া লাইব্রেরি',
    'Citizen Stories': 'নাগরিকদের গল্প',
    'Memorial Wall': 'স্মারক দেয়াল',
    'Map of Memory': 'স্মৃতির মানচিত্র',
    'Explore Artifacts': 'আর্টিফ্যাক্টস অনুসন্ধান',
    'Historical Timeline': 'ঐতিহাসিক টাইমলাইন',
    'Virtual Tour': 'ভার্চুয়াল ট্যুর',
    'Education Center': 'শিক্ষা কেন্দ্র',
    'Digital Archive': 'ডিজিটাল আর্কাইভ',
    'Book a Visit': 'ভ্রমণ বুকিং',
    'Login / Register': 'লগইন / রেজিস্টার',
    'Logout': 'লগআউট',
    'My Profile': 'আমার প্রোফাইল',
    'My Favorites': 'আমার পছন্দসমূহ',
    'Manager Dashboard': 'ম্যানেজার ড্যাশবোর্ড',
    'Committee Management': 'কমিটি ব্যবস্থাপনা',
    'Artifact Donations': 'আর্টিফ্যাক্ট দান',
    'Search': 'খুঁজুন',
    'High Contrast': 'উচ্চ কনট্রাস্ট',
    'Text Size': 'টেক্সট সাইজ',
    'Dark Mode': 'ডার্ক মোড',
    'Light Mode': 'লাইট মোড',
    'Public Visitor': 'সাধারণ দর্শক',
    'View': 'দেখুন',
    'Play': 'চালান',
    'Read More': 'আরও পড়ুন',
    'Details & Registration': 'বিস্তারিত ও নিবন্ধন',
    'Read Story': 'গল্প পড়ুন',
    'Learn More': 'আরও জানুন',
    'Artifacts': 'আর্টিফ্যাক্টস',
    'Stories': 'গল্প',
    'Events': 'ইভেন্ট',
    'Visitors': 'দর্শক',
    'Featured Programs': 'বৈশিষ্ট্যযুক্ত প্রোগ্রাম',
    'All Programs': 'সব প্রোগ্রাম',
    'Workshops': 'ওয়ার্কশপ',
    'Seminars': 'সেমিনার',
    'Exhibitions': 'প্রদর্শনী',
    'Conferences': 'কনফারেন্স',
    'Guided Tours': 'গাইডেড ট্যুর',
    'Education Center': 'শিক্ষা কেন্দ্র',
    'Learning Paths': 'লার্নিং পাথ',
    'Courses & Lessons': 'কোর্স ও পাঠ্য',
  }
};

// ===== External Translation Loader Support =====
// Expected JSON structure at /translations/<lang>.json :
// { "lexicon": { "Phrase": "Translation", ... }, "keys": { "brand.title": "..." } }
const _EXTERNAL_TRANSLATIONS_CACHE = { loaded: {} };
async function loadExternalTranslations(lang) {
  if (!lang) return;
  if (_EXTERNAL_TRANSLATIONS_CACHE.loaded[lang]) return; // already merged
  // Compute relative path: pages/<page>/<page>.html includes ../../shared/core.js so ../../translations/<lang>.json works
  const url = `../../translations/${lang}.json`;
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const json = await res.json();
    // Merge lexicon phrases
    if (json.lexicon) {
      Object.entries(json.lexicon).forEach(([phrase, translated]) => {
        GLOBAL_LEXICON[lang] = GLOBAL_LEXICON[lang] || {};
        if (!GLOBAL_LEXICON[lang][phrase]) {
          GLOBAL_LEXICON[lang][phrase] = translated;
        }
      });
    }
    // Merge optional lexicon_additions (our staged new phrases before consolidation)
    if (json.lexicon_additions) {
      Object.entries(json.lexicon_additions).forEach(([phrase, translated]) => {
        GLOBAL_LEXICON[lang] = GLOBAL_LEXICON[lang] || {};
        if (!GLOBAL_LEXICON[lang][phrase]) {
          GLOBAL_LEXICON[lang][phrase] = translated;
        }
      });
    }
    // Merge key-based translations into TRANSLATIONS
    if (json.keys) {
      Object.entries(json.keys).forEach(([k, v]) => {
        TRANSLATIONS[k] = TRANSLATIONS[k] || { en: k };
        TRANSLATIONS[k][lang] = v;
      });
    }

    // Auto-merge translations/missing.json if exists (one-time enrichment) — silent best-effort
    if (lang === 'bn') {
      try {
        const missingUrl = `../../translations/missing.json`;
        const missRes = await fetch(missingUrl, { cache: 'no-store' });
        if (missRes.ok) {
          const missJson = await missRes.json();
          if (missJson.lexicon) {
            Object.entries(missJson.lexicon).forEach(([phrase, translated]) => {
              if (!translated) return; // skip empty to avoid polluting
              GLOBAL_LEXICON[lang] = GLOBAL_LEXICON[lang] || {};
              if (!GLOBAL_LEXICON[lang][phrase]) GLOBAL_LEXICON[lang][phrase] = translated;
            });
            console.log('[LWM] Merged missing.json into bn lexicon');
          }
        }
      } catch (mergeErr) {
        console.info('[LWM] Optional missing.json merge skipped:', mergeErr.message);
      }
    }
    _EXTERNAL_TRANSLATIONS_CACHE.loaded[lang] = true;
    console.log('[LWM] External translations loaded for', lang);
  } catch (e) {
    // Fallback: mark as loaded to avoid repeated fetch attempts and continue with embedded dictionaries
    _EXTERNAL_TRANSLATIONS_CACHE.loaded[lang] = 'failed';
    console.warn('[LWM] Failed to load external translations for', lang, e, '— using embedded translations only.');
  }
}

// Developer utility to export the currently collected missing phrases (from collectMissingTranslations)
// Creates a downloadable JSON (translations/missing.json structure) in-browser.
function exportMissingTranslations() {
  const missing = window._LWM_MISSING_TRANSLATIONS || collectMissingTranslations();
  const payload = { lexicon: missing };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'missing.json';
  document.body.appendChild(a);
  a.click();
  setTimeout(()=> { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  console.log('[LWM] missing.json download triggered (populate Bangla translations and move to /translations).');
}
window.exportMissingTranslations = exportMissingTranslations;

// Utility dev helper to collect missing phrases from current DOM for English baseline
// Usage: window._LWM.collectMissingTranslations()
function collectMissingTranslations(options = {}) {
  const {
    includeLong = false, // if true, allow longer paragraphs
    maxWords = 18,       // default cap for words unless includeLong
    longMaxWords = 60    // hard cap even when includeLong
  } = options;
  const missing = {};
  const seen = new Set();
  const nodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(n) {
      if (!n.parentElement) return NodeFilter.FILTER_REJECT;
      if (n.parentElement.closest('script,style,code,pre,textarea,svg')) return NodeFilter.FILTER_REJECT;
      const txt = n.nodeValue && n.nodeValue.trim();
      if (!txt) return NodeFilter.FILTER_REJECT;
      if (txt.length < 2) return NodeFilter.FILTER_REJECT;
      // Skip if key-based translation already (data-i18n ancestor)
      if (n.parentElement.closest('[data-i18n]')) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  while (nodes.nextNode()) {
    const raw = nodes.currentNode.nodeValue.trim();
    if (seen.has(raw)) continue;
    seen.add(raw);
    // Skip if phrase already in lexicon for BN (source corpus)
    if (GLOBAL_LEXICON.bn && GLOBAL_LEXICON.bn[raw]) continue;
    // Skip if appears to be dynamic numeric only
    if (/^\d+[+%]?$/.test(raw)) continue;
    const wordCount = raw.split(/\s+/).length;
    if (!includeLong && wordCount > maxWords) continue;
    if (includeLong && wordCount > longMaxWords) continue;
    missing[raw] = '';
  }
  console.log('[LWM] Missing translation phrases draft:', missing);
  window._LWM_MISSING_TRANSLATIONS = missing;
  return missing;
}
window.collectMissingTranslations = collectMissingTranslations;

// Page-specific registration API
const PAGE_TRANSLATIONS = {}; // key -> { en, bn }
function registerPageTranslations(obj) {
  Object.keys(obj || {}).forEach(k => {
    PAGE_TRANSLATIONS[k] = PAGE_TRANSLATIONS[k] || {};
    PAGE_TRANSLATIONS[k].en = obj[k].en || PAGE_TRANSLATIONS[k].en || '';
    PAGE_TRANSLATIONS[k].bn = obj[k].bn || PAGE_TRANSLATIONS[k].bn || '';
  });
}
window.registerPageTranslations = registerPageTranslations;

// Utility to translate a single phrase using precedence: explicit key (data-i18n) -> TRANSLATIONS -> PAGE_TRANSLATIONS -> GLOBAL_LEXICON
function translatePhrase(phrase, lang) {
  if (!phrase || typeof phrase !== 'string') return phrase;
  const trimmed = phrase.trim();
  // Exact match in lexicon
  if (GLOBAL_LEXICON[lang] && GLOBAL_LEXICON[lang][trimmed]) return GLOBAL_LEXICON[lang][trimmed];
  return phrase; // fallback as-is
}

// Deep DOM translation: finds visible text nodes not already marked and replaces using lexicon (non-destructive storage of original text in data-orig)
function deepTranslate(root = document.body) {
  if (!root) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.parentElement) return NodeFilter.FILTER_REJECT;
      const p = node.parentElement;
      if (p.closest('script,style,code,pre,textarea,svg')) return NodeFilter.FILTER_REJECT;
      const text = node.nodeValue;
      if (!text || !text.trim()) return NodeFilter.FILTER_REJECT;
      // Skip if ancestor has data-i18n (already handled) or if inside an input value
      if (p.hasAttribute('data-i18n') || p.closest('[data-i18n]')) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  const lang = currentLang;
  const toUpdate = [];
  while (walker.nextNode()) { toUpdate.push(walker.currentNode); }
  toUpdate.forEach(node => {
    const original = node.parentElement.getAttribute('data-orig-text') || node.nodeValue;
    node.parentElement.setAttribute('data-orig-text', original);
    if (lang === 'en') {
      node.nodeValue = original; // restore
    } else if (lang === 'bn') {
      node.nodeValue = translatePhrase(original, 'bn');
    }
  });
}

async function setLang(lang) {
  // Load external resources first (if available)
  await loadExternalTranslations(lang);
  currentLang = lang;
  localStorage.setItem('lwm_lang', lang);
  updateLangUI();
  // Rebuild mega menu for updated labels
  const existing = document.querySelector('header.primary-nav');
  if (existing) existing.remove();
  buildMegaMenu();
  // Deep translate after rebuild ensuring external merges applied
  setTimeout(()=> deepTranslate(), 30);
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
  // Deep translate any remaining text
  deepTranslate();
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

// ====== NEW MEGA MENU CONFIGURATION (Top Horizontal Navigation) ======
// Each top-level group contains a key, label, optional subtitle, and a list of child links.
const MEGA_MENU_GROUPS = [
  {
    key: 'explore',
    label: 'Explore',
    sub: 'Reach the Mass People',
    links: [
      { page: 'home', label: 'Home', icon: 'fas fa-home' },
      { page: 'login', label: 'Login / Register', icon: 'fas fa-user' },
      { page: 'virtual-tour', label: 'Virtual Tour', icon: 'fas fa-vr-cardboard' },
      { page: 'ticket', label: 'Book a Visit', icon: 'fas fa-ticket-alt' },
      { page: 'explore', label: 'Explore Artifacts', icon: 'fas fa-archive' },
      { page: 'map', label: 'Map of Memory', icon: 'fas fa-map-marked-alt' },
      { page: 'search', label: 'Search (Global)', icon: 'fas fa-search', action: () => document.getElementById('globalSearch')?.focus() },
    ]
  },
  {
    key: 'awareness',
    label: 'Awareness',
    sub: 'Creation & Dissemination',
    links: [
      { page: 'news', label: 'News & Updates', icon: 'fas fa-newspaper' },
      { page: 'programs', label: 'Programs & Events', icon: 'fas fa-calendar-alt' },
      { page: 'media', label: 'Media Library', icon: 'fas fa-photo-video' },
      { page: 'community', label: 'Social Connect', icon: 'fas fa-hashtag' },
      { page: 'stories', label: 'Citizen Stories', icon: 'fas fa-book-open' },
      { page: 'engagement', label: 'Engagement & Students', icon: 'fas fa-user-graduate' },
    ]
  },
  {
    key: 'engage',
    label: 'Engage',
    sub: 'Societal Participation',
    links: [
      { page: 'stories', label: 'Citizen Stories', icon: 'fas fa-book-open' },
      { page: 'map', label: 'Map of Memory', icon: 'fas fa-map-marked-alt' },
      { page: 'memorial', label: 'Memorial Wall', icon: 'fas fa-monument' },
      { page: 'community', label: 'Community Programs', icon: 'fas fa-people-group' },
      { page: 'donations', label: 'Support & Share', icon: 'fas fa-donate', roles: ['manager','admin'] },
      { page: 'favorites', label: 'My Favorites', icon: 'fas fa-heart', roles: ['user','manager','admin'] },
    ]
  },
  {
    key: 'education',
    label: 'Education',
    sub: 'Learn & Research',
    links: [
      { page: 'education', label: 'Education Center', icon: 'fas fa-graduation-cap' },
      { page: 'timeline', label: 'Historical Timeline', icon: 'fas fa-history' },
      { page: 'explore', label: 'Explore Artifacts', icon: 'fas fa-archive' },
      { page: 'virtual-tour', label: 'Immersive Tour', icon: 'fas fa-vr-cardboard' },
      { page: 'archive', label: 'Digital Archive', icon: 'fas fa-database' },
      { page: 'media', label: 'Media Archive', icon: 'fas fa-folder-open' },
    ]
  },
  {
    key: 'archives',
    label: 'Archives',
    sub: 'Preserve History',
    links: [
      { page: 'archive', label: 'Digital Archive', icon: 'fas fa-database' },
      { page: 'explore', label: 'Explore Collections', icon: 'fas fa-boxes-stacked' },
      { page: 'media', label: 'Media Archive', icon: 'fas fa-film' },
      { page: 'committee', label: 'Committee', icon: 'fas fa-users', roles:['manager','admin'] },
      { page: 'manager', label: 'Manager Dashboard', icon: 'fas fa-tachometer-alt', roles:['manager','admin'] },
      { page: 'profile', label: 'My Profile', icon: 'fas fa-user-circle', roles:['user','manager','admin'] },
    ]
  }
];
window.MEGA_MENU_GROUPS = MEGA_MENU_GROUPS;

function buildMegaMenu() {
  // Remove existing header if any
  if (document.querySelector('header.primary-nav')) return; // already built
  const main = document.querySelector('.main');
  if (!main) return;
  const role = state.user ? state.user.role : 'visitor';

  const header = document.createElement('header');
  header.className = 'primary-nav';
  header.innerHTML = `
    <div class="nav-inner">
      <div class="brand-inline" role="banner">
        <div class="logo">LWM</div>
        <div>
          <h1 data-i18n="brand.title">Digital Liberation War Museum</h1>
          <div class="muted" data-i18n="brand.subtitle">Honoring Bangladesh's History</div>
        </div>
      </div>
      <ul class="mega-menu" role="menubar"></ul>
      <div class="nav-right">
        <div class="search" role="search">
          <i class="fas fa-search" aria-hidden="true"></i>
          <input id="globalSearch" placeholder="Search artifacts, stories, memorials..." aria-label="Search"/>
          <button class="btn" id="searchBtn">Search</button>
        </div>
        <div class="lang-dark" style="display:flex; gap:8px; align-items:center;">
          <button class="btn" id="darkModeToggle" style="font-size:12px; padding:6px 10px;" aria-pressed="false"><i class="fas fa-moon"></i> <span id="darkModeLabel">${document.body.classList.contains('dark-mode') ? LANG[currentLang].light : LANG[currentLang].dark}</span></button>
          <select id="langSelect" class="btn" style="font-size:12px; padding:6px 10px;">
            <option value="en" ${currentLang==='en'?'selected':''}>English</option>
            <option value="bn" ${currentLang==='bn'?'selected':''}>বাংলা</option>
          </select>
          <button class="btn" id="userMenuBtn" aria-haspopup="true" aria-expanded="false"><i class="fas fa-user"></i></button>
        </div>
      </div>
    </div>`;

  // Insert before existing topbar if present else at top of .main
  const topBar = main.querySelector('.topbar');
  if (topBar) {
    main.insertBefore(header, topBar);
    // Hide legacy topbar (we preserve for potential fallback but not display)
    topBar.style.display = 'none';
  } else {
    main.prepend(header);
  }

  const menuUL = header.querySelector('.mega-menu');
  const currentPage = (window.location.pathname.split('/').pop() || '').replace('.html','');
  MEGA_MENU_GROUPS.forEach((group, groupIndex) => {
    const li = document.createElement('li');
    li.setAttribute('role','none');
    const btn = document.createElement('button');
    btn.setAttribute('role','menuitem');
    btn.setAttribute('aria-haspopup','true');
    btn.setAttribute('aria-expanded','false');
    const groupLabel = currentLang==='bn' ? (BN_MENU_LABELS[group.key] || group.label) : group.label;
    const groupSub = currentLang==='bn' ? '' : (group.sub || ''); // optionally translate later
    btn.innerHTML = `<span class="menu-label">${groupLabel}</span><span class="menu-sub">${groupSub}</span>`;
    li.appendChild(btn);

    const panel = document.createElement('div');
    panel.className = 'dropdown-panel';
    const grid = document.createElement('div');
    grid.className = 'dropdown-grid';
    panel.appendChild(grid);

    let groupHasActive = false;
    group.links.forEach((link, linkIndex) => {
      if (link.roles && !link.roles.includes(role)) return;
      const a = document.createElement(link.action ? 'button' : 'a');
      a.className = link.action ? 'link-like-inline' : '';
      if (!link.action) a.href = link.page === 'search' ? '#' : `../${link.page}/${link.page}.html`;
      const linkLabel = currentLang==='bn' ? (BN_MENU_LABELS[link.page] || link.label) : link.label;
      a.innerHTML = `<i class="${link.icon || 'fas fa-circle'}"></i><span>${linkLabel}</span>`;
      const isActive = !link.action && link.page === currentPage;
      if (isActive) {
        a.classList.add('active-link');
        groupHasActive = true;
      }
      if (link.action) {
        a.type = 'button';
        a.addEventListener('click', (e)=>{ e.preventDefault(); link.action(); });
      } else {
        a.addEventListener('click', ()=> { if (link.page !== 'search') navigate(link.page); });
      }
      grid.appendChild(a);
    });

    if (groupHasActive) {
      btn.classList.add('active-group');
      btn.setAttribute('aria-current','true');
    }

    li.appendChild(panel);
    menuUL.appendChild(li);

    // Accessibility / open state handling
    btn.addEventListener('click', (e)=> {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      if (window.innerWidth <= 1000) {
        li.classList.toggle('open');
      }
    });

    // Keyboard navigation for top-level buttons
    btn.addEventListener('keydown', (e)=> {
      const buttons = Array.from(header.querySelectorAll('.mega-menu > li > button'));
      const idx = buttons.indexOf(btn);
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const next = buttons[(idx+1)%buttons.length];
        next.focus();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prev = buttons[(idx-1+buttons.length)%buttons.length];
        prev.focus();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        btn.setAttribute('aria-expanded','true');
        const firstLink = li.querySelector('.dropdown-grid a, .dropdown-grid button');
        if (firstLink) firstLink.focus();
      } else if (e.key === 'Escape') {
        btn.setAttribute('aria-expanded','false');
        btn.focus();
      }
    });

    // Keyboard navigation inside panel
    panel.addEventListener('keydown', (e)=> {
      const interactive = Array.from(panel.querySelectorAll('a,button'));
      const focusIndex = interactive.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = interactive[(focusIndex+1)%interactive.length];
        next.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = interactive[(focusIndex-1+interactive.length)%interactive.length];
        prev.focus();
      } else if (e.key === 'Escape') {
        const btnEl = li.querySelector('button[role="menuitem"]');
        btnEl.setAttribute('aria-expanded','false');
        btnEl.focus();
      } else if (e.key === 'ArrowLeft') {
        const buttons = Array.from(header.querySelectorAll('.mega-menu > li > button'));
        const currentBtn = li.querySelector('button');
        const idx = buttons.indexOf(currentBtn);
        const prevBtn = buttons[(idx-1+buttons.length)%buttons.length];
        prevBtn.focus();
      } else if (e.key === 'ArrowRight') {
        const buttons = Array.from(header.querySelectorAll('.mega-menu > li > button'));
        const currentBtn = li.querySelector('button');
        const idx = buttons.indexOf(currentBtn);
        const nextBtn = buttons[(idx+1)%buttons.length];
        nextBtn.focus();
      }
    });
  });

  // Close dropdown when clicking outside (desktop)
  document.addEventListener('click', (e)=> {
    if (!header.contains(e.target)) {
      header.querySelectorAll('.mega-menu > li > button[aria-expanded="true"]').forEach(b=> b.setAttribute('aria-expanded','false'));
    }
  });

  // Re-bind search + dark/lang after injecting new DOM
  initializeSearchAndToggles();
  applyDataI18n();
  deepTranslate();
}

function initializeSearchAndToggles() {
  const globalSearch = byId('globalSearch');
  const searchBtn = byId('searchBtn');
  if (globalSearch) {
    globalSearch.addEventListener('keypress', e => { if (e.key==='Enter') performSearch(globalSearch.value.toLowerCase()); });
  }
  if (searchBtn) {
    searchBtn.addEventListener('click', ()=> { const q = byId('globalSearch').value.toLowerCase(); performSearch(q); });
  }
  const langSelect = byId('langSelect');
  if (langSelect) langSelect.addEventListener('change', e=> setLang(e.target.value));
  const darkModeToggle = byId('darkModeToggle');
  if (darkModeToggle && !darkModeToggle.dataset.bound) {
    darkModeToggle.dataset.bound = '1';
    darkModeToggle.addEventListener('click', ()=> {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('lwm_dark', document.body.classList.contains('dark-mode')?'1':'0');
      const label = document.getElementById('darkModeLabel');
      if (label) label.textContent = document.body.classList.contains('dark-mode') ? LANG[currentLang].light : LANG[currentLang].dark;
    });
  }
}

function renderMenu() {
  const nav = byId('nav')
  if (!nav) {
    // Fall back to building mega menu if sidebar doesn't exist (new design)
    buildMegaMenu();
    return;
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
  const t = (s)=> currentLang==='bn' ? translatePhrase(s,'bn') : s;
  return `
    <div class="card">
      <div class="artifact-img" style="background-image:url('${a.image}')"></div>
      <h4>${t(a.title)}</h4>
      <div class="muted">${a.period} • ${t(a.origin)}</div>
      <p style="margin:8px 0;">${t(a.description)}</p>
      <div style="display:flex;gap:8px;">
        <button class="btn" style="flex:1;" onclick="viewArtifact(${a.id})">
          <i class="fas fa-eye"></i> ${t('View')}
        </button>
        <button class="btn" onclick="toggleFav(${a.id})" aria-label="${isFavorite ? t('Remove from favorites') : t('Add to favorites')}">
          <i class="${isFavorite ? 'fas' : 'far'} fa-heart" style="color: ${isFavorite ? 'var(--red)' : 'inherit'}"></i>
        </button>
      </div>
    </div>
  `
}

function mediaCard(m) {
  const t = (s)=> currentLang==='bn' ? translatePhrase(s,'bn') : s;
  return `
    <div class="card">
      <div style="height:160px;background-image:url(${m.thumb});background-size:cover;border-radius:8px;position:relative;">
        <div style="position:absolute;top:12px;right:12px;background:rgba(0,0,0,0.7);color:white;padding:4px 8px;border-radius:4px;font-size:12px;">
          ${t(m.type)}
        </div>
        <div style="position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent, rgba(0,0,0,0.7));color:white;padding:12px;">
          <h4 style="color:white;margin:0;">${t(m.title)}</h4>
        </div>
      </div>
      <div style="margin-top:12px;">
        <button class="btn" style="width:100%;" onclick="playMedia('${m.id}')">
          <i class="fas fa-play"></i> ${t('Play')}
        </button>
      </div>
    </div>
  `
}

function newsCard(n) {
  const t = (s)=> currentLang==='bn' ? translatePhrase(s,'bn') : s;
  return `
    <div class="card">
      <div class="artifact-img" style="background-image:url('${n.image}')"></div>
      <h4>${t(n.title)}</h4>
      <div class="muted">${n.date}</div>
      <p>${t(n.excerpt)}</p>
      <button class="btn" onclick="readNews('${n.id}')">
        <i class="fas fa-readme"></i> ${t('Read More')}
      </button>
    </div>
  `
}

function eventCard(e) {
  const t = (s)=> currentLang==='bn' ? translatePhrase(s,'bn') : s;
  return `
    <div class="card">
      <div class="artifact-img" style="background-image:url('${e.image}')"></div>
      <h4>${t(e.title)}</h4>
      <div class="muted"><i class="far fa-calendar-alt"></i> ${e.date}</div>
      <div class="muted"><i class="far fa-clock"></i> ${e.time}</div>
      <p>${t(e.description)}</p>
      <button class="btn" style="width:100%;" onclick="viewEvent('${e.id}')">
        <i class="fas fa-info-circle"></i> ${t('Details & Registration')}
      </button>
    </div>
  `
}

function storyCard(s) {
  const t = (v)=> currentLang==='bn' ? translatePhrase(v,'bn') : v;
  return `
    <div class="card">
      <h4>${t(s.title)}</h4>
      <div class="muted">${t('By')} ${t(s.author)}</div>
      <p>${t(s.excerpt)}</p>
      <button class="btn" onclick="readStory('${s.id}')">
        <i class="fas fa-book-open"></i> ${t('Read Story')}
      </button>
    </div>
  `
}

function memorialCard(m) {
  const t = (s)=> currentLang==='bn' ? translatePhrase(s,'bn') : s;
  return `
    <div class="card">
      <div style="height:160px;background-image:url('${m.image}');background-size:cover;border-radius:8px;"></div>
      <h4>${t(m.name)}</h4>
      <div class="muted">${t(m.role)} • ${t(m.region)}</div>
      <button class="btn" style="width:100%;margin-top:12px;" onclick="viewMemorial('${m.id}')">
        <i class="fas fa-info-circle"></i> ${t('Learn More')}
      </button>
    </div>
  `
}

// === Core Initialization ===
async function initializeCore() {
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
      // Update any duplicated dark mode label (header might have been rebuilt)
      document.querySelectorAll('#darkModeLabel').forEach(l=> {
        l.textContent = document.body.classList.contains('dark-mode') ? LANG[currentLang].light : LANG[currentLang].dark;
      });
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

  // Initial render and external translation preload
  await loadExternalTranslations(currentLang);
  renderMenu(); // Will auto switch to mega menu if sidebar omitted
  buildMegaMenu();
  updateUserUI();

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
