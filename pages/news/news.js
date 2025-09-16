// News Page Functionality - Interactive Enhancements
let currentNewsFilter = 'all';
let currentNewsPage = 1;
const newsPerPage = 6;
let allNewsData = [];
let bookmarks = new Set(JSON.parse(localStorage.getItem('lwm_news_bookmarks') || '[]'));
let likes = JSON.parse(localStorage.getItem('lwm_news_likes') || '{}');
let currentSearch = '';
let modalCurrentIndex = -1; // index within current filtered list

function initializeNewsPage() {
  loadNewsData();
  hydrateLikesDefaults();
  buildBreakingTicker();
  setupNewsFilters();
  setupToolbar();
  setupFeaturedSlider();
  setupPagination();
  renderNews();
  attachGlobalHandlers();
  hardenLocalHamburger();
}

function loadNewsData() {
  if (!window.state) window.state = {};
  if (!state.news || state.news.length === 0) {
    state.news = generateNewsData();
    localStorage.setItem('lwm_state', JSON.stringify(state));
  }
  allNewsData = state.news;
}

function generateNewsData() {
  const newsTypes = ['announcements','programs','exhibitions','press-releases','news'];
  const newsTitles = {
    announcements: ['Museum Reopening After Renovation','New Gallery Opening Ceremony','Special Holiday Hours','Temporary Closure Notice','New Educational Program Launch'],
    programs: ['Student History Workshop','Veterans Day Commemoration','Independence Day Program','Victory Day Celebration','International Mother Language Day'],
    exhibitions: ['Rare Artifacts from 1971','Heroes of Liberation War','Women in Freedom Struggle','International Support for Bangladesh','Liberation War Photography'],
    'press-releases': ['Museum Wins Heritage Award','Digital Archive Project Launch','Partnership with Educational Institutions','New Research Publication','International Recognition'],
    news: ['Visitor Milestone Reached','New Museum App Released','Scholarship Program Announcement','Cultural Exchange Program','Memorial Service Updates']
  };
  const imgSeeds = [101,102,103,104,105,106,107,108,109,110];
  const news = [];
  let id = 1;
  newsTypes.forEach(type => {
    newsTitles[type].forEach((title, index) => {
      const seed = imgSeeds[(id-1) % imgSeeds.length];
      news.push({
        id: id++,
        title,
        excerpt: `Explore updates from the Liberation War Museum: initiatives, events, and milestones shaping how we remember 1971.`,
        content: `<p>${title} — The Liberation War Museum continues to honor the sacrifices of 1971 through education, research, and public engagement.</p>
                  <p>From community programs to archival digitization, we strive to preserve memories and foster understanding for new generations.</p>
                  <p>Learn more about upcoming events, exhibitions, and opportunities to get involved.</p>`,
        type,
        image: `https://picsum.photos/seed/${seed}/600/400`,
        date: new Date(2025, Math.floor(Math.random()*9), Math.floor(Math.random()*28)+1).toISOString().split('T')[0],
        author: `Editor ${Math.floor(Math.random()*5)+1}`,
        featured: index < 2,
        likes: Math.floor(Math.random()*50)+5
      });
    });
  });
  return news.sort((a,b)=> new Date(b.date)-new Date(a.date));
}

function hydrateLikesDefaults() {
  allNewsData.forEach(n => {
    if (!(n.id in likes)) likes[n.id] = n.likes || 0;
  });
  localStorage.setItem('lwm_news_likes', JSON.stringify(likes));
}

function buildBreakingTicker() {
  const track = document.getElementById('tickerTrack');
  if (!track) return;
  const items = allNewsData.slice(0, 10).map(n => `<span class="ticker-item"><i class="fas fa-bolt"></i><strong>${escapeHtml(n.title)}</strong> · ${formatDate(n.date)}</span>`);
  // Duplicate for seamless loop
  track.innerHTML = items.concat(items).join('');
}

function setupNewsFilters() {
  const container = document.getElementById('newsFilters');
  if (!container) return;
  container.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    container.querySelectorAll('button').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    currentNewsFilter = btn.dataset.filter || 'all';
    currentNewsPage = 1;
    renderNews();
    updatePagination();
  });
}

function setupToolbar() {
  const input = document.getElementById('newsSearchInput');
  const clearBtn = document.getElementById('clearSearchBtn');
  const toggleViewBtn = document.getElementById('toggleViewBtn');
  if (input) {
    input.addEventListener('input', () => {
      currentSearch = input.value.trim();
      currentNewsPage = 1;
      renderNews();
      updatePagination();
    });
  }
  if (clearBtn) {
    clearBtn.addEventListener('click', ()=>{
      currentSearch = '';
      if (input) input.value='';
      renderNews();
      updatePagination();
    });
  }
  if (toggleViewBtn) {
    toggleViewBtn.addEventListener('click', ()=>{
      const grid = document.getElementById('newsGrid');
      grid.classList.toggle('compact');
      const pressed = grid.classList.contains('compact');
      toggleViewBtn.setAttribute('aria-pressed', pressed ? 'true' : 'false');
    });
  }
}

function setupFeaturedSlider() {
  const track = document.getElementById('featuredTrack');
  if (!track) return;
  const featured = allNewsData.filter(n=>n.featured).slice(0,6);
  track.innerHTML = featured.map(n=> `
    <article class="featured-card" data-id="${n.id}">
      <div class="image" style="background-image:url('${n.image}')"></div>
      <div class="info">
        <div class="muted" style="font-size:12px">${formatDate(n.date)}</div>
        <div style="font-weight:600">${escapeHtml(n.title)}</div>
      </div>
    </article>
  `).join('');
  track.addEventListener('click', (e)=>{
    const card = e.target.closest('.featured-card');
    if (!card) return;
    const id = parseInt(card.dataset.id);
    showNewsModal(id);
  });
  const prev = document.getElementById('featuredPrev');
  const next = document.getElementById('featuredNext');
  const scrollBy = () => track.scrollBy({left: 240, behavior: 'smooth'});
  if (prev) prev.addEventListener('click', ()=> track.scrollBy({left: -240, behavior: 'smooth'}));
  if (next) next.addEventListener('click', scrollBy);
}

function getFilteredNews() {
  let list = allNewsData;
  if (currentNewsFilter === 'bookmarks') {
    list = list.filter(n => bookmarks.has(n.id));
  } else if (currentNewsFilter !== 'all') {
    list = list.filter(n => n.type === currentNewsFilter);
  }
  if (currentSearch) {
    const q = currentSearch.toLowerCase();
    list = list.filter(n => n.title.toLowerCase().includes(q) || n.excerpt.toLowerCase().includes(q) || n.author.toLowerCase().includes(q));
  }
  return list;
}

function getPaginatedNews() {
  const filtered = getFilteredNews();
  const start = (currentNewsPage-1)*newsPerPage;
  const end = start + newsPerPage;
  return filtered.slice(start, end);
}

function renderNews() {
  const grid = document.getElementById('newsGrid');
  const items = getPaginatedNews();
  if (!grid) return;
  if (items.length === 0) {
    grid.innerHTML = `<div class="text-center"><p class="text-muted">${(window.LANG && window.LANG[currentLang]?.noNewsFound) || 'No news found.'}</p></div>`;
    return;
  }
  grid.innerHTML = items.map(n => newsCard(n)).join('');
  // Attach delegated handlers
  grid.querySelectorAll('.read-more-btn').forEach(btn => btn.addEventListener('click', (e)=>{
    const id = parseInt(e.currentTarget.dataset.newsId);
    showNewsModal(id);
  }));
  grid.querySelectorAll('.reaction-like').forEach(btn => btn.addEventListener('click', (e)=>{
    const id = parseInt(e.currentTarget.dataset.id);
    likes[id] = (likes[id]||0) + 1;
    localStorage.setItem('lwm_news_likes', JSON.stringify(likes));
    e.currentTarget.querySelector('.count').textContent = likes[id];
    e.currentTarget.classList.add('active');
  }));
  grid.querySelectorAll('.reaction-bookmark').forEach(btn => btn.addEventListener('click', (e)=>{
    const id = parseInt(e.currentTarget.dataset.id);
    if (bookmarks.has(id)) bookmarks.delete(id); else bookmarks.add(id);
    localStorage.setItem('lwm_news_bookmarks', JSON.stringify([...bookmarks]));
    e.currentTarget.classList.toggle('active');
  }));
  grid.querySelectorAll('.reaction-share').forEach(btn => btn.addEventListener('click', (e)=>{
    const id = parseInt(e.currentTarget.dataset.id);
    shareNews(id);
  }));
}

function highlight(text, query) {
  if (!query) return escapeHtml(text);
  const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig');
  return escapeHtml(text).replace(re, '<mark>$1</mark>');
}

function newsCard(n) {
  const typeLabels = {announcements:'Announcement', programs:'Program', exhibitions:'Exhibition', 'press-releases':'Press Release', news:'News'};
  return `
  <div class="card news-card h-100">
    <div class="news-image" style="background-image:url('${n.image}')">
      <span class="news-badge">${typeLabels[n.type] || 'News'}</span>
    </div>
    <div class="card-body">
      <h5 class="card-title">${highlight(n.title, currentSearch)}</h5>
      <div class="news-meta"><span><i class="fas fa-calendar-alt"></i> ${formatDate(n.date)}</span><span><i class="fas fa-user"></i> ${escapeHtml(n.author)}</span></div>
      <p class="news-excerpt text-muted">${highlight(n.excerpt, currentSearch)}</p>
      <div class="news-actions">
        <div>
          <button class="btn reaction-btn reaction-like" data-id="${n.id}" aria-label="Like"><i class="fas fa-heart"></i> <span class="count">${likes[n.id]||0}</span></button>
          <button class="btn reaction-btn reaction-bookmark ${bookmarks.has(n.id)?'active':''}" data-id="${n.id}" aria-label="Bookmark"><i class="fas fa-bookmark"></i></button>
          <button class="btn reaction-btn reaction-share" data-id="${n.id}" aria-label="Share"><i class="fas fa-share"></i></button>
        </div>
        <button class="btn btn-outline-primary read-more-btn" data-news-id="${n.id}"><i class="fas fa-arrow-right me-2"></i>Read More</button>
      </div>
    </div>
  </div>`;
}

function showNewsModal(newsId) {
  const list = getFilteredNews();
  const idx = list.findIndex(n => n.id === newsId);
  if (idx === -1) return;
  modalCurrentIndex = idx;
  const n = list[idx];
  const modal = document.getElementById('newsModal');
  const title = document.getElementById('modalNewsTitle');
  const content = document.getElementById('modalNewsContent');
  title.textContent = n.title;
  content.innerHTML = `
    <div class="news-image mb-3" style="background-image:url('${n.image}'); height:300px;"></div>
    <div class="news-meta mb-3"><span><i class="fas fa-calendar-alt"></i> ${formatDate(n.date)}</span><span><i class="fas fa-user"></i> ${escapeHtml(n.author)}</span><span><i class="fas fa-tag"></i> ${n.type.replace('-', ' ')}</span></div>
    ${n.content}`;
  const likeBtn = document.getElementById('modalLike');
  const likeCount = document.getElementById('modalLikeCount');
  const bookmarkBtn = document.getElementById('modalBookmark');
  const bookmarkLabel = document.getElementById('modalBookmarkLabel');
  likeCount.textContent = likes[n.id]||0;
  likeBtn.onclick = ()=>{ likes[n.id]=(likes[n.id]||0)+1; likeCount.textContent=likes[n.id]; localStorage.setItem('lwm_news_likes', JSON.stringify(likes)); };
  const saved = bookmarks.has(n.id);
  bookmarkLabel.textContent = saved? 'Saved' : 'Save';
  bookmarkBtn.classList.toggle('active', saved);
  bookmarkBtn.onclick = ()=>{ if (bookmarks.has(n.id)) {bookmarks.delete(n.id);} else {bookmarks.add(n.id);} localStorage.setItem('lwm_news_bookmarks', JSON.stringify([...bookmarks])); bookmarkLabel.textContent = bookmarks.has(n.id)?'Saved':'Save'; bookmarkBtn.classList.toggle('active', bookmarks.has(n.id)); };
  const shareBtn = document.getElementById('shareNewsBtn');
  if (shareBtn) shareBtn.onclick = ()=> shareNews(n.id);
  setupReadProgress();
  bindModalNav();
  modal.classList.add('active');
  document.body.style.overflow='hidden';
}

function bindModalNav() {
  const prev = document.getElementById('modalPrev');
  const next = document.getElementById('modalNext');
  prev.onclick = ()=> navigateModal(-1);
  next.onclick = ()=> navigateModal(1);
  const dec = document.getElementById('decreaseFont');
  const inc = document.getElementById('increaseFont');
  const content = document.getElementById('modalNewsContent');
  let fontSize = 16;
  dec.onclick = ()=>{ fontSize = Math.max(14, fontSize-1); content.style.fontSize = fontSize+'px'; };
  inc.onclick = ()=>{ fontSize = Math.min(22, fontSize+1); content.style.fontSize = fontSize+'px'; };
}

function navigateModal(delta) {
  const list = getFilteredNews();
  if (modalCurrentIndex === -1) return;
  modalCurrentIndex += delta;
  if (modalCurrentIndex < 0) modalCurrentIndex = list.length-1;
  if (modalCurrentIndex >= list.length) modalCurrentIndex = 0;
  showNewsModal(list[modalCurrentIndex].id);
}

function setupReadProgress() {
  const container = document.querySelector('.news-modal-content');
  const body = document.getElementById('modalNewsContent');
  const bar = document.getElementById('readProgress');
  const onScroll = ()=>{
    const max = body.scrollHeight - body.clientHeight;
    const pct = max>0 ? (body.scrollTop / max) * 100 : 0;
    bar.style.width = pct + '%';
  };
  body.removeEventListener('scroll', body._progressListener);
  body._progressListener = onScroll;
  body.addEventListener('scroll', onScroll);
  onScroll();
}

function closeNewsModal() {
  const modal = document.getElementById('newsModal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow='auto';
}

function setupPagination() {
  updatePagination();
  document.addEventListener('click', (e)=>{
    const pageBtn = e.target.closest('.page-btn');
    if (pageBtn) {
      const page = parseInt(pageBtn.dataset.page);
      if (page && page !== currentNewsPage) {
        currentNewsPage = page; renderNews(); updatePagination();
        document.querySelector('.page-header')?.scrollIntoView({behavior:'smooth'});
      }
    }
    if (e.target.closest('.prev-btn')) {
      if (currentNewsPage>1){ currentNewsPage--; renderNews(); updatePagination(); }
    }
    if (e.target.closest('.next-btn')) {
      const total = Math.ceil(getFilteredNews().length / newsPerPage);
      if (currentNewsPage<total){ currentNewsPage++; renderNews(); updatePagination(); }
    }
  });
}

function updatePagination() {
  const filtered = getFilteredNews();
  const totalPages = Math.ceil(filtered.length / newsPerPage);
  const container = document.getElementById('pagination');
  if (!container) return;
  if (totalPages <= 1) { container.innerHTML=''; return; }
  let html = `<button class="btn prev-btn" ${currentNewsPage===1?'disabled':''}><i class="fas fa-chevron-left"></i></button>`;
  for (let i=1;i<=totalPages;i++){
    if (i===1 || i===totalPages || (i>=currentNewsPage-2 && i<=currentNewsPage+2)){
      html += `<button class="btn page-btn ${i===currentNewsPage?'active':''}" data-page="${i}">${i}</button>`;
    } else if (i===currentNewsPage-3 || i===currentNewsPage+3) {
      html += `<span class="pagination-dots">...</span>`;
    }
  }
  html += `<button class="btn next-btn" ${currentNewsPage===totalPages?'disabled':''}><i class="fas fa-chevron-right"></i></button>`;
  container.innerHTML = html;
}

function formatDate(dateString) {
  const d = new Date(dateString);
  return d.toLocaleDateString('en-US', {year:'numeric', month:'long', day:'numeric'});
}

function escapeHtml(str=''){ return str.replace(/[&<>"] /g, s=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"," ":"&nbsp;"}[s])); }

function shareNews(id){
  const n = allNewsData.find(x=>x.id===id);
  if (!n) return;
  const shareData = {
    title: n.title,
    text: `${n.title} — ${n.excerpt}`,
    url: location.href.split('#')[0] + `#news-${n.id}`
  };
  if (navigator.share) {
    navigator.share(shareData).catch(()=>{});
  } else {
    navigator.clipboard?.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
    alert('Link copied to clipboard');
  }
}

function attachGlobalHandlers(){
  document.addEventListener('click', (e)=>{ if (e.target.classList.contains('news-modal')) closeNewsModal(); });
  document.addEventListener('keydown', (e)=>{ if (e.key==='Escape') closeNewsModal(); });
}

function hardenLocalHamburger(){
  const hamb = document.getElementById('hamb');
  const side = document.getElementById('side');
  const overlay = document.getElementById('overlay');
  if (!hamb || !side || !overlay) return;
  const toggle = (open)=>{
    side.classList.toggle('open', open ?? !side.classList.contains('open'));
    overlay.classList.toggle('show', side.classList.contains('open'));
  };
  const capture = (ev)=>{
    ev.preventDefault(); ev.stopPropagation(); if (ev.stopImmediatePropagation) ev.stopImmediatePropagation(); toggle();
    Promise.resolve().then(()=> toggle(side.classList.contains('open')));
  };
  hamb.addEventListener('click', capture, true);
  overlay.addEventListener('click', ()=> toggle(false));
}

document.addEventListener('DOMContentLoaded', ()=>{
  if (typeof initializeCore === 'function') initializeCore();
  initializeNewsPage();
});

window.closeNewsModal = closeNewsModal;
