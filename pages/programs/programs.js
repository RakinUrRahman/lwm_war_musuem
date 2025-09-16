// Programs Page Functionality
let currentProgramFilter = 'all';
let currentProgramPage = 1;
let currentView = 'grid';
const programsPerPage = 6;
let allProgramsData = [];

// Initialize programs page
function initializeProgramsPage() {
  loadProgramsData();
  setupProgramFilters();
  setupViewToggle();
  setupPagination();
  renderPrograms();
  renderFeaturedPrograms();
}

// Load programs data
function loadProgramsData() {
  // Generate programs data if not exists
  if (!state.programs || state.programs.length === 0) {
    state.programs = generateProgramsData();
    localStorage.setItem('lwm_state', JSON.stringify(state));
  }
  allProgramsData = state.programs;
}

// Generate sample programs data
function generateProgramsData() {
  // Predefined image URLs for programs
  const programImages = [
    '../media/uploads/artifacts/1756579360_download (3).jpeg',
    '../media/uploads/artifacts/1756724716_WhatsApp Image 2025-09-01 at 16.50.11_7a72ed69.jpg',
    '../media/uploads/artifacts/1756725024_images (1).jpeg',
    '../media/uploads/artifacts/Human_Remains.jpg',
    '../media/uploads/artifacts/OIP.webp',
    '../media/uploads/artifacts/OLC.webp',
    '../media/uploads/artifacts/th.jpg',
    '../media/uploads/thumbnails/1756587899_thumb_download1.jpeg',
    '../media/uploads/thumbnails/1756590463_thumb_Screenshot 2025-08-31 034235.png'
  ];

  const programCategories = [
    'workshops',
    'seminars', 
    'exhibitions',
    'conferences',
    'tours'
  ];

  const programTemplates = {
    workshops: [
      {
        title: 'Liberation War History Workshop',
        description: 'Interactive workshop exploring the key events and heroes of the 1971 Liberation War',
        duration: '2 hours',
        price: 'Free',
        capacity: 30,
        level: 'Beginner'
      },
      {
        title: 'Documentary Filmmaking Workshop',
        description: 'Learn to create historical documentaries with professional guidance',
        duration: '4 hours',
        price: '$25',
        capacity: 20,
        level: 'Intermediate'
      },
      {
        title: 'Oral History Collection Workshop',
        description: 'Techniques for collecting and preserving oral histories from war veterans',
        duration: '3 hours',
        price: '$15',
        capacity: 25,
        level: 'Advanced'
      }
    ],
    seminars: [
      {
        title: 'Bangladesh Liberation War: Global Perspective',
        description: 'Understanding the international context and support during the Liberation War',
        duration: '1.5 hours',
        price: 'Free',
        capacity: 100,
        level: 'All Levels'
      },
      {
        title: 'Women in the Liberation War',
        description: 'Highlighting the crucial role of women freedom fighters and supporters',
        duration: '2 hours',
        price: 'Free',
        capacity: 80,
        level: 'All Levels'
      }
    ],
    exhibitions: [
      {
        title: 'Artifacts of Freedom Exhibition',
        description: 'Guided tour through rare artifacts and documents from the Liberation War',
        duration: '1 hour',
        price: '$10',
        capacity: 50,
        level: 'All Levels'
      },
      {
        title: 'Photography of 1971 Exhibition',
        description: 'Historical photographs capturing moments of the Liberation War',
        duration: '45 minutes',
        price: '$8',
        capacity: 60,
        level: 'All Levels'
      }
    ],
    conferences: [
      {
        title: 'Annual Liberation War Research Conference',
        description: 'Academic conference featuring latest research on Liberation War history',
        duration: '8 hours',
        price: '$50',
        capacity: 200,
        level: 'Academic'
      },
      {
        title: 'Youth Leadership Conference',
        description: 'Inspiring young leaders through Liberation War values and principles',
        duration: '6 hours',
        price: '$30',
        capacity: 150,
        level: 'Student'
      }
    ],
    tours: [
      {
        title: 'Complete Museum Guided Tour',
        description: 'Comprehensive tour covering all galleries and historical sections',
        duration: '2 hours',
        price: '$12',
        capacity: 25,
        level: 'All Levels'
      },
      {
        title: 'Behind the Scenes Tour',
        description: 'Exclusive access to museum archives and preservation facilities',
        duration: '1.5 hours',
        price: '$20',
        capacity: 15,
        level: 'All Levels'
      }
    ]
  };

  const programs = [];
  let id = 1;

  programCategories.forEach(category => {
    programTemplates[category].forEach((template, index) => {
      // Generate multiple sessions for each program
      for (let session = 1; session <= 3; session++) {
        const startDate = new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
        const endDate = new Date(startDate);
        endDate.setHours(startDate.getHours() + parseInt(template.duration));

        programs.push({
          id: id++,
          title: `${template.title} - Session ${session}`,
          description: template.description,
          fullDescription: `${template.description}\n\nThis comprehensive program offers participants an in-depth exploration of the topic through interactive sessions, expert presentations, and hands-on activities. Our experienced facilitators will guide you through historical contexts, contemporary relevance, and practical applications.\n\nWhat you'll learn:\n• Historical background and significance\n• Key figures and their contributions\n• Contemporary relevance and lessons\n• Interactive discussions and Q&A\n\nWho should attend:\n• Students and educators\n• History enthusiasts\n• Researchers and scholars\n• General public interested in Liberation War history`,
          category: category,
          duration: template.duration,
          price: template.price,
          capacity: template.capacity,
          level: template.level,
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
          startTime: `${9 + Math.floor(Math.random() * 8)}:00`,
          endTime: `${11 + Math.floor(Math.random() * 6)}:00`,
          instructor: `Dr. ${['Rahman', 'Ahmed', 'Khan', 'Begum', 'Hasan'][Math.floor(Math.random() * 5)]}`,
          location: ['Main Auditorium', 'Conference Room A', 'Gallery 1', 'Workshop Room', 'Exhibition Hall'][Math.floor(Math.random() * 5)],
          image: programImages[(id - 1) % programImages.length],
          featured: index === 0 && session === 1,
          enrolled: Math.floor(Math.random() * template.capacity * 0.8),
          schedule: [
            { time: '09:00 - 10:00', activity: 'Introduction and Overview' },
            { time: '10:00 - 11:00', activity: 'Main Presentation' },
            { time: '11:00 - 11:15', activity: 'Break' },
            { time: '11:15 - 12:00', activity: 'Interactive Session' },
            { time: '12:00 - 12:30', activity: 'Q&A and Closing' }
          ]
        });
      }
    });
  });

  return programs.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
}

// Setup program filters
function setupProgramFilters() {
  const filterButtons = document.querySelectorAll('.category-filters .btn');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Update current filter
      currentProgramFilter = button.dataset.category;
      currentProgramPage = 1; // Reset to first page
      
      // Re-render programs
      renderPrograms();
      updatePagination();
    });
  });
}

// Setup view toggle
function setupViewToggle() {
  const viewButtons = document.querySelectorAll('.view-options .btn');
  const programsContainer = document.querySelector('.programs-container');
  
  viewButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      viewButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Update current view
      currentView = button.dataset.view;
      
      // Toggle container class
      if (currentView === 'list') {
        programsContainer.classList.add('list-view');
      } else {
        programsContainer.classList.remove('list-view');
      }
      
      // Re-render programs
      renderPrograms();
    });
  });
}

// Filter programs by category
function getFilteredPrograms() {
  if (currentProgramFilter === 'all') {
    return allProgramsData;
  }
  return allProgramsData.filter(program => program.category === currentProgramFilter);
}

// Get paginated programs
function getPaginatedPrograms() {
  const filteredPrograms = getFilteredPrograms();
  const startIndex = (currentProgramPage - 1) * programsPerPage;
  const endIndex = startIndex + programsPerPage;
  return filteredPrograms.slice(startIndex, endIndex);
}

// Render featured programs
function renderFeaturedPrograms() {
  const featuredContainer = document.getElementById('featuredPrograms');
  const featuredPrograms = allProgramsData.filter(program => program.featured);
  
  featuredContainer.innerHTML = featuredPrograms.map(program => 
    programCard(program, true)
  ).join('');
  
  // Add event listeners
  addProgramEventListeners(featuredContainer);
}

// Render programs
function renderPrograms() {
  const programsGrid = document.getElementById('programsGrid');
  const paginatedPrograms = getPaginatedPrograms();
  
  if (paginatedPrograms.length === 0) {
    programsGrid.innerHTML = `
      <div class="col-12 text-center">
        <p class="text-muted">No programs found for this category.</p>
      </div>
    `;
    return;
  }
  
  programsGrid.innerHTML = paginatedPrograms.map(program => 
    programCard(program, false)
  ).join('');
  
  // Add event listeners
  addProgramEventListeners(programsGrid);
}

// Create program card HTML
function programCard(program, featured = false) {
  const availableSpots = program.capacity - program.enrolled;
  const enrollmentStatus = availableSpots > 0 ? 'Available' : 'Full';
  const enrollmentClass = availableSpots > 0 ? 'text-success' : 'text-danger';
  
  return `
    <div class="col-md-6 col-lg-4">
      <div class="card program-card ${featured ? 'featured' : ''} h-100">
        <div class="program-image" style="background-image: url('${program.image}')">
          <span class="program-badge">${program.category.replace('-', ' ')}</span>
          <div class="program-overlay">
            <p class="mb-0">${program.description}</p>
          </div>
        </div>
        <div class="card-body">
          <h5 class="card-title">${program.title}</h5>
          <div class="program-meta">
            <span><i class="fas fa-clock"></i> ${program.duration}</span>
            <span><i class="fas fa-calendar"></i> ${formatDate(program.startDate)}</span>
            <span><i class="fas fa-map-marker-alt"></i> ${program.location}</span>
          </div>
          <div class="program-meta">
            <span><i class="fas fa-user"></i> ${program.instructor}</span>
            <span class="program-duration">${program.level}</span>
          </div>
          <div class="d-flex justify-content-between align-items-center mt-3">
            <span class="program-price ${program.price === 'Free' ? 'free' : ''}">${program.price}</span>
            <small class="${enrollmentClass}">
              <i class="fas fa-users"></i> ${availableSpots} spots left
            </small>
          </div>
          <div class="program-actions">
            <button class="btn btn-outline-info btn-sm flex-fill view-details-btn" data-program-id="${program.id}">
              <i class="fas fa-info-circle me-1"></i>Details
            </button>
            <button class="btn btn-primary btn-sm flex-fill register-btn" data-program-id="${program.id}" ${availableSpots === 0 ? 'disabled' : ''}>
              <i class="fas fa-user-plus me-1"></i>${availableSpots > 0 ? 'Register' : 'Full'}
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Add event listeners to program cards
function addProgramEventListeners(container) {
  // View details buttons
  container.querySelectorAll('.view-details-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const programId = parseInt(e.target.dataset.programId);
      showProgramModal(programId);
    });
  });
  
  // Register buttons
  container.querySelectorAll('.register-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (!e.target.disabled) {
        const programId = parseInt(e.target.dataset.programId);
        showRegistrationModal(programId);
      }
    });
  });
}

// Show program detail modal
function showProgramModal(programId) {
  const program = allProgramsData.find(p => p.id === programId);
  if (!program) return;
  
  const modal = document.getElementById('programModal');
  const modalTitle = document.getElementById('modalProgramTitle');
  const modalContent = document.getElementById('modalProgramContent');
  
  modalTitle.textContent = program.title;
  modalContent.innerHTML = `
    <div class="program-detail-image" style="background-image: url('${program.image}')"></div>
    
    <div class="program-detail-meta">
      <div class="row">
        <div class="col-md-6">
          <p><strong>Duration:</strong> ${program.duration}</p>
          <p><strong>Date:</strong> ${formatDate(program.startDate)}</p>
          <p><strong>Time:</strong> ${program.startTime} - ${program.endTime}</p>
        </div>
        <div class="col-md-6">
          <p><strong>Instructor:</strong> ${program.instructor}</p>
          <p><strong>Location:</strong> ${program.location}</p>
          <p><strong>Level:</strong> ${program.level}</p>
        </div>
        <div class="col-md-6">
          <p><strong>Price:</strong> ${program.price}</p>
          <p><strong>Capacity:</strong> ${program.capacity} participants</p>
        </div>
        <div class="col-md-6">
          <p><strong>Enrolled:</strong> ${program.enrolled} participants</p>
          <p><strong>Available:</strong> ${program.capacity - program.enrolled} spots</p>
        </div>
      </div>
    </div>
    
    <div class="program-description">
      <h5>About This Program</h5>
      <p>${program.fullDescription}</p>
    </div>
    
    <div class="program-schedule">
      <div class="program-schedule-header">
        <i class="fas fa-clock me-2"></i>Program Schedule
      </div>
      ${program.schedule.map(item => `
        <div class="program-schedule-item">
          <span class="schedule-time">${item.time}</span>
          <span class="schedule-activity">${item.activity}</span>
        </div>
      `).join('')}
    </div>
    
    <div class="d-flex justify-content-end gap-2 mt-4">
      <button class="btn btn-secondary" onclick="closeProgramModal()">Close</button>
      <button class="btn btn-primary" onclick="showRegistrationModal(${program.id}); closeProgramModal();" ${program.capacity - program.enrolled === 0 ? 'disabled' : ''}>
        <i class="fas fa-user-plus me-2"></i>Register Now
      </button>
    </div>
  `;
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Show registration modal
function showRegistrationModal(programId) {
  const program = allProgramsData.find(p => p.id === programId);
  if (!program) return;
  
  const modal = document.getElementById('registrationModal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  // Store program ID for form submission
  modal.dataset.programId = programId;
  
  // Reset form
  document.getElementById('registrationForm').reset();
}

// Close modals
function closeProgramModal() {
  const modal = document.getElementById('programModal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function closeRegistrationModal() {
  const modal = document.getElementById('registrationModal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Handle registration form submission
function handleRegistrationSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const registrationData = {
    fullName: formData.get('fullName'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    institution: formData.get('institution'),
    participantType: formData.get('participantType'),
    specialRequirements: formData.get('specialRequirements'),
    programId: parseInt(document.getElementById('registrationModal').dataset.programId),
    registrationDate: new Date().toISOString()
  };
  
  // Here you would typically send this data to a server
  console.log('Registration submitted:', registrationData);
  
  // For demo purposes, show success message
  alert('Registration submitted successfully! You will receive a confirmation email shortly.');
  
  // Close modal and reset form
  closeRegistrationModal();
  e.target.reset();
  
  // Update enrollment count (demo only)
  const program = allProgramsData.find(p => p.id === registrationData.programId);
  if (program && program.enrolled < program.capacity) {
    program.enrolled++;
    localStorage.setItem('lwm_state', JSON.stringify(state));
    renderPrograms();
    renderFeaturedPrograms();
  }
}

// Setup pagination
function setupPagination() {
  updatePagination();
  
  // Add click listeners for pagination buttons
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('page-btn')) {
      const page = parseInt(e.target.dataset.page);
      if (page && page !== currentProgramPage) {
        currentProgramPage = page;
        renderPrograms();
        updatePagination();
        
        // Scroll to top of programs section
        document.querySelector('.all-programs').scrollIntoView({ 
          behavior: 'smooth' 
        });
      }
    }
    
    if (e.target.classList.contains('prev-btn')) {
      if (currentProgramPage > 1) {
        currentProgramPage--;
        renderPrograms();
        updatePagination();
      }
    }
    
    if (e.target.classList.contains('next-btn')) {
      const totalPages = Math.ceil(getFilteredPrograms().length / programsPerPage);
      if (currentProgramPage < totalPages) {
        currentProgramPage++;
        renderPrograms();
        updatePagination();
      }
    }
  });
}

// Update pagination display
function updatePagination() {
  const filteredPrograms = getFilteredPrograms();
  const totalPages = Math.ceil(filteredPrograms.length / programsPerPage);
  const paginationContainer = document.getElementById('programsPagination');
  
  if (totalPages <= 1) {
    paginationContainer.innerHTML = '';
    return;
  }
  
  let paginationHTML = `
    <button class="btn prev-btn" ${currentProgramPage === 1 ? 'disabled' : ''}>
      <i class="fas fa-chevron-left"></i>
    </button>
  `;
  
  // Show page numbers
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentProgramPage - 2 && i <= currentProgramPage + 2)) {
      paginationHTML += `
        <button class="btn page-btn ${i === currentProgramPage ? 'active' : ''}" data-page="${i}">
          ${i}
        </button>
      `;
    } else if (i === currentProgramPage - 3 || i === currentProgramPage + 3) {
      paginationHTML += `<span class="pagination-dots">...</span>`;
    }
  }
  
  paginationHTML += `
    <button class="btn next-btn" ${currentProgramPage === totalPages ? 'disabled' : ''}>
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

// Close modals when clicking outside
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('program-modal')) {
    closeProgramModal();
  }
  if (e.target.classList.contains('registration-modal')) {
    closeRegistrationModal();
  }
});

// Close modals on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProgramModal();
    closeRegistrationModal();
  }
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Wait for core to be loaded
  if (typeof initializeCore === 'function') {
    initializeCore();
  }
  initializeProgramsPage();
  
  // Setup registration form
  const registrationForm = document.getElementById('registrationForm');
  if (registrationForm) {
    registrationForm.addEventListener('submit', handleRegistrationSubmit);
  }
});

// Make functions available globally
window.closeProgramModal = closeProgramModal;
window.closeRegistrationModal = closeRegistrationModal;
window.showRegistrationModal = showRegistrationModal;
