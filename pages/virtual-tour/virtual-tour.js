// Virtual Tour Page Functionality
let currentFloor = 'ground';
let currentScene = null;
let visitedLocations = [];
let tourLocations = {};
let guidedTourActive = false;
let guidedTourIndex = 0;

// Initialize virtual tour page
function initializeVirtualTour() {
  loadTourData();
  setupTourControls();
  setupFloorSelection();
  renderLocationList();
  updateTourProgress();
  showWelcomeScene();
}

// Load tour data
function loadTourData() {
  tourLocations = generateTourLocations();
}

// Generate tour locations data
function generateTourLocations() {
  return {
    ground: [
      {
        id: 'entrance',
        name: 'Main Entrance',
        description: 'Welcome to the Liberation War Museum',
        type: 'facility',
        panoramaUrl: 'https://picsum.photos/1920/960?random=entrance',
        hotspots: [
          {
            type: 'navigation',
            position: { x: 60, y: 40 },
            target: 'reception',
            tooltip: 'Go to Reception Hall'
          },
          {
            type: 'info',
            position: { x: 20, y: 60 },
            title: 'Museum Information',
            content: 'The Liberation War Museum was established to preserve the history of Bangladesh\'s struggle for independence.'
          }
        ],
        artifacts: [],
        audioUrl: null,
        visitCount: 0
      },
      {
        id: 'reception',
        name: 'Reception Hall',
        description: 'Grand reception area with visitor information',
        type: 'facility',
        panoramaUrl: 'https://picsum.photos/1920/960?random=reception',
        hotspots: [
          {
            type: 'navigation',
            position: { x: 30, y: 50 },
            target: 'entrance',
            tooltip: 'Back to Entrance'
          },
          {
            type: 'navigation',
            position: { x: 70, y: 45 },
            target: 'gallery1',
            tooltip: 'Enter Pre-Independence Gallery'
          },
          {
            type: 'info',
            position: { x: 50, y: 30 },
            title: 'Visitor Services',
            content: 'Audio guides, brochures, and tour information are available at the reception desk.'
          }
        ],
        artifacts: [],
        audioUrl: null,
        visitCount: 0
      },
      {
        id: 'gallery1',
        name: 'Pre-Independence Gallery',
        description: 'Historical context leading to the Liberation War',
        type: 'exhibition',
        panoramaUrl: 'https://picsum.photos/1920/960?random=gallery1',
        hotspots: [
          {
            type: 'navigation',
            position: { x: 10, y: 50 },
            target: 'reception',
            tooltip: 'Back to Reception'
          },
          {
            type: 'navigation',
            position: { x: 90, y: 50 },
            target: 'gallery2',
            tooltip: 'War Gallery'
          },
          {
            type: 'artifact',
            position: { x: 40, y: 60 },
            artifactId: 1,
            tooltip: 'Language Movement Artifacts'
          },
          {
            type: 'artifact',
            position: { x: 60, y: 40 },
            artifactId: 2,
            tooltip: 'Political Documents'
          }
        ],
        artifacts: [1, 2, 3, 4],
        audioUrl: null,
        visitCount: 0
      },
      {
        id: 'gallery2',
        name: 'War Gallery',
        description: 'Main exhibition of the Liberation War',
        type: 'exhibition',
        panoramaUrl: 'https://picsum.photos/1920/960?random=gallery2',
        hotspots: [
          {
            type: 'navigation',
            position: { x: 10, y: 50 },
            target: 'gallery1',
            tooltip: 'Pre-Independence Gallery'
          },
          {
            type: 'navigation',
            position: { x: 50, y: 80 },
            target: 'interactive1',
            tooltip: 'Interactive Timeline'
          },
          {
            type: 'artifact',
            position: { x: 30, y: 40 },
            artifactId: 5,
            tooltip: 'Military Equipment'
          },
          {
            type: 'artifact',
            position: { x: 70, y: 45 },
            artifactId: 6,
            tooltip: 'Freedom Fighter Profiles'
          }
        ],
        artifacts: [5, 6, 7, 8, 9],
        audioUrl: null,
        visitCount: 0
      },
      {
        id: 'interactive1',
        name: 'Interactive Timeline',
        description: 'Digital timeline of Liberation War events',
        type: 'interactive',
        panoramaUrl: 'https://picsum.photos/1920/960?random=interactive1',
        hotspots: [
          {
            type: 'navigation',
            position: { x: 50, y: 20 },
            target: 'gallery2',
            tooltip: 'Back to War Gallery'
          },
          {
            type: 'info',
            position: { x: 50, y: 50 },
            title: 'Interactive Timeline',
            content: 'Touch the screen to explore the chronological events of the 1971 Liberation War.'
          }
        ],
        artifacts: [],
        audioUrl: null,
        visitCount: 0
      }
    ],
    first: [
      {
        id: 'gallery3',
        name: 'Heroes Gallery',
        description: 'Dedicated to freedom fighters and martyrs',
        type: 'exhibition',
        panoramaUrl: 'https://picsum.photos/1920/960?random=gallery3',
        hotspots: [
          {
            type: 'navigation',
            position: { x: 80, y: 50 },
            target: 'gallery4',
            tooltip: 'International Support Gallery'
          },
          {
            type: 'artifact',
            position: { x: 25, y: 45 },
            artifactId: 10,
            tooltip: 'Hero Portraits'
          },
          {
            type: 'artifact',
            position: { x: 60, y: 40 },
            artifactId: 11,
            tooltip: 'Personal Belongings'
          }
        ],
        artifacts: [10, 11, 12, 13],
        audioUrl: null,
        visitCount: 0
      },
      {
        id: 'gallery4',
        name: 'International Support Gallery',
        description: 'International support during Liberation War',
        type: 'exhibition',
        panoramaUrl: 'https://picsum.photos/1920/960?random=gallery4',
        hotspots: [
          {
            type: 'navigation',
            position: { x: 20, y: 50 },
            target: 'gallery3',
            tooltip: 'Heroes Gallery'
          },
          {
            type: 'navigation',
            position: { x: 50, y: 70 },
            target: 'interactive2',
            tooltip: 'VR Zone'
          },
          {
            type: 'artifact',
            position: { x: 40, y: 35 },
            artifactId: 14,
            tooltip: 'Diplomatic Documents'
          }
        ],
        artifacts: [14, 15, 16],
        audioUrl: null,
        visitCount: 0
      },
      {
        id: 'interactive2',
        name: 'Virtual Reality Zone',
        description: 'VR experience of historical events',
        type: 'interactive',
        panoramaUrl: 'https://picsum.photos/1920/960?random=interactive2',
        hotspots: [
          {
            type: 'navigation',
            position: { x: 50, y: 30 },
            target: 'gallery4',
            tooltip: 'Back to International Gallery'
          },
          {
            type: 'navigation',
            position: { x: 80, y: 50 },
            target: 'interactive3',
            tooltip: 'Audio Story Booths'
          },
          {
            type: 'info',
            position: { x: 50, y: 60 },
            title: 'VR Experience',
            content: 'Put on the VR headset to experience historical battles and events in immersive virtual reality.'
          }
        ],
        artifacts: [],
        audioUrl: null,
        visitCount: 0
      },
      {
        id: 'interactive3',
        name: 'Audio Story Booths',
        description: 'Listen to veteran testimonials',
        type: 'interactive',
        panoramaUrl: 'https://picsum.photos/1920/960?random=interactive3',
        hotspots: [
          {
            type: 'navigation',
            position: { x: 20, y: 50 },
            target: 'interactive2',
            tooltip: 'VR Zone'
          },
          {
            type: 'info',
            position: { x: 50, y: 50 },
            title: 'Audio Stories',
            content: 'Listen to firsthand accounts from freedom fighters and war veterans in private listening booths.'
          }
        ],
        artifacts: [],
        audioUrl: null,
        visitCount: 0
      }
    ],
    second: [
      {
        id: 'gallery5',
        name: 'Women in Liberation War',
        description: 'Women\'s contribution to independence',
        type: 'exhibition',
        panoramaUrl: 'https://picsum.photos/1920/960?random=gallery5',
        hotspots: [
          {
            type: 'navigation',
            position: { x: 80, y: 50 },
            target: 'gallery6',
            tooltip: 'Post-Independence Gallery'
          },
          {
            type: 'artifact',
            position: { x: 30, y: 40 },
            artifactId: 17,
            tooltip: 'Women Freedom Fighters'
          },
          {
            type: 'artifact',
            position: { x: 65, y: 45 },
            artifactId: 18,
            tooltip: 'Support Activities'
          }
        ],
        artifacts: [17, 18, 19],
        audioUrl: null,
        visitCount: 0
      },
      {
        id: 'gallery6',
        name: 'Post-Independence Gallery',
        description: 'Bangladesh after independence',
        type: 'exhibition',
        panoramaUrl: 'https://picsum.photos/1920/960?random=gallery6',
        hotspots: [
          {
            type: 'navigation',
            position: { x: 20, y: 50 },
            target: 'gallery5',
            tooltip: 'Women in Liberation War'
          },
          {
            type: 'navigation',
            position: { x: 50, y: 70 },
            target: 'memorial',
            tooltip: 'Memorial Hall'
          },
          {
            type: 'artifact',
            position: { x: 50, y: 40 },
            artifactId: 20,
            tooltip: 'Nation Building'
          }
        ],
        artifacts: [20, 21],
        audioUrl: null,
        visitCount: 0
      },
      {
        id: 'memorial',
        name: 'Memorial Hall',
        description: 'Honor the fallen heroes',
        type: 'memorial',
        panoramaUrl: 'https://picsum.photos/1920/960?random=memorial',
        hotspots: [
          {
            type: 'navigation',
            position: { x: 50, y: 30 },
            target: 'gallery6',
            tooltip: 'Back to Post-Independence Gallery'
          },
          {
            type: 'info',
            position: { x: 50, y: 70 },
            title: 'Memorial Wall',
            content: 'This wall honors the memory of the 3 million martyrs who gave their lives for Bangladesh\'s independence.'
          }
        ],
        artifacts: [22],
        audioUrl: null,
        visitCount: 0
      }
    ]
  };
}

// Generate artifact data for tour
function generateTourArtifacts() {
  return [
    { id: 1, name: 'Language Movement Poster', description: 'Original poster from 1952 Language Movement' },
    { id: 2, name: 'Political Manifesto', description: 'Six-Point Program document' },
    { id: 3, name: 'Student Rally Photo', description: 'Students protesting for Bengali language rights' },
    { id: 4, name: 'Historical Newspaper', description: 'Newspaper coverage of political movements' },
    { id: 5, name: 'Freedom Fighter Rifle', description: 'Weapon used by Mukti Bahini' },
    { id: 6, name: 'Commander Portrait', description: 'Portrait of sector commander' },
    { id: 7, name: 'Battle Map', description: 'Strategic map showing war operations' },
    { id: 8, name: 'Radio Equipment', description: 'Communication device used during war' },
    { id: 9, name: 'Victory Flag', description: 'Flag raised during liberation' },
    { id: 10, name: 'Martyr Portrait', description: 'Photo of fallen freedom fighter' },
    { id: 11, name: 'Personal Diary', description: 'Diary of a freedom fighter' },
    { id: 12, name: 'Medal of Honor', description: 'Award given to war heroes' },
    { id: 13, name: 'Family Photo', description: 'Last photo before joining war' },
    { id: 14, name: 'UN Resolution', description: 'International support document' },
    { id: 15, name: 'India-Bangladesh Treaty', description: 'Friendship treaty document' },
    { id: 16, name: 'Foreign Media Report', description: 'International press coverage' },
    { id: 17, name: 'Women Fighter Photo', description: 'Female freedom fighter portrait' },
    { id: 18, name: 'Support Letter', description: 'Letter supporting independence' },
    { id: 19, name: 'Medical Aid Kit', description: 'First aid used by women volunteers' },
    { id: 20, name: 'Constitution Draft', description: 'First constitution of Bangladesh' },
    { id: 21, name: 'Reconstruction Plan', description: 'Post-war rebuilding documents' },
    { id: 22, name: 'Memorial Inscription', description: 'Names of martyrs carved in stone' }
  ];
}

// Setup tour controls
function setupTourControls() {
  // Tour info button
  document.getElementById('tourInfoBtn').addEventListener('click', showTourInfo);
  
  // Fullscreen button
  document.getElementById('fullscreenBtn').addEventListener('click', toggleFullscreen);
  
  // Sidebar toggle
  document.getElementById('sidebarToggle').addEventListener('click', toggleSidebar);
  
  // Close modal handlers
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('tour-modal') || e.target.classList.contains('artifact-modal')) {
      closeTourInfoModal();
      closeArtifactModal();
    }
  });
  
  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeTourInfoModal();
      closeArtifactModal();
      hideSceneInfo();
    }
    if (e.key === 'f' || e.key === 'F') {
      toggleFullscreen();
    }
  });
}

// Setup floor selection
function setupFloorSelection() {
  const floorSelect = document.getElementById('floorSelect');
  floorSelect.addEventListener('change', (e) => {
    currentFloor = e.target.value;
    renderLocationList();
  });
}

// Render location list
function renderLocationList() {
  const locationList = document.getElementById('locationList');
  const locations = tourLocations[currentFloor] || [];
  
  locationList.innerHTML = locations.map(location => `
    <div class="location-item ${location.id === currentScene ? 'active' : ''} ${visitedLocations.includes(location.id) ? 'visited' : ''}" 
         data-location-id="${location.id}">
      <div class="location-icon">
        <i class="fas fa-${getLocationIcon(location.type)}"></i>
      </div>
      <div class="location-info">
        <div class="location-name">${location.name}</div>
        <div class="location-description">${location.description}</div>
      </div>
    </div>
  `).join('');
  
  // Add click listeners
  locationList.querySelectorAll('.location-item').forEach(item => {
    item.addEventListener('click', (e) => {
      const locationId = e.currentTarget.dataset.locationId;
      navigateToLocation(locationId);
    });
  });
}

// Get location icon based on type
function getLocationIcon(type) {
  const icons = {
    facility: 'concierge-bell',
    exhibition: 'paint-brush',
    interactive: 'laptop',
    memorial: 'heart'
  };
  return icons[type] || 'building';
}

// Navigate to location
function navigateToLocation(locationId) {
  const location = findLocationById(locationId);
  if (!location) return;
  
  currentScene = locationId;
  
  // Mark as visited
  if (!visitedLocations.includes(locationId)) {
    visitedLocations.push(locationId);
  }
  
  // Update UI
  renderLocationList();
  updateTourProgress();
  loadScene(location);
  
  // Hide loading after delay
  setTimeout(() => {
    document.getElementById('tourLoading').style.display = 'none';
  }, 1000);
}

// Find location by ID
function findLocationById(locationId) {
  for (const floor in tourLocations) {
    const location = tourLocations[floor].find(loc => loc.id === locationId);
    if (location) return location;
  }
  return null;
}

// Load scene
function loadScene(location) {
  const tourScene = document.getElementById('tourScene');
  const sceneNavigation = document.getElementById('sceneNavigation');
  
  // Show loading
  document.getElementById('tourLoading').style.display = 'flex';
  
  // Update scene background (simulate panorama)
  tourScene.innerHTML = `
    <div class="scene-placeholder" style="background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${location.panoramaUrl}'); background-size: cover; background-position: center;">
      <div class="scene-content">
        <h3>${location.name}</h3>
        <p>${location.description}</p>
      </div>
    </div>
  `;
  
  // Render hotspots
  sceneNavigation.innerHTML = location.hotspots.map(hotspot => `
    <div class="nav-hotspot ${hotspot.type}" 
         style="left: ${hotspot.position.x}%; top: ${hotspot.position.y}%"
         data-hotspot='${JSON.stringify(hotspot)}'
         title="${hotspot.tooltip || ''}">
      <i class="fas fa-${getHotspotIcon(hotspot.type)}"></i>
    </div>
  `).join('');
  
  // Add hotspot click listeners
  sceneNavigation.querySelectorAll('.nav-hotspot').forEach(hotspot => {
    hotspot.addEventListener('click', (e) => {
      const hotspotData = JSON.parse(e.currentTarget.dataset.hotspot);
      handleHotspotClick(hotspotData);
    });
  });
}

// Get hotspot icon
function getHotspotIcon(type) {
  const icons = {
    navigation: 'arrow-right',
    info: 'info',
    artifact: 'gem'
  };
  return icons[type] || 'circle';
}

// Handle hotspot click
function handleHotspotClick(hotspot) {
  switch (hotspot.type) {
    case 'navigation':
      navigateToLocation(hotspot.target);
      break;
    case 'info':
      showSceneInfo(hotspot.title, hotspot.content);
      break;
    case 'artifact':
      showArtifactModal(hotspot.artifactId);
      break;
  }
}

// Show scene info
function showSceneInfo(title, content) {
  const sceneInfo = document.getElementById('sceneInfo');
  const infoContent = document.getElementById('infoContent');
  
  infoContent.innerHTML = `
    <h5>${title}</h5>
    <p>${content}</p>
    <div class="info-meta">
      <div class="row">
        <div class="col-6">
          <strong>Current Location:</strong><br>
          ${currentScene ? findLocationById(currentScene).name : 'Unknown'}
        </div>
        <div class="col-6">
          <strong>Floor:</strong><br>
          ${currentFloor.charAt(0).toUpperCase() + currentFloor.slice(1)} Floor
        </div>
      </div>
    </div>
  `;
  
  sceneInfo.classList.add('active');
}

// Hide scene info
function hideSceneInfo() {
  document.getElementById('sceneInfo').classList.remove('active');
}

// Show artifact modal
function showArtifactModal(artifactId) {
  const artifacts = generateTourArtifacts();
  const artifact = artifacts.find(a => a.id === artifactId);
  if (!artifact) return;
  
  const modal = document.getElementById('artifactModal');
  const title = document.getElementById('artifactTitle');
  const content = document.getElementById('artifactContent');
  
  title.textContent = artifact.name;
  content.innerHTML = `
    <div class="artifact-image mb-3" style="height: 200px; background: linear-gradient(45deg, var(--bangladesh-green), var(--bangladesh-red)); border-radius: var(--radius); display: flex; align-items: center; justify-content: center; color: white;">
      <i class="fas fa-gem fa-3x"></i>
    </div>
    <p>${artifact.description}</p>
    <div class="artifact-meta">
      <div class="row">
        <div class="col-6">
          <strong>Type:</strong><br>Historical Artifact
        </div>
        <div class="col-6">
          <strong>Period:</strong><br>1971 Liberation War
        </div>
      </div>
    </div>
    <div class="text-center mt-3">
      <button class="btn btn-primary" onclick="closeArtifactModal()">Close</button>
    </div>
  `;
  
  modal.classList.add('active');
}

// Close artifact modal
function closeArtifactModal() {
  document.getElementById('artifactModal').classList.remove('active');
}

// Show welcome scene
function showWelcomeScene() {
  const tourScene = document.getElementById('tourScene');
  tourScene.innerHTML = `
    <div class="scene-placeholder">
      <div class="scene-content">
        <i class="fas fa-museum fa-4x mb-3"></i>
        <h3>Welcome to Virtual Tour</h3>
        <p>Select a location from the sidebar to begin your virtual journey</p>
        <button class="btn btn-primary mt-3" onclick="startGuidedTour()">
          <i class="fas fa-play me-2"></i>Start Guided Tour
        </button>
      </div>
    </div>
  `;
}

// Update tour progress
function updateTourProgress() {
  const totalLocations = Object.values(tourLocations).flat().length;
  const visitedCount = visitedLocations.length;
  const progress = (visitedCount / totalLocations) * 100;
  
  document.getElementById('tourProgressBar').style.width = `${progress}%`;
  document.getElementById('visitedCount').textContent = visitedCount;
  document.getElementById('totalCount').textContent = totalLocations;
}

// Start guided tour
function startGuidedTour() {
  guidedTourActive = true;
  guidedTourIndex = 0;
  
  const allLocations = Object.values(tourLocations).flat();
  if (allLocations.length > 0) {
    navigateToLocation(allLocations[0].id);
    alert('Guided tour started! Use the navigation arrows to move through the museum in the recommended order.');
  }
}

// Reset tour
function resetTour() {
  if (confirm('This will reset your tour progress. Are you sure?')) {
    visitedLocations = [];
    currentScene = null;
    guidedTourActive = false;
    guidedTourIndex = 0;
    
    renderLocationList();
    updateTourProgress();
    showWelcomeScene();
    
    document.getElementById('sceneNavigation').innerHTML = '';
    hideSceneInfo();
  }
}

// Download map
function downloadMap() {
  alert('Museum map download will be available soon. You can screenshot the current view for reference.');
}

// Show tour info modal
function showTourInfo() {
  document.getElementById('tourInfoModal').classList.add('active');
}

// Close tour info modal
function closeTourInfoModal() {
  document.getElementById('tourInfoModal').classList.remove('active');
}

// Toggle sidebar
function toggleSidebar() {
  document.getElementById('tourSidebar').classList.toggle('collapsed');
}

// Toggle fullscreen
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      console.log('Fullscreen not supported');
    });
  } else {
    document.exitFullscreen();
  }
}

// Mobile functions
function showTourControls() {
  showTourInfo();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Wait for core to be loaded
  if (typeof initializeCore === 'function') {
    initializeCore();
  }
  initializeVirtualTour();
});

// Make functions available globally
window.hideSceneInfo = hideSceneInfo;
window.closeTourInfoModal = closeTourInfoModal;
window.closeArtifactModal = closeArtifactModal;
window.startGuidedTour = startGuidedTour;
window.resetTour = resetTour;
window.downloadMap = downloadMap;
window.toggleSidebar = toggleSidebar;
window.toggleFullscreen = toggleFullscreen;
window.showTourControls = showTourControls;
