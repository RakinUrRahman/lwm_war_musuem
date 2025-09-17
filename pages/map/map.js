// Merged interactive map script (adapted)
(function(){
    const museumAreas = {
        ground: [
            { id: 'entrance', name: 'Main Entrance', type: 'facility', position: { left: '45%', top: '10%', width: '10%', height: '8%' }, description: "Welcome to the Liberation War Museum. Begin your journey through Bangladesh's fight for independence.", icon: 'fa-door-open' },
            { id: 'reception', name: 'Reception Hall', type: 'facility', position: { left: '25%', top: '20%', width: '50%', height: '15%' }, description: 'Grand reception hall featuring the museum\'s mission statement and visitor orientation.', icon: 'fa-hands-helping' },
            { id: 'gallery1', name: 'Pre-Independence Gallery', type: 'exhibition', position: { left: '10%', top: '40%', width: '35%', height: '25%' }, description: 'Explore the historical context leading to the Liberation War of 1971.', icon: 'fa-landmark' },
            { id: 'gallery2', name: 'War Gallery', type: 'exhibition', position: { left: '55%', top: '40%', width: '35%', height: '25%' }, description: 'The main exhibition showcasing the nine-month Liberation War.', icon: 'fa-fighter-jet' },
            { id: 'interactive1', name: 'Interactive Timeline', type: 'interactive', position: { left: '25%', top: '70%', width: '50%', height: '15%' }, description: 'Interactive digital timeline of the Liberation War events.', icon: 'fa-tv' },
            { id: 'cafeteria', name: 'Museum Cafeteria', type: 'facility', position: { left: '75%', top: '10%', width: '20%', height: '15%' }, description: 'Relax and enjoy refreshments during your visit.', icon: 'fa-utensils' }
        ],
        first: [
            { id: 'gallery3', name: 'Heroes Gallery', type: 'exhibition', position: { left: '10%', top: '20%', width: '40%', height: '30%' }, description: 'Dedicated to the brave freedom fighters and martyrs.', icon: 'fa-medal' },
            { id: 'gallery4', name: 'International Support Gallery', type: 'exhibition', position: { left: '55%', top: '20%', width: '35%', height: '30%' }, description: 'Showcasing international support during the Liberation War.', icon: 'fa-globe-americas' },
            { id: 'interactive2', name: 'Virtual Reality Zone', type: 'interactive', position: { left: '20%', top: '55%', width: '30%', height: '20%' }, description: 'Experience historical events through virtual reality.', icon: 'fa-vr-cardboard' },
            { id: 'interactive3', name: 'Audio Story Booths', type: 'interactive', position: { left: '55%', top: '55%', width: '30%', height: '20%' }, description: 'Listen to firsthand accounts from war veterans.', icon: 'fa-headphones' },
            { id: 'library', name: 'Research Library', type: 'facility', position: { left: '10%', top: '80%', width: '35%', height: '15%' }, description: 'Extensive collection of books and documents for researchers.', icon: 'fa-book' }
        ],
        second: [
            { id: 'gallery5', name: 'Women in Liberation War', type: 'exhibition', position: { left: '15%', top: '15%', width: '35%', height: '30%' }, description: 'Highlighting the contribution of women in the Liberation War.', icon: 'fa-female' },
            { id: 'gallery6', name: 'Post-Independence Gallery', type: 'exhibition', position: { left: '55%', top: '15%', width: '35%', height: '30%' }, description: 'The journey of Bangladesh after independence.', icon: 'fa-flag' },
            { id: 'memorial', name: 'Memorial Hall', type: 'exhibition', position: { left: '25%', top: '50%', width: '50%', height: '25%' }, description: 'Solemn space dedicated to martyrs and their ultimate sacrifice.', icon: 'fa-monument' },
            { id: 'admin', name: 'Administrative Offices', type: 'restricted', position: { left: '10%', top: '80%', width: '25%', height: '15%' }, description: 'Museum administration and staff areas.', icon: 'fa-user-tie' },
            { id: 'conservation', name: 'Conservation Lab', type: 'restricted', position: { left: '65%', top: '80%', width: '25%', height: '15%' }, description: 'Artifact conservation and restoration facilities.', icon: 'fa-microscope' }
        ]
    };

    let currentFloor = 'ground';
    let currentZoom = 1;
    let currentPosition = { x: 0, y: 0 };
    let isDragging = false;
    let dragStart = { x: 0, y: 0 };

    const qs = s => document.querySelector(s);
    const qsa = s => Array.from(document.querySelectorAll(s));

    function init(){
        if(!qs('.museum-map')) return; // not on this page
        renderMuseumMap();
        setupFloorNavigation();
        setupZoomControls();
        setupMapDragging();
        attachAreaHandlers();
    }

    function renderMuseumMap(){
        const mapContainer = qs('#mapContainer');
        if(!mapContainer) return;
        const areas = museumAreas[currentFloor] || [];

        // Build floor plan + areas container
        mapContainer.innerHTML = '';
        const floorPlan = document.createElement('div');
        floorPlan.className = 'floor-plan';
        floorPlan.innerHTML = createFloorPlanSVG();

        // create area elements
        areas.forEach(area => {
            const el = document.createElement('div');
            el.className = 'map-area '+area.type;
            el.style.left = area.position.left;
            el.style.top = area.position.top;
            el.style.width = area.position.width;
            el.style.height = area.position.height;
            el.dataset.areaId = area.id;
            el.innerHTML = `<i class="fas ${area.icon}" aria-hidden="true"></i><span>${area.name}</span>`;
            floorPlan.appendChild(el);
        });

        mapContainer.appendChild(floorPlan);

        // current floor indicator (update)
        const indicator = qs('.current-floor');
        if(indicator) indicator.querySelector('span').textContent = capitalize(currentFloor) + ' Floor';

        // reset transform
        currentZoom = 1; currentPosition = { x:0, y:0 }; updateMapTransform();
    }

    function createFloorPlanSVG(){
        return `
            <svg width="100%" height="100%" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
                <rect width="800" height="600" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2"/>
                <rect x="80" y="80" width="280" height="240" fill="rgba(0,106,78,0.05)" stroke="rgba(0,106,78,0.25)" stroke-width="2" stroke-dasharray="5,5"/>
                <rect x="440" y="80" width="280" height="240" fill="rgba(0,106,78,0.05)" stroke="rgba(0,106,78,0.25)" stroke-width="2" stroke-dasharray="5,5"/>
                <rect x="160" y="400" width="480" height="120" fill="rgba(220,53,69,0.05)" stroke="rgba(220,53,69,0.25)" stroke-width="2" stroke-dasharray="5,5"/>
                <rect x="600" y="80" width="160" height="120" fill="rgba(0,123,255,0.05)" stroke="rgba(0,123,255,0.25)" stroke-width="2" stroke-dasharray="5,5"/>
                <rect x="360" y="80" width="80" height="520" fill="rgba(108,117,125,0.05)" stroke="rgba(108,117,125,0.2)" stroke-width="1"/>
                <rect x="80" y="320" width="640" height="80" fill="rgba(108,117,125,0.05)" stroke="rgba(108,117,125,0.2)" stroke-width="1"/>
                <text x="400" y="320" text-anchor="middle" font-family="Arial" font-size="16" fill="#6c757d">${capitalize(currentFloor)} Floor Plan</text>
            </svg>
        `;
    }

    function setupFloorNavigation(){
        qsa('.floor-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                qsa('.floor-btn').forEach(b=>b.classList.remove('active'));
                btn.classList.add('active');
                currentFloor = btn.dataset.floor;
                renderMuseumMap();
            });
        });
    }

    function setupZoomControls(){
        const inBtn = qs('#zoomIn'); const outBtn = qs('#zoomOut'); const resetBtn = qs('#resetView');
        if(inBtn) inBtn.addEventListener('click', ()=>{ currentZoom = Math.min(currentZoom + 0.2, 3); updateMapTransform(); });
        if(outBtn) outBtn.addEventListener('click', ()=>{ currentZoom = Math.max(currentZoom - 0.2, 0.5); updateMapTransform(); });
        if(resetBtn) resetBtn.addEventListener('click', ()=>{ currentZoom = 1; currentPosition = { x:0,y:0 }; updateMapTransform(); });
    }

    function setupMapDragging(){
        const mapContainer = qs('#mapContainer'); if(!mapContainer) return;
        mapContainer.addEventListener('mousedown', (e)=>{
            if(e.target.closest('.zoom-btn') || e.target.closest('.map-area')) return;
            isDragging = true; dragStart = { x: e.clientX - currentPosition.x, y: e.clientY - currentPosition.y }; mapContainer.style.cursor='grabbing';
        });
        document.addEventListener('mousemove', (e)=>{ if(!isDragging) return; currentPosition.x = e.clientX - dragStart.x; currentPosition.y = e.clientY - dragStart.y; updateMapTransform(); });
        document.addEventListener('mouseup', ()=>{ isDragging=false; if(qs('#mapContainer')) qs('#mapContainer').style.cursor=''; });

        // wheel zoom (Ctrl + wheel)
        qs('#mapContainer') && qs('#mapContainer').addEventListener('wheel', (e)=>{ if(!e.ctrlKey) return; e.preventDefault(); currentZoom = clamp(currentZoom + (e.deltaY>0 ? -0.1 : 0.1), 0.5, 3); updateMapTransform(); }, { passive:false });
    }

    function attachAreaHandlers(){
        // delegate: areas are recreated on floor switch — use event delegation
        const mapContainer = qs('#mapContainer'); if(!mapContainer) return;
        mapContainer.addEventListener('click', (e)=>{
            const areaEl = e.target.closest('.map-area'); if(!areaEl) return;
            const id = areaEl.dataset.areaId; const area = (museumAreas[currentFloor]||[]).find(a=>a.id===id);
            if(area) showAreaDetails(area);
        });
        mapContainer.addEventListener('mousemove', (e)=>{ const areaEl = e.target.closest('.map-area'); if(!areaEl) return; const id = areaEl.dataset.areaId; const area = (museumAreas[currentFloor]||[]).find(a=>a.id===id); if(area) showMapTooltip(e, area); });
        mapContainer.addEventListener('mouseleave', (e)=>{ hideMapTooltip(); });
    }

    function updateMapTransform(){
        const floorPlan = qs('.floor-plan'); if(!floorPlan) return;
        floorPlan.style.transform = `translate(${currentPosition.x}px, ${currentPosition.y}px) scale(${currentZoom})`;
    }

    function showAreaDetails(area){
        // Simple modal / alert for now — replace with real UI later
        alert(`${area.name}\n\nType: ${area.type}\n\n${area.description}`);
    }

    // Tooltip helpers
    function showMapTooltip(e, area){ const tt = qs('#mapTooltip'); if(!tt) return; tt.textContent = area.name; tt.hidden = false; tt.classList.add('show'); positionTooltip(e, tt); }
    function hideMapTooltip(){ const tt = qs('#mapTooltip'); if(!tt) return; tt.hidden = true; tt.classList.remove('show'); }
    function positionTooltip(e, tt){ const rect = qs('#mapContainer').getBoundingClientRect(); tt.style.left = (e.pageX - rect.left + 12) + 'px'; tt.style.top = (e.pageY - rect.top + 12) + 'px'; }

    function clamp(v,min,max){ return v<min?min:v>max?max:v; }
    function capitalize(s){ if(!s) return s; return s.charAt(0).toUpperCase() + s.slice(1); }

    document.addEventListener('DOMContentLoaded', init);
})();
