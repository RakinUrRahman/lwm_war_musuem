// Explore Page Functionality
let currentFloor = 'ground';
let currentCollection = 'all';
let allCollectionsData = [];
let museumAreas = {};

// Initialize explore page
function initializeExplorePage() {
  loadExploreData();
  setupFloorNavigation();
  setupCollectionFilters();
  renderMuseumMap();
  renderGalleryHighlights();
  renderCollections();
}

// Load explore data
function loadExploreData() {
  // Generate collections data if not exists
  if (!state.collections || state.collections.length === 0) {
    state.collections = generateCollectionsData();
    localStorage.setItem('lwm_state', JSON.stringify(state));
  }
  allCollectionsData = state.collections;
  
  // Define museum areas
  museumAreas = generateMuseumAreas();
}

// Generate museum areas data
function generateMuseumAreas() {
  return {
    ground: [
      {
        id: 'entrance',
        name: 'Main Entrance',
        type: 'facility',
        position: { left: '45%', top: '10%', width: '10%', height: '8%' },
        description: 'Welcome to the Liberation War Museum. Begin your journey through Bangladesh\'s fight for independence.',
        facilities: ['Information Desk', 'Ticket Counter', 'Security Check', 'Coat Room']
      },
      {
        id: 'reception',
        name: 'Reception Hall',
        type: 'facility',
        position: { left: '25%', top: '20%', width: '50%', height: '15%' },
        description: 'Grand reception hall featuring the museum\'s mission statement and visitor orientation.',
        facilities: ['Information Boards', 'Audio Guide Rental', 'Brochures', 'Meet Point']
      },
      {
        id: 'gallery1',
        name: 'Pre-Independence Gallery',
        type: 'exhibition',
        position: { left: '10%', top: '40%', width: '35%', height: '25%' },
        description: 'Explore the historical context leading to the Liberation War of 1971.',
        artifacts: 126,
        highlights: ['Colonial Period Documents', 'Language Movement Artifacts', 'Political Movement Materials']
      },
      {
        id: 'gallery2',
        name: 'War Gallery',
        type: 'exhibition',
        position: { left: '55%', top: '40%', width: '35%', height: '25%' },
        description: 'The main exhibition showcasing the nine-month Liberation War.',
        artifacts: 248,
        highlights: ['Military Equipment', 'Freedom Fighter Profiles', 'Battle Maps']
      },
      {
        id: 'interactive1',
        name: 'Interactive Timeline',
        type: 'interactive',
        position: { left: '25%', top: '70%', width: '50%', height: '15%' },
        description: 'Interactive digital timeline of the Liberation War events.',
        features: ['Touch Screen Interface', 'Multimedia Content', 'Multiple Languages']
      },
      {
        id: 'cafeteria',
        name: 'Museum Cafeteria',
        type: 'facility',
        position: { left: '75%', top: '10%', width: '20%', height: '15%' },
        description: 'Relax and enjoy refreshments during your visit.',
        facilities: ['Traditional Snacks', 'Beverages', 'Seating Area', 'Books Corner']
      }
    ],
    first: [
      {
        id: 'gallery3',
        name: 'Heroes Gallery',
        type: 'exhibition',
        position: { left: '10%', top: '20%', width: '40%', height: '30%' },
        description: 'Dedicated to the brave freedom fighters and martyrs.',
        artifacts: 189,
        highlights: ['Personal Belongings', 'Photographs', 'Letters and Diaries']
      },
      {
        id: 'gallery4',
        name: 'International Support Gallery',
        type: 'exhibition',
        position: { left: '55%', top: '20%', width: '35%', height: '30%' },
        description: 'Showcasing international support during the Liberation War.',
        artifacts: 94,
        highlights: ['Diplomatic Documents', 'Foreign Media Coverage', 'Support Letters']
      },
      {
        id: 'interactive2',
        name: 'Virtual Reality Zone',
        type: 'interactive',
        position: { left: '20%', top: '55%', width: '30%', height: '20%' },
        description: 'Experience historical events through virtual reality.',
        features: ['VR Headsets', 'Historic Battle Simulations', 'Guided VR Tours']
      },
      {
        id: 'interactive3',
        name: 'Audio Story Booths',
        type: 'interactive',
        position: { left: '55%', top: '55%', width: '30%', height: '20%' },
        description: 'Listen to firsthand accounts from war veterans.',
        features: ['Private Listening Booths', 'Multiple Stories', 'Bengali and English']
      },
      {
        id: 'library',
        name: 'Research Library',
        type: 'facility',
        position: { left: '10%', top: '80%', width: '35%', height: '15%' },
        description: 'Extensive collection of books and documents for researchers.',
        facilities: ['Books', 'Research Papers', 'Digital Archives', 'Reading Area']
      }
    ],
    second: [
      {
        id: 'gallery5',
        name: 'Women in Liberation War',
        type: 'exhibition',
        position: { left: '15%', top: '15%', width: '35%', height: '30%' },
        description: 'Highlighting the contribution of women in the Liberation War.',
        artifacts: 156,
        highlights: ['Women Freedom Fighters', 'Support Activities', 'Personal Stories']
      },
      {
        id: 'gallery6',
        name: 'Post-Independence Gallery',
        type: 'exhibition',
        position: { left: '55%', top: '15%', width: '35%', height: '30%' },
        description: 'The journey of Bangladesh after independence.',
        artifacts: 78,
        highlights: ['Nation Building', 'Reconstruction Efforts', 'Modern Bangladesh']
      },
      {
        id: 'memorial',
        name: 'Memorial Hall',
        type: 'exhibition',
        position: { left: '25%', top: '50%', width: '50%', height: '25%' },
        description: 'Solemn space dedicated to martyrs and their ultimate sacrifice.',
        artifacts: 89,
        highlights: ['Martyr Profiles', 'Eternal Flame', 'Memorial Wall']
      },
      {
        id: 'admin',
        name: 'Administrative Offices',
        type: 'restricted',
        position: { left: '10%', top: '80%', width: '25%', height: '15%' },
        description: 'Museum administration and staff areas.',
        facilities: ['Staff Offices', 'Meeting Rooms', 'Storage']
      },
      {
        id: 'conservation',
        name: 'Conservation Lab',
        type: 'restricted',
        position: { left: '65%', top: '80%', width: '25%', height: '15%' },
        description: 'Artifact conservation and restoration facilities.',
        facilities: ['Conservation Equipment', 'Research Lab', 'Storage Vault']
      }
    ]
  };
}

// Generate collections data
function generateCollectionsData() {
  const collections = [];
  let id = 1;

  const collectionTypes = [
    {
      type: 'artifacts',
      items: [
        'Freedom Fighter\'s Helmet', 'Military Radio', 'Liberation War Medal', 'Soldier\'s Diary',
        'Battle Flag', 'Field Communication Device', 'Freedom Fighter Badge', 'War Memorial Plaque'
      ]
    },
    {
      type: 'documents',
      items: [
        'Independence Declaration', 'Diplomatic Correspondence', 'Military Orders', 'War Diary Pages',
        'International Support Letters', 'Treaty Documents', 'Government Records', 'Personal Letters'
      ]
    },
    {
      type: 'photographs',
      items: [
        'Liberation War Battles', 'Freedom Fighter Groups', 'Civilian Life During War', 'Victory Celebration',
        'International Support', 'Refugee Camps', 'War Destruction', 'Post-War Reconstruction'
      ]
    },
    {
      type: 'weapons',
      items: [
        'Guerrilla Fighter Rifle', 'Military Ammunition', 'Communication Equipment', 'Survival Gear',
        'Handmade Weapons', 'Military Uniform', 'Combat Boots', 'Field Medical Kit'
      ]
    },
    {
      type: 'uniforms',
      items: [
        'Freedom Fighter Uniform', 'Military Officer Dress', 'Civilian Volunteer Clothes', 'Medical Corps Uniform',
        'Student Activist Outfit', 'Women Fighter Dress', 'Traditional Fighter Wear', 'Victory Day Attire'
      ]
    }
  ];

  collectionTypes.forEach(category => {
    category.items.forEach((item, index) => {
      collections.push({
        id: id++,
        name: item,
        type: category.type,
        description: `A significant ${category.type.slice(0, -1)} from the 1971 Liberation War of Bangladesh. This item represents the struggle and sacrifice of the freedom fighters.`,
        fullDescription: `This ${item.toLowerCase()} is a remarkable piece from our ${category.type} collection. It was ${getRandomOrigin()} and represents an important aspect of Bangladesh's Liberation War. The item has been carefully preserved and authenticated by our expert historians and conservators.\n\nHistorical Context:\nThis piece dates back to the 1971 Liberation War and provides insight into the daily lives and struggles of those who fought for Bangladesh's independence. Such items help us understand the resourcefulness, determination, and sacrifice of the freedom fighters.\n\nConservation:\nThis artifact has undergone professional conservation treatment to ensure its preservation for future generations. It is displayed in climate-controlled conditions with appropriate lighting to minimize deterioration.`,
        dateAcquired: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
        period: '1971',
        location: getRandomLocation(),
        condition: ['Excellent', 'Good', 'Fair'][Math.floor(Math.random() * 3)],
        dimensions: `${20 + Math.floor(Math.random() * 50)}cm x ${15 + Math.floor(Math.random() * 30)}cm`,
        material: getRandomMaterial(category.type),
        image: `https://picsum.photos/300/400?random=${id}`,
        featured: index < 2,
        gallery: getRandomGallery(),
        donatedBy: Math.random() > 0.5 ? `${['Mr.', 'Mrs.', 'Dr.'][Math.floor(Math.random() * 3)]} ${['Rahman', 'Ahmed', 'Khan', 'Begum', 'Hasan'][Math.floor(Math.random() * 5)]}` : 'Anonymous'
      });
    });
  });

  return collections;
}

// Helper functions for data generation
function getRandomOrigin() {
  const origins = [
    'donated by a freedom fighter\'s family',
    'discovered during archaeological excavation',
    'transferred from another museum',
    'acquired through government initiative',
    'donated by a veteran organization',
    'found in a historical site'
  ];
  return origins[Math.floor(Math.random() * origins.length)];
}

function getRandomLocation() {
  const locations = [
    'Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh',
    'Comilla', 'Jessore', 'Bogra', 'Dinajpur', 'Kushtia', 'Faridpur', 'Noakhali'
  ];
  return locations[Math.floor(Math.random() * locations.length)];
}

function getRandomMaterial(type) {
  const materials = {
    artifacts: ['Metal', 'Wood', 'Leather', 'Fabric', 'Plastic', 'Composite'],
    documents: ['Paper', 'Parchment', 'Cardboard'],
    photographs: ['Photographic Paper', 'Film', 'Digital Print'],
    weapons: ['Steel', 'Iron', 'Wood', 'Aluminum'],
    uniforms: ['Cotton', 'Polyester', 'Wool', 'Canvas', 'Leather']
  };
  const typeMaterials = materials[type] || materials.artifacts;
  return typeMaterials[Math.floor(Math.random() * typeMaterials.length)];
}

function getRandomGallery() {
  const galleries = [
    'Pre-Independence Gallery',
    'War Gallery', 
    'Heroes Gallery',
    'International Support Gallery',
    'Women in Liberation War',
    'Post-Independence Gallery'
  ];
  return galleries[Math.floor(Math.random() * galleries.length)];
}

// Setup floor navigation
function setupFloorNavigation() {
  const floorButtons = document.querySelectorAll('.floor-btn');
  
  floorButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      floorButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Update current floor
      currentFloor = button.dataset.floor;
      
      // Re-render map
      renderMuseumMap();
    });
  });
}

// Setup collection filters
function setupCollectionFilters() {
  const filterButtons = document.querySelectorAll('.collection-filters .btn');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Update current collection filter
      currentCollection = button.dataset.collection;
      
      // Re-render collections
      renderCollections();
    });
  });
}

// Render museum map
function renderMuseumMap() {
  const mapContainer = document.getElementById('mapContainer');
  const areas = museumAreas[currentFloor] || [];
  
  mapContainer.innerHTML = `
    <div class="floor-plan active" style="background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><rect width="800" height="600" fill="%23f8f9fa" stroke="%23dee2e6"/><text x="400" y="300" text-anchor="middle" font-family="Arial" font-size="20" fill="%236c757d">${currentFloor.charAt(0).toUpperCase() + currentFloor.slice(1)} Floor Plan</text></svg>')">
      ${areas.map(area => `
        <div class="map-area ${area.type}" 
             style="left: ${area.position.left}; top: ${area.position.top}; width: ${area.position.width}; height: ${area.position.height};"
             data-area-id="${area.id}">
          ${area.name}
        </div>
      `).join('')}
    </div>
  `;
  
  // Add click listeners to areas
  mapContainer.querySelectorAll('.map-area').forEach(area => {
    area.addEventListener('click', (e) => {
      const areaId = e.target.dataset.areaId;
      showAreaModal(areaId);
    });
  });
}

// Render gallery highlights
function renderGalleryHighlights() {
  const highlightsContainer = document.getElementById('galleryHighlights');
  
  const galleries = [
    {
      name: 'Pre-Independence Gallery',
      description: 'Historical context leading to the Liberation War',
      image: 'https://picsum.photos/400/300?random=gallery1',
      artifacts: 126,
      area: '450 sq ft',
      highlights: ['Colonial Period', 'Language Movement', 'Political Awakening']
    },
    {
      name: 'War Gallery',
      description: 'Main exhibition of the nine-month Liberation War',
      image: 'https://picsum.photos/400/300?random=gallery2',
      artifacts: 248,
      area: '650 sq ft',
      highlights: ['Battle Scenes', 'Military Equipment', 'Freedom Fighters']
    },
    {
      name: 'Heroes Gallery',
      description: 'Dedicated to brave freedom fighters and martyrs',
      image: 'https://picsum.photos/400/300?random=gallery3',
      artifacts: 189,
      area: '500 sq ft',
      highlights: ['Personal Stories', 'Portraits', 'Memorabilia']
    }
  ];
  
  highlightsContainer.innerHTML = galleries.map(gallery => `
    <div class="col-md-4 mb-4">
      <div class="card gallery-card h-100">
        <div class="gallery-image" style="background-image: url('${gallery.image}')">
          <div class="gallery-overlay">
            <h5>${gallery.name}</h5>
            <p class="mb-0">${gallery.description}</p>
          </div>
        </div>
        <div class="card-body">
          <h5 class="card-title">${gallery.name}</h5>
          <p class="card-text">${gallery.description}</p>
          <div class="gallery-stats">
            <span><i class="fas fa-cube"></i> ${gallery.artifacts} artifacts</span>
            <span><i class="fas fa-expand-arrows-alt"></i> ${gallery.area}</span>
          </div>
          <div class="mb-2">
            <small class="text-muted">Highlights:</small>
            <div class="mt-1">
              ${gallery.highlights.map(highlight => 
                `<span class="badge bg-light text-dark me-1">${highlight}</span>`
              ).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// Filter collections by type
function getFilteredCollections() {
  if (currentCollection === 'all') {
    return allCollectionsData;
  }
  return allCollectionsData.filter(item => item.type === currentCollection);
}

// Render collections
function renderCollections() {
  const collectionsGrid = document.getElementById('collectionsGrid');
  const filteredCollections = getFilteredCollections().slice(0, 12); // Show first 12 items
  
  if (filteredCollections.length === 0) {
    collectionsGrid.innerHTML = `
      <div class="col-12 text-center">
        <p class="text-muted">No items found for this collection type.</p>
      </div>
    `;
    return;
  }
  
  collectionsGrid.innerHTML = filteredCollections.map(item => `
    <div class="col-md-3 col-sm-6 mb-4">
      <div class="collection-item" data-collection-id="${item.id}">
        <div class="collection-image" style="background-image: url('${item.image}')"></div>
        <div class="collection-content">
          <div class="collection-title">${item.name}</div>
          <span class="collection-type">${item.type.charAt(0).toUpperCase() + item.type.slice(1)}</span>
          <div class="collection-meta">
            <span><i class="fas fa-calendar"></i> ${item.period}</span>
            <span><i class="fas fa-map-marker-alt"></i> ${item.location}</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');
  
  // Add click listeners to collection items
  collectionsGrid.querySelectorAll('.collection-item').forEach(item => {
    item.addEventListener('click', (e) => {
      const collectionId = parseInt(e.currentTarget.dataset.collectionId);
      showCollectionModal(collectionId);
    });
  });
}

// Show area detail modal
function showAreaModal(areaId) {
  const area = museumAreas[currentFloor].find(a => a.id === areaId);
  if (!area) return;
  
  const modal = document.getElementById('areaModal');
  const modalTitle = document.getElementById('modalAreaTitle');
  const modalContent = document.getElementById('modalAreaContent');
  
  modalTitle.textContent = area.name;
  
  let contentHTML = `
    <div class="area-detail-image mb-3" style="background: linear-gradient(135deg, var(--bangladesh-green), var(--bangladesh-red)); height: 200px; border-radius: var(--radius); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem;">
      <i class="fas fa-${getAreaIcon(area.type)} fa-3x"></i>
    </div>
    
    <div class="area-info mb-3">
      <h5>About This Area</h5>
      <p>${area.description}</p>
    </div>
    
    <div class="area-details">
      <div class="row">
        <div class="col-md-6">
          <p><strong>Area Type:</strong> ${area.type.charAt(0).toUpperCase() + area.type.slice(1)}</p>
          <p><strong>Floor:</strong> ${currentFloor.charAt(0).toUpperCase() + currentFloor.slice(1)} Floor</p>
        </div>
        <div class="col-md-6">
          <p><strong>Accessibility:</strong> ${area.type === 'restricted' ? 'Staff Only' : 'Public Access'}</p>
        </div>
      </div>
    </div>
  `;
  
  if (area.artifacts) {
    contentHTML += `
      <div class="area-stats mt-3">
        <h6>Collection Statistics</h6>
        <p><strong>Total Artifacts:</strong> ${area.artifacts}</p>
        <div class="highlights">
          <strong>Key Highlights:</strong>
          <ul class="mt-2">
            ${area.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;
  }
  
  if (area.facilities) {
    contentHTML += `
      <div class="area-facilities mt-3">
        <h6>Available Facilities</h6>
        <ul>
          ${area.facilities.map(facility => `<li>${facility}</li>`).join('')}
        </ul>
      </div>
    `;
  }
  
  if (area.features) {
    contentHTML += `
      <div class="area-features mt-3">
        <h6>Interactive Features</h6>
        <ul>
          ${area.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
      </div>
    `;
  }
  
  modalContent.innerHTML = contentHTML;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Show collection detail modal
function showCollectionModal(collectionId) {
  const item = allCollectionsData.find(c => c.id === collectionId);
  if (!item) return;
  
  const modal = document.getElementById('collectionModal');
  const modalTitle = document.getElementById('modalCollectionTitle');
  const modalContent = document.getElementById('modalCollectionContent');
  
  modalTitle.textContent = item.name;
  modalContent.innerHTML = `
    <div class="collection-detail-image mb-3" style="background-image: url('${item.image}'); height: 300px; background-size: cover; background-position: center; border-radius: var(--radius);"></div>
    
    <div class="collection-meta-detail mb-3">
      <div class="row">
        <div class="col-md-6">
          <p><strong>Type:</strong> ${item.type.charAt(0).toUpperCase() + item.type.slice(1)}</p>
          <p><strong>Period:</strong> ${item.period}</p>
          <p><strong>Location Found:</strong> ${item.location}</p>
        </div>
        <div class="col-md-6">
          <p><strong>Condition:</strong> ${item.condition}</p>
          <p><strong>Dimensions:</strong> ${item.dimensions}</p>
          <p><strong>Material:</strong> ${item.material}</p>
        </div>
        <div class="col-md-6">
          <p><strong>Gallery:</strong> ${item.gallery}</p>
          <p><strong>Date Acquired:</strong> ${formatDate(item.dateAcquired)}</p>
        </div>
        <div class="col-md-6">
          <p><strong>Donated By:</strong> ${item.donatedBy}</p>
        </div>
      </div>
    </div>
    
    <div class="collection-description">
      <h5>Description</h5>
      <p>${item.fullDescription}</p>
    </div>
    
    <div class="d-flex justify-content-end gap-2 mt-4">
      <button class="btn btn-secondary" onclick="closeCollectionModal()">Close</button>
      <button class="btn btn-outline-primary" onclick="addToFavorites(${item.id})">
        <i class="fas fa-heart me-2"></i>Add to Favorites
      </button>
    </div>
  `;
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Get area icon based on type
function getAreaIcon(type) {
  const icons = {
    exhibition: 'paint-brush',
    interactive: 'laptop',
    facility: 'concierge-bell',
    restricted: 'lock'
  };
  return icons[type] || 'building';
}

// Close modals
function closeAreaModal() {
  const modal = document.getElementById('areaModal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function closeCollectionModal() {
  const modal = document.getElementById('collectionModal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Add to favorites functionality
function addToFavorites(itemId) {
  if (!state.favorites) {
    state.favorites = [];
  }
  
  if (!state.favorites.includes(itemId)) {
    state.favorites.push(itemId);
    localStorage.setItem('lwm_state', JSON.stringify(state));
    alert('Item added to favorites!');
  } else {
    alert('Item is already in your favorites!');
  }
}

// Show AR info
function showARInfo() {
  alert('Download our mobile app to experience Augmented Reality features throughout the museum. The app is available on both iOS and Android platforms.');
}

// Show audio guide info
function showAudioGuide() {
  alert('Audio guides are available at the reception desk or can be downloaded to your smartphone. Multiple languages are supported including Bengali and English.');
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

// Close modals when clicking outside
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('area-modal')) {
    closeAreaModal();
  }
  if (e.target.classList.contains('collection-modal')) {
    closeCollectionModal();
  }
});

// Close modals on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeAreaModal();
    closeCollectionModal();
  }
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Wait for core to be loaded
  if (typeof initializeCore === 'function') {
    initializeCore();
  }
  initializeExplorePage();
});

// Make functions available globally
window.closeAreaModal = closeAreaModal;
window.closeCollectionModal = closeCollectionModal;
window.showARInfo = showARInfo;
window.showAudioGuide = showAudioGuide;
