// Timeline Page Functionality
let currentTimelineFilter = 'all';
let currentViewMode = 'vertical';
let timelineEvents = [];
let currentEventIndex = 0;

// Initialize timeline page
function initializeTimelinePage() {
  loadTimelineData();
  setupTimelineFilters();
  setupViewModeToggle();
  setupTimelineJump();
  renderTimeline();
  updateTimelineProgress();
}

// Load timeline data
function loadTimelineData() {
  // Generate timeline events if not exists
  if (!state.timelineEvents || state.timelineEvents.length === 0) {
    state.timelineEvents = generateTimelineEvents();
    localStorage.setItem('lwm_state', JSON.stringify(state));
  }
  timelineEvents = state.timelineEvents;
}

// Generate timeline events data
function generateTimelineEvents() {
  return [
    // Pre-War Period (January - March 1971)
    {
      id: 1,
      date: '1971-01-03',
      title: 'Awami League\'s Six-Point Demand',
      description: 'Sheikh Mujibur Rahman presents the historic Six-Point Program demanding autonomy for East Pakistan.',
      fullDescription: 'The Six-Point Program was a political manifesto that outlined the demands for autonomy for East Pakistan. It became the charter of freedom for the Bengali people and laid the foundation for the independence movement.',
      type: 'political',
      location: 'Dhaka',
      period: 'pre-war',
      participants: [
        { name: 'Sheikh Mujibur Rahman', role: 'Awami League Leader' },
        { name: 'Tajuddin Ahmad', role: 'Political Leader' }
      ],
      casualties: null,
      significance: 'high',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjcaGm_vQ8kNQfJXpvVHhyx8r2ISJQGSJHzQ&s',
      relatedEvents: [2, 5]
    },
    {
      id: 2,
      date: '1971-02-15',
      title: 'Language Movement Remembrance',
      description: 'Memorial services held for Language Movement martyrs, strengthening Bengali identity.',
      fullDescription: 'The commemoration of the 1952 Language Movement martyrs served as a powerful reminder of Bengali cultural identity and resistance against oppression.',
      type: 'social',
      location: 'Dhaka',
      period: 'pre-war',
      participants: [
        { name: 'Students', role: 'Organizers' },
        { name: 'General Public', role: 'Participants' }
      ],
      casualties: null,
      significance: 'medium',
      image: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/1952_Bengali_Language_movement.jpg',
      relatedEvents: [1, 3]
    },
    {
      id: 3,
      date: '1971-03-01',
      title: 'Non-Cooperation Movement Begins',
      description: 'Sheikh Mujib launches the non-cooperation movement against Pakistani government.',
      fullDescription: 'The non-cooperation movement was a peaceful protest strategy that effectively paralyzed the Pakistani administration in East Pakistan.',
      type: 'political',
      location: 'East Pakistan',
      period: 'pre-war',
      participants: [
        { name: 'Sheikh Mujibur Rahman', role: 'Leader' },
        { name: 'Bengali Population', role: 'Participants' }
      ],
      casualties: null,
      significance: 'high',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Mosharraf_and_daughters_attending_procession_with_Joy_Bangla_banner%2C_Jessore%2C_East_Pakistan_%281971%29.jpg/1200px-Mosharraf_and_daughters_attending_procession_with_Joy_Bangla_banner%2C_Jessore%2C_East_Pakistan_%281971%29.jpg',
      relatedEvents: [2, 4]
    },
    {
      id: 4,
      date: '1971-03-07',
      title: 'Historic Speech at Ramna Race Course',
      description: 'Sheikh Mujibur Rahman delivers his iconic speech: "This time the struggle is for our freedom."',
      fullDescription: 'This historic speech at Ramna Race Course (now Suhrawardy Udyan) is considered the unofficial declaration of independence. Sheikh Mujib called for resistance and prepared the nation for the inevitable struggle.',
      type: 'political',
      location: 'Dhaka',
      period: 'pre-war',
      participants: [
        { name: 'Sheikh Mujibur Rahman', role: 'Speaker' },
        { name: '1 Million People', role: 'Audience' }
      ],
      casualties: null,
      significance: 'highest',
      image: 'https://www.tbsnews.net/sites/default/files/styles/big_3/public/images/2020/03/07/bangabandhu_7_march.jpg',
      relatedEvents: [3, 5]
    },
    {
      id: 5,
      date: '1971-03-25',
      title: 'Operation Searchlight Begins',
      description: 'Pakistani military launches brutal crackdown on Bengali population.',
      fullDescription: 'Operation Searchlight was a planned military operation by the Pakistan Army to curb the Bengali nationalist movement. It marked the beginning of the genocide and the war.',
      type: 'military',
      location: 'Dhaka, Chittagong, Comilla',
      period: 'early-war',
      participants: [
        { name: 'Pakistan Army', role: 'Aggressor' },
        { name: 'Bengali Civilians', role: 'Victims' }
      ],
      casualties: 'Thousands killed',
      significance: 'highest',
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2e/Dead_bodies_of_Bengali_intellectuals%2C_14_December_1971.jpg/250px-Dead_bodies_of_Bengali_intellectuals%2C_14_December_1971.jpg',
      relatedEvents: [4, 6]
    },
    {
      id: 6,
      date: '1971-03-26',
      title: 'Declaration of Independence',
      description: 'Sheikh Mujibur Rahman declares independence of Bangladesh before his arrest.',
      fullDescription: 'In the early hours of March 26, Sheikh Mujibur Rahman declared the independence of Bangladesh via radio before being arrested by the Pakistani military.',
      type: 'political',
      location: 'Dhaka',
      period: 'early-war',
      participants: [
        { name: 'Sheikh Mujibur Rahman', role: 'Declarant' },
        { name: 'Bengali Nation', role: 'Recipients' }
      ],
      casualties: null,
      significance: 'highest',
      image: 'https://liberationwar.org/wp-content/uploads/2021/03/IMG-20210322-WA0007.jpg',
      relatedEvents: [5, 7]
    },
    {
      id: 7,
      date: '1971-04-10',
      title: 'Formation of Provisional Government',
      description: 'Provisional Government of Bangladesh formed at Mujibnagar.',
      fullDescription: 'The Provisional Government of Bangladesh was formed with Syed Nazrul Islam as Acting President and Tajuddin Ahmad as Prime Minister, providing political leadership to the liberation struggle.',
      type: 'political',
      location: 'Mujibnagar (Baidyanathtala)',
      period: 'early-war',
      participants: [
        { name: 'Syed Nazrul Islam', role: 'Acting President' },
        { name: 'Tajuddin Ahmad', role: 'Prime Minister' }
      ],
      casualties: null,
      significance: 'high',
      image: 'https://picsum.photos/600/400?random=7',
      relatedEvents: [6, 8]
    },
    {
      id: 8,
      date: '1971-04-17',
      title: 'Oath Ceremony of Provisional Government',
      description: 'Official oath-taking ceremony of the Provisional Government at Mujibnagar.',
      fullDescription: 'The oath-taking ceremony formalized the Provisional Government of Bangladesh, establishing it as the legitimate government representing the Bengali people.',
      type: 'political',
      location: 'Mujibnagar',
      period: 'early-war',
      participants: [
        { name: 'Government Officials', role: 'Ministers' },
        { name: 'Freedom Fighters', role: 'Witnesses' }
      ],
      casualties: null,
      significance: 'high',
      image: 'https://picsum.photos/600/400?random=8',
      relatedEvents: [7, 9]
    },
    {
      id: 9,
      date: '1971-05-30',
      title: 'First Major Counter-Attack',
      description: 'Mukti Bahini launches coordinated attacks against Pakistani forces.',
      fullDescription: 'The Mukti Bahini (Liberation Army) began organized guerrilla warfare against the Pakistani occupation forces, marking the beginning of systematic military resistance.',
      type: 'military',
      location: 'Various locations',
      period: 'early-war',
      participants: [
        { name: 'Mukti Bahini', role: 'Freedom Fighters' },
        { name: 'Pakistan Army', role: 'Occupying Force' }
      ],
      casualties: 'Several hundred',
      significance: 'medium',
      image: 'https://picsum.photos/600/400?random=9',
      relatedEvents: [8, 10]
    },
    {
      id: 10,
      date: '1971-07-11',
      title: 'Formation of Mukti Bahini Sectors',
      description: 'Liberation war organized into 11 sectors for better coordination.',
      fullDescription: 'The liberation war was strategically organized into 11 sectors, each with designated commanders, to ensure better coordination and effective guerrilla warfare against the Pakistani forces.',
      type: 'military',
      location: 'Bangladesh',
      period: 'mid-war',
      participants: [
        { name: 'Sector Commanders', role: 'Military Leaders' },
        { name: 'Freedom Fighters', role: 'Soldiers' }
      ],
      casualties: null,
      significance: 'high',
      image: 'https://picsum.photos/600/400?random=10',
      relatedEvents: [9, 11]
    },
    {
      id: 11,
      date: '1971-08-09',
      title: 'India-Soviet Friendship Treaty',
      description: 'India signs friendship treaty with Soviet Union, gaining support for Bangladesh.',
      fullDescription: 'The Indo-Soviet Treaty of Peace, Friendship and Cooperation provided India with diplomatic backing and military support, crucial for the eventual intervention in the liberation war.',
      type: 'international',
      location: 'New Delhi, India',
      period: 'mid-war',
      participants: [
        { name: 'Indira Gandhi', role: 'Indian Prime Minister' },
        { name: 'Soviet Leadership', role: 'Ally' }
      ],
      casualties: null,
      significance: 'high',
      image: 'https://picsum.photos/600/400?random=11',
      relatedEvents: [10, 12]
    },
    {
      id: 12,
      date: '1971-10-25',
      title: 'China Supports Pakistan at UN',
      description: 'China vetoes Bangladesh\'s UN membership, supporting Pakistan.',
      fullDescription: 'China\'s veto at the UN Security Council reflected the complex international politics during the liberation war, with China supporting Pakistan against Soviet-backed India.',
      type: 'international',
      location: 'United Nations, New York',
      period: 'final-war',
      participants: [
        { name: 'Chinese Delegation', role: 'Pakistan Supporter' },
        { name: 'UN Members', role: 'Various Positions' }
      ],
      casualties: null,
      significance: 'medium',
      image: 'https://picsum.photos/600/400?random=12',
      relatedEvents: [11, 13]
    },
    {
      id: 13,
      date: '1971-11-23',
      title: 'Jessore Liberation',
      description: 'Joint Mukti Bahini-Indian forces liberate Jessore.',
      fullDescription: 'The liberation of Jessore was one of the first major victories of the joint forces, opening the way for further advances towards Dhaka.',
      type: 'military',
      location: 'Jessore',
      period: 'final-war',
      participants: [
        { name: 'Mukti Bahini', role: 'Liberation Forces' },
        { name: 'Indian Army', role: 'Allied Forces' }
      ],
      casualties: 'Hundreds',
      significance: 'high',
      image: 'https://picsum.photos/600/400?random=13',
      relatedEvents: [12, 14]
    },
    {
      id: 14,
      date: '1971-12-03',
      title: 'Pakistan Attacks India',
      description: 'Pakistan launches preemptive air strikes against Indian airfields.',
      fullDescription: 'Pakistan\'s preemptive strikes against Indian airbases gave India the justification for full-scale military intervention in the liberation war.',
      type: 'military',
      location: 'India-Pakistan Border',
      period: 'final-war',
      participants: [
        { name: 'Pakistan Air Force', role: 'Aggressor' },
        { name: 'Indian Air Force', role: 'Defender' }
      ],
      casualties: 'Military personnel',
      significance: 'high',
      image: 'https://picsum.photos/600/400?random=14',
      relatedEvents: [13, 15]
    },
    {
      id: 15,
      date: '1971-12-06',
      title: 'India Recognizes Bangladesh',
      description: 'India becomes the first country to recognize Bangladesh as an independent state.',
      fullDescription: 'India\'s recognition of Bangladesh provided international legitimacy to the liberation struggle and paved the way for other nations to follow.',
      type: 'international',
      location: 'New Delhi, India',
      period: 'final-war',
      participants: [
        { name: 'Indira Gandhi', role: 'Indian Prime Minister' },
        { name: 'International Community', role: 'Observers' }
      ],
      casualties: null,
      significance: 'highest',
      image: 'https://picsum.photos/600/400?random=15',
      relatedEvents: [14, 16]
    },
    {
      id: 16,
      date: '1971-12-16',
      title: 'Victory Day - Pakistan Surrenders',
      description: 'Lt. General A.A.K. Niazi surrenders to Lt. General Jagjit Singh Aurora.',
      fullDescription: 'The formal surrender of Pakistani forces at Ramna Race Course marked the end of the nine-month liberation war and the birth of independent Bangladesh.',
      type: 'military',
      location: 'Dhaka',
      period: 'victory',
      participants: [
        { name: 'Lt. Gen. A.A.K. Niazi', role: 'Pakistani Commander' },
        { name: 'Lt. Gen. Jagjit Singh Aurora', role: 'Allied Commander' }
      ],
      casualties: null,
      significance: 'highest',
      image: 'https://picsum.photos/600/400?random=16',
      relatedEvents: [15]
    }
  ];
}

// Setup timeline filters
function setupTimelineFilters() {
  const filterButtons = document.querySelectorAll('.timeline-filters .btn');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Update current filter
      currentTimelineFilter = button.dataset.filter;
      
      // Re-render timeline
      renderTimeline();
      updateTimelineProgress();
    });
  });
}

// Setup view mode toggle
function setupViewModeToggle() {
  const viewModeInputs = document.querySelectorAll('input[name="viewMode"]');
  
  viewModeInputs.forEach(input => {
    input.addEventListener('change', (e) => {
      currentViewMode = e.target.value;
      renderTimeline();
    });
  });
}

// Setup timeline jump functionality
function setupTimelineJump() {
  const timelineSelect = document.getElementById('timelineSelect');
  
  timelineSelect.addEventListener('change', (e) => {
    const period = e.target.value;
    if (period) {
      jumpToPeriod(period);
    }
  });
}

// Filter events by type
function getFilteredEvents() {
  if (currentTimelineFilter === 'all') {
    return timelineEvents;
  }
  return timelineEvents.filter(event => event.type === currentTimelineFilter);
}

// Render timeline
function renderTimeline() {
  const timelineContainer = document.getElementById('timelineContainer');
  const filteredEvents = getFilteredEvents();
  
  // Clear container and set appropriate class
  timelineContainer.className = `timeline-container timeline-${currentViewMode}`;
  
  if (filteredEvents.length === 0) {
    timelineContainer.innerHTML = `
      <div class="text-center p-4">
        <p class="text-muted">No events found for this category.</p>
      </div>
    `;
    return;
  }
  
  timelineContainer.innerHTML = filteredEvents.map((event, index) => 
    createTimelineEventHTML(event, index)
  ).join('');
  
  // Add click listeners to events
  timelineContainer.querySelectorAll('.event-content').forEach(eventElement => {
    eventElement.addEventListener('click', (e) => {
      const eventId = parseInt(e.currentTarget.dataset.eventId);
      showEventModal(eventId);
    });
  });
  
  // Add click listeners to markers
  timelineContainer.querySelectorAll('.event-marker').forEach(marker => {
    marker.addEventListener('click', (e) => {
      e.stopPropagation();
      const eventId = parseInt(e.currentTarget.dataset.eventId);
      showEventModal(eventId);
    });
  });
}

// Create timeline event HTML
function createTimelineEventHTML(event, index) {
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const typeIcons = {
    political: 'fas fa-landmark',
    military: 'fas fa-shield-alt',
    international: 'fas fa-globe',
    social: 'fas fa-users'
  };
  
  return `
    <div class="timeline-event" style="animation-delay: ${index * 0.1}s">
      <div class="event-marker ${event.type}" data-event-id="${event.id}">
        <i class="${typeIcons[event.type]}"></i>
      </div>
      <div class="event-content ${event.type}" data-event-id="${event.id}">
        <div class="event-date">
          <i class="fas fa-calendar-alt"></i>
          ${formattedDate}
          <span class="event-type">${event.type.charAt(0).toUpperCase() + event.type.slice(1)}</span>
        </div>
        <h4 class="event-title">${event.title}</h4>
        <p class="event-description">${event.description}</p>
        <div class="event-meta">
          <span class="event-location">
            <i class="fas fa-map-marker-alt"></i>
            ${event.location}
          </span>
          ${event.casualties ? `
            <span class="event-casualties">
              <i class="fas fa-heart-broken"></i>
              ${event.casualties}
            </span>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}

// Jump to specific period
function jumpToPeriod(period) {
  const periodEvents = timelineEvents.filter(event => event.period === period);
  if (periodEvents.length > 0) {
    const firstEvent = periodEvents[0];
    const eventElement = document.querySelector(`[data-event-id="${firstEvent.id}"]`);
    if (eventElement) {
      eventElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Highlight the event temporarily
      eventElement.style.boxShadow = '0 0 20px rgba(0, 106, 78, 0.5)';
      setTimeout(() => {
        eventElement.style.boxShadow = '';
      }, 2000);
    }
  }
}

// Update timeline progress
function updateTimelineProgress() {
  const filteredEvents = getFilteredEvents();
  const progressBar = document.getElementById('timelineProgress');
  
  if (filteredEvents.length === 0) {
    progressBar.style.width = '0%';
    return;
  }
  
  // Calculate progress based on visible events vs total events
  const progress = (filteredEvents.length / timelineEvents.length) * 100;
  progressBar.style.width = `${progress}%`;
  
  // Update progress based on scroll position for vertical timeline
  if (currentViewMode === 'vertical') {
    window.addEventListener('scroll', updateScrollProgress);
  } else {
    window.removeEventListener('scroll', updateScrollProgress);
  }
}

// Update progress based on scroll position
function updateScrollProgress() {
  const timelineContainer = document.getElementById('timelineContainer');
  const containerRect = timelineContainer.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  
  // Calculate how much of the timeline is visible
  const visibleStart = Math.max(0, -containerRect.top);
  const visibleEnd = Math.min(containerRect.height, windowHeight - containerRect.top);
  const visiblePercentage = (visibleEnd - visibleStart) / containerRect.height;
  
  const progressBar = document.getElementById('timelineProgress');
  progressBar.style.width = `${Math.min(100, visiblePercentage * 100)}%`;
}

// Show event detail modal
function showEventModal(eventId) {
  const event = timelineEvents.find(e => e.id === eventId);
  if (!event) return;
  
  const modal = document.getElementById('eventModal');
  const modalTitle = document.getElementById('modalEventTitle');
  const modalContent = document.getElementById('modalEventContent');
  
  modalTitle.textContent = event.title;
  
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  let contentHTML = `
    <div class="event-detail-image" style="background-image: url('${event.image}')"></div>
    
    <div class="event-detail-meta">
      <div class="row">
        <div class="col-md-6">
          <p><strong>Date:</strong> ${formattedDate}</p>
          <p><strong>Type:</strong> ${event.type.charAt(0).toUpperCase() + event.type.slice(1)}</p>
          <p><strong>Location:</strong> ${event.location}</p>
        </div>
        <div class="col-md-6">
          <p><strong>Period:</strong> ${event.period.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
          <p><strong>Significance:</strong> ${event.significance.charAt(0).toUpperCase() + event.significance.slice(1)}</p>
          ${event.casualties ? `<p><strong>Casualties:</strong> ${event.casualties}</p>` : ''}
        </div>
      </div>
    </div>
    
    <div class="event-description">
      <h5>Description</h5>
      <p>${event.fullDescription}</p>
    </div>
  `;
  
  if (event.participants && event.participants.length > 0) {
    contentHTML += `
      <div class="event-participants">
        <h5>Key Participants</h5>
        ${event.participants.map(participant => `
          <div class="participant-card">
            <div class="participant-avatar">
              ${participant.name.charAt(0)}
            </div>
            <div class="participant-info">
              <h6>${participant.name}</h6>
              <small>${participant.role}</small>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
  
  if (event.relatedEvents && event.relatedEvents.length > 0) {
    const relatedEvents = event.relatedEvents
      .map(id => timelineEvents.find(e => e.id === id))
      .filter(e => e);
    
    if (relatedEvents.length > 0) {
      contentHTML += `
        <div class="related-events">
          <h5>Related Events</h5>
          <div class="row">
            ${relatedEvents.map(relatedEvent => `
              <div class="col-md-6 mb-2">
                <div class="card">
                  <div class="card-body p-2">
                    <h6 class="card-title mb-1" style="font-size: 0.9rem;">${relatedEvent.title}</h6>
                    <small class="text-muted">${new Date(relatedEvent.date).toLocaleDateString()}</small>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
  }
  
  contentHTML += `
    <div class="d-flex justify-content-end gap-2 mt-4">
      <button class="btn btn-secondary" onclick="closeEventModal()">Close</button>
      <button class="btn btn-outline-primary" onclick="addEventToFavorites(${event.id})">
        <i class="fas fa-bookmark me-2"></i>Bookmark Event
      </button>
    </div>
  `;
  
  modalContent.innerHTML = contentHTML;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close event modal
function closeEventModal() {
  const modal = document.getElementById('eventModal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Add event to favorites
function addEventToFavorites(eventId) {
  if (!state.favoriteEvents) {
    state.favoriteEvents = [];
  }
  
  if (!state.favoriteEvents.includes(eventId)) {
    state.favoriteEvents.push(eventId);
    localStorage.setItem('lwm_state', JSON.stringify(state));
    alert('Event bookmarked successfully!');
  } else {
    alert('Event is already bookmarked!');
  }
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('event-modal')) {
    closeEventModal();
  }
});

// Close modal on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeEventModal();
  }
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Wait for core to be loaded
  if (typeof initializeCore === 'function') {
    initializeCore();
  }
  initializeTimelinePage();
});

// Make functions available globally
window.closeEventModal = closeEventModal;
