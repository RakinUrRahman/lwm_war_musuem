// Memorial Page JavaScript - Liberation War Heroes and Martyrs

(function() {
    'use strict';

    // Liberation War Heroes Data
    const liberationWarHeroes = [
        {
            name: "Sheikh Mujibur Rahman",
            title: "Father of the Nation",
            description: "Led the independence movement and became the first President of Bangladesh.",
            icon: "fas fa-crown",
            photo: "https://orig00.deviantart.net/fde4/f/2016/010/3/b/portrait_of_bangabandhu_sheikh_mujibur_rahman_by_saidulislam-d9nf9g3.png",
            hasPhoto: true
        },
        {
            name: "Ziaur Rahman",
            title: "Bir Uttom",
            description: "Major who declared independence and later became President.",
            icon: "fas fa-medal",
            photo: "https://alchetron.com/cdn/ziaur-rahman-48a2c2ea-75c1-4620-ba19-0dabc97406e-resize-750.jpeg",
            hasPhoto: true
        },
        {
            name: "Abu Sadat Mohammad Sayem",
            title: "Bir Uttom",
            description: "Heroic freedom fighter and commander during the liberation war.",
            icon: "fas fa-star",
            photo: "https://futrlaw.org/wp-content/uploads/2017/05/mohammad_sayem.jpg",
            hasPhoto: true
        },
        {
            name: "K M Safiullah",
            title: "Bir Uttom",
            description: "Distinguished military officer and freedom fighter.",
            icon: "fas fa-shield-alt",
            photo: "https://ds.rokomari.store/rokomari110/people/d213dc7fa_1029.jpg",
            hasPhoto: true
        },
        {
            name: "M A G Osmani",
            title: "Commander-in-Chief",
            description: "Supreme commander of the Mukti Bahini forces.",
            icon: "fas fa-chess-king",
            photo: "https://tse3.mm.bing.net/th/id/OIP.wUWOKHCIUXfHbq3zeBxGEAAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
            hasPhoto: true
        },
        {
            name: "Khaled Mosharraf",
            title: "Bir Uttom",
            description: "Valiant sector commander who fought with extraordinary courage.",
            icon: "fas fa-sword",
            photo: "https://alchetron.com/cdn/khaled-mosharraf-abf46a1e-b2dc-4c48-a3fc-5208da5d605-resize-750.jpeg",
            hasPhoto: true
        }
    ];

    // Renowned Martyrs Data
    const renownedMartyrs = [
        {
            name: "Captain Mohiuddin Jahangir",
            title: "Bir Sreshtho",
            description: "Youngest recipient of Bir Sreshtho, martyred at age 25 in Chapainawabganj.",
            date: "December 14, 1971",
            photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Captain_Mohiuddin_Jahangir.jpg/220px-Captain_Mohiuddin_Jahangir.jpg",
            hasPhoto: true
        },
        {
            name: "Lance Naik Munshi Abdur Rouf",
            title: "Bir Sreshtho",
            description: "Brave soldier who fought till his last breath in Rangpur sector.",
            date: "April 8, 1971",
            photo: "",
            hasPhoto: false
        },
        {
            name: "Flight Lieutenant Matiur Rahman",
            title: "Bir Sreshtho",
            description: "PAF pilot who attempted to defect with a fighter aircraft.",
            date: "August 20, 1971",
            photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Flight_Lieutenant_Matiur_Rahman.jpg/220px-Flight_Lieutenant_Matiur_Rahman.jpg",
            hasPhoto: true
        },
        {
            name: "Sepoy Hamidur Rahman",
            title: "Bir Sreshtho",
            description: "Courageous soldier who made ultimate sacrifice for motherland.",
            date: "October 28, 1971",
            photo: "",
            hasPhoto: false
        },
        {
            name: "Sepoy Mostafa Kamal",
            title: "Bir Sreshtho",
            description: "Valiant freedom fighter who died fighting Pakistani forces.",
            date: "April 18, 1971",
            photo: "",
            hasPhoto: false
        },
        {
            name: "Nur Mohammad Sheikh",
            title: "Bir Sreshtho",
            description: "Heroic naval commando who conducted daring operations.",
            date: "August 16, 1971",
            photo: "",
            hasPhoto: false
        }
    ];

    // Image loading helper function with fallbacks
    function createImageElement(person, type = 'hero') {
        if (!person.hasPhoto || !person.photo) {
            return `<i class="${person.icon || (type === 'martyr' ? 'fas fa-star' : 'fas fa-user')}"></i>`;
        }

        // Create image with enhanced error handling
        const fallbackIcon = person.icon || (type === 'martyr' ? 'fas fa-star' : 'fas fa-user');
        return `
            <img src="${person.photo}" 
                 alt="${person.name}" 
                 onload="this.style.opacity='1';"
                 onerror="handleImageError(this, '${fallbackIcon}');"
                 style="opacity: 0; transition: opacity 0.3s ease;">
            <i class="${fallbackIcon}" style="display: none; opacity: 0;"></i>
        `;
    }

    // Enhanced image error handling
    function handleImageError(img, fallbackIcon) {
        img.style.display = 'none';
        const icon = img.parentNode.querySelector('i');
        if (icon) {
            icon.style.display = 'flex';
            icon.style.opacity = '1';
            icon.className = fallbackIcon;
        }
    }

    // Make handleImageError globally available
    window.handleImageError = handleImageError;

    // Tributes Data
    const memorialTributes = [
        {
            message: "Your sacrifice gave us a free homeland. We will never forget your courage and dedication to our motherland Bangladesh.",
            author: "A Grateful Citizen",
            category: "gratitude"
        },
        {
            message: "The red and green flag flies high because of your ultimate sacrifice. Your blood was not spilled in vain.",
            author: "Freedom Fighter's Son",
            category: "family"
        },
        {
            message: "In the annals of history, your names are written in golden letters. You are our eternal heroes.",
            author: "History Student",
            category: "general"
        },
        {
            message: "May Allah grant you the highest place in Jannah. Your sacrifice for our freedom will be remembered forever.",
            author: "Proud Bangladeshi",
            category: "prayer"
        },
        {
            message: "তোমাদের রক্তে রাঙানো এই মাটি,\nআজ স্বাধীন দেশের সম্পদ।\nভুলব না কোনোদিন সেই দান,\nতোমাদের অমর আত্মত্যাগ।",
            author: "A Poet's Heart",
            category: "poem"
        },
        {
            message: "Every Independence Day, we remember your sacrifice. You are the reason we celebrate freedom today.",
            author: "Veteran's Family",
            category: "gratitude"
        }
    ];

    // Timeline Events
    const memorialTimeline = [
        {
            date: "March 25, 1971",
            title: "Operation Searchlight Begins",
            description: "Pakistani army launched brutal crackdown. Thousands of innocent lives were lost in this dark night."
        },
        {
            date: "March 26, 1971",
            title: "Declaration of Independence",
            description: "Sheikh Mujibur Rahman declared independence. The liberation war officially began."
        },
        {
            date: "April 17, 1971",
            title: "Provisional Government Formed",
            description: "Government of Bangladesh formed in Mujibnagar, giving structure to the liberation movement."
        },
        {
            date: "December 14, 1971",
            title: "Martyred Intellectuals Day",
            description: "Pakistani forces and their collaborators killed prominent intellectuals in a systematic genocide."
        },
        {
            date: "December 16, 1971",
            title: "Victory Day",
            description: "Pakistani forces surrendered. Bangladesh achieved independence after 9 months of war."
        }
    ];

    // Liberation War 1971 Historical Sites Data - Only 1971 War Related Places
    const memorialSites = [
        // Major Liberation War Memorials
        {
            name: "Jatiyo Smriti Soudho (National Memorial)",
            location: [23.9159, 90.2594],
            type: "memorial",
            description: "The main national memorial commemorating the martyrs of the Liberation War of 1971.",
            address: "Savar, Dhaka",
            division: "Dhaka"
        },
        {
            name: "Mujibnagar Memorial Complex",
            location: [23.7024, 88.8142],
            type: "memorial",
            description: "Memorial at the historic site where Bangladesh's first government was formed on April 17, 1971.",
            address: "Mujibnagar, Meherpur",
            division: "Khulna"
        },
        {
            name: "Martyred Intellectuals Memorial",
            location: [23.8759, 90.3795],
            type: "martyrs",
            description: "Memorial dedicated to the intellectuals martyred on December 14, 1971.",
            address: "Mirpur, Dhaka",
            division: "Dhaka"
        },
        {
            name: "Rayerbazar Killing Ground Memorial",
            location: [23.7924, 90.3357],
            type: "martyrs",
            description: "Memorial at the site where intellectuals were killed during the final days of the Liberation War.",
            address: "Rayerbazar, Dhaka",
            division: "Dhaka"
        },

        // Liberation War Museums
        {
            name: "Liberation War Museum",
            location: [23.7465, 90.3936],
            type: "museum",
            description: "Premier museum showcasing artifacts and stories from the 1971 Liberation War.",
            address: "Segunbagicha, Dhaka",
            division: "Dhaka"
        },
        {
            name: "Osmani Museum",
            location: [24.8949, 91.8687],
            type: "museum",
            description: "Museum dedicated to General M.A.G. Osmani, Commander-in-Chief of Liberation War forces.",
            address: "Sylhet",
            division: "Sylhet"
        },
        {
            name: "Zia Memorial Museum",
            location: [22.3569, 91.7832],
            type: "museum",
            description: "Museum dedicated to Major Ziaur Rahman who declared independence on March 26, 1971.",
            address: "Chittagong",
            division: "Chittagong"
        },

        // Liberation War Monuments and Sculptures
        {
            name: "Aparajeyo Bangla",
            location: [23.7365, 90.3932],
            type: "monument",
            description: "Iconic sculpture symbolizing the indomitable spirit during the Liberation War.",
            address: "University of Dhaka",
            division: "Dhaka"
        },
        {
            name: "Shikha Anirban (Eternal Flame)",
            location: [23.7276, 90.3951],
            type: "monument",
            description: "Eternal flame monument commemorating Liberation War martyrs.",
            address: "Dhaka Medical College, Dhaka",
            division: "Dhaka"
        },

        // Major Battle Sites and War-Related Locations
        {
            name: "Chittagong Circuit House",
            location: [22.3569, 91.7832],
            type: "warsite",
            description: "Historic site where Major Zia declared independence on March 26, 1971.",
            address: "Chittagong",
            division: "Chittagong"
        },
        {
            name: "Kalurghat Radio Station",
            location: [22.3285, 91.7831],
            type: "warsite",
            description: "Radio station from where independence was declared during Liberation War.",
            address: "Kalurghat, Chittagong",
            division: "Chittagong"
        },
        {
            name: "Jessore Cantonment Liberation War Memorial",
            location: [23.1669, 89.2130],
            type: "memorial",
            description: "Memorial at the cantonment captured during Liberation War operations.",
            address: "Jessore",
            division: "Khulna"
        },
        {
            name: "Comilla Cantonment War Memorial",
            location: [23.4607, 91.1809],
            type: "memorial",
            description: "Memorial commemorating Liberation War battles in Comilla sector.",
            address: "Comilla",
            division: "Chittagong"
        },
        {
            name: "Mymensingh Liberation War Memorial",
            location: [24.7471, 90.4203],
            type: "memorial",
            description: "Memorial dedicated to Liberation War martyrs and freedom fighters of Mymensingh.",
            address: "Mymensingh",
            division: "Mymensingh"
        },

        // Sector Headquarters and Command Centers
        {
            name: "Sector 1 Headquarters Memorial",
            location: [24.8949, 91.8687],
            type: "warsite",
            description: "Memorial marking Sector 1 headquarters area during Liberation War.",
            address: "Sylhet",
            division: "Sylhet"
        },
        {
            name: "Sector 2 Headquarters Memorial",
            location: [22.3569, 91.7832],
            type: "warsite",
            description: "Memorial at Sector 2 headquarters region in Chittagong during Liberation War.",
            address: "Chittagong",
            division: "Chittagong"
        },
        {
            name: "Sector 8 Headquarters Memorial",
            location: [23.1669, 89.2130],
            type: "warsite",
            description: "Memorial at Sector 8 headquarters area in Kushtia region.",
            address: "Kushtia",
            division: "Khulna"
        },

        // Training Camps and Strategic Locations
        {
            name: "Mukti Bahini Training Camp Memorial",
            location: [25.7439, 88.4329],
            type: "warsite",
            description: "Memorial at site of Mukti Bahini training camp during Liberation War.",
            address: "Rangpur",
            division: "Rangpur"
        },
        {
            name: "Operation Jackpot Memorial",
            location: [22.3569, 91.7832],
            type: "warsite",
            description: "Memorial commemorating naval commando operations during Liberation War.",
            address: "Chittagong Port",
            division: "Chittagong"
        },

        // Refugee Camp and Border Crossing Sites
        {
            name: "Agartala Border Liberation War Memorial",
            location: [23.8315, 91.2868],
            type: "warsite",
            description: "Memorial near the border where thousands crossed during Liberation War.",
            address: "Brahmanbaria",
            division: "Chittagong"
        },
        {
            name: "Akhaura Border War Memorial",
            location: [23.9928, 91.1043],
            type: "warsite",
            description: "Memorial at border crossing point significant during Liberation War.",
            address: "Brahmanbaria",
            division: "Chittagong"
        },

        // Mass Killing Sites (Genocide Memorials)
        {
            name: "Chuknagar Genocide Memorial",
            location: [23.0815, 89.5181],
            type: "martyrs",
            description: "Memorial at site of one of the largest mass killings during Liberation War.",
            address: "Chuknagar, Khulna",
            division: "Khulna"
        },
        {
            name: "Hariharpara Genocide Memorial",
            location: [23.0815, 89.5181],
            type: "martyrs",
            description: "Memorial commemorating victims of genocide during Liberation War.",
            address: "Khulna",
            division: "Khulna"
        },

        // Victory Day Related Sites
        {
            name: "Dhaka Race Course Victory Memorial",
            location: [23.7465, 90.3936],
            type: "victory",
            description: "Site where Pakistani forces surrendered on December 16, 1971.",
            address: "Ramna, Dhaka",
            division: "Dhaka"
        },
        {
            name: "Paltan Maidan Liberation Rally Site",
            location: [23.7340, 90.4074],
            type: "victory",
            description: "Historic ground where major Liberation War rallies were held.",
            address: "Paltan, Dhaka",
            division: "Dhaka"
        }
    ];

    // Initialize the memorial page
    function initializeMemorialPage() {
        loadHeroes();
        loadMartyrs();
        loadTributes();
        loadTimeline();
        initializeMemorialMap();
        initializeTributeForm();
        addScrollFunctionality();
    }

    // Load heroes section
    function loadHeroes() {
        const heroesGrid = document.getElementById('heroesGrid');
        if (!heroesGrid) return;

        heroesGrid.innerHTML = liberationWarHeroes.map(hero => `
            <div class="hero-card fade-in">
                <div class="hero-image ${hero.hasPhoto ? 'has-photo' : ''}">
                    ${createImageElement(hero, 'hero')}
                </div>
                <div class="hero-name">${hero.name}</div>
                <div class="hero-title">${hero.title}</div>
                <div class="hero-description">${hero.description}</div>
            </div>
        `).join('');
    }

    // Load martyrs section
    function loadMartyrs() {
        const martyrsGrid = document.getElementById('martyrsGrid');
        if (!martyrsGrid) return;

        martyrsGrid.innerHTML = renownedMartyrs.map(martyr => `
            <div class="martyr-card fade-in">
                <div class="hero-image ${martyr.hasPhoto ? 'has-photo' : ''}">
                    ${createImageElement(martyr, 'martyr')}
                </div>
                <div class="hero-name">${martyr.name}</div>
                <div class="hero-title">${martyr.title}</div>
                <div class="hero-description">${martyr.description}</div>
                <div class="muted" style="margin-top: 1rem; font-size: 0.85rem; font-weight: 600;">
                    Martyred: ${martyr.date}
                </div>
            </div>
        `).join('');
    }

    // Initialize interactive memorial map
    function initializeMemorialMap() {
        // Check if Leaflet is available
        if (typeof L === 'undefined') {
            console.error('Leaflet library not loaded');
            return;
        }

        // Initialize map centered on Bangladesh
        const map = L.map('memorialMap').setView([23.6850, 90.3563], 7);

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 18,
        }).addTo(map);

        // Define custom icons for different Liberation War site types
        const icons = {
            memorial: L.divIcon({
                className: 'custom-memorial-icon',
                html: '<i class="fas fa-monument" style="color: var(--bangladesh-green); font-size: 16px;"></i>',
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            }),
            martyrs: L.divIcon({
                className: 'custom-martyrs-icon',
                html: '<i class="fas fa-star" style="color: var(--martyr-red); font-size: 16px;"></i>',
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            }),
            museum: L.divIcon({
                className: 'custom-museum-icon',
                html: '<i class="fas fa-university" style="color: var(--victory-gold); font-size: 16px;"></i>',
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            }),
            monument: L.divIcon({
                className: 'custom-monument-icon',
                html: '<i class="fas fa-flag" style="color: var(--hope-green); font-size: 16px;"></i>',
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            }),
            warsite: L.divIcon({
                className: 'custom-warsite-icon',
                html: '<i class="fas fa-crosshairs" style="color: #8B0000; font-size: 16px;"></i>',
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            }),
            victory: L.divIcon({
                className: 'custom-victory-icon',
                html: '<i class="fas fa-trophy" style="color: #FFD700; font-size: 16px;"></i>',
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            })
        };

        // Add markers for each memorial site
        memorialSites.forEach(site => {
            const marker = L.marker(site.location, {
                icon: icons[site.type] || icons.memorial
            }).addTo(map);

            // Create popup content
            const popupContent = `
                <div class="memorial-popup">
                    <h4>${site.name}</h4>
                    <p><i class="fas fa-map-marker-alt"></i> ${site.address}</p>
                    <p><i class="fas fa-map"></i> ${site.division} Division</p>
                    <p>${site.description}</p>
                    <span class="popup-category">${getCategoryName(site.type)}</span>
                </div>
            `;

            marker.bindPopup(popupContent);
        });

        // Add map controls
        L.control.scale().addTo(map);

        // Store map reference for potential future use
        window.memorialMap = map;
    }

    // Get category display name for Liberation War sites
    function getCategoryName(type) {
        const categories = {
            'memorial': 'Liberation War Memorial',
            'martyrs': 'Martyrs Memorial Site',
            'museum': 'Liberation War Museum',
            'monument': 'Liberation Monument',
            'warsite': 'War Site/Battle Ground',
            'victory': 'Victory Site'
        };
        return categories[type] || 'Liberation War Site';
    }
    function loadTributes() {
        const tributesGrid = document.getElementById('tributesGrid');
        if (!tributesGrid) return;

        tributesGrid.innerHTML = memorialTributes.map(tribute => `
            <div class="tribute-card fade-in">
                <div class="tribute-message">${tribute.message}</div>
                <div class="tribute-author">— ${tribute.author}</div>
                <span class="tribute-category">${getCategoryLabel(tribute.category)}</span>
            </div>
        `).join('');
    }

    // Load timeline section
    function loadTimeline() {
        const timelineContainer = document.getElementById('memorialTimeline');
        if (!timelineContainer) return;

        timelineContainer.innerHTML = memorialTimeline.map(event => `
            <div class="timeline-event fade-in">
                <div class="timeline-date">${event.date}</div>
                <div class="timeline-title">${event.title}</div>
                <div class="timeline-description">${event.description}</div>
            </div>
        `).join('');
    }

    // Get category label for tributes
    function getCategoryLabel(category) {
        const labels = {
            'general': 'General Tribute',
            'family': 'Family Member',
            'gratitude': 'Gratitude',
            'prayer': 'Prayer',
            'poem': 'Poetry'
        };
        return labels[category] || 'Tribute';
    }

    // Initialize tribute form
    function initializeTributeForm() {
        const form = document.getElementById('tributeForm');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            submitTribute();
        });
    }

    // Submit tribute function
    function submitTribute() {
        const name = document.getElementById('tributeName').value.trim();
        const message = document.getElementById('tributeMessage').value.trim();
        const category = document.getElementById('tributeCategory').value;

        if (!name || !message) {
            alert('Please fill in all required fields.');
            return;
        }

        // Create new tribute object
        const newTribute = {
            message: message,
            author: name,
            category: category
        };

        // Add to tributes array
        memorialTributes.unshift(newTribute);

        // Reload tributes
        loadTributes();

        // Clear form
        document.getElementById('tributeForm').reset();

        // Show success message
        showNotification('Thank you for your tribute. It has been added to our memorial wall.', 'success');

        // Scroll to tributes section
        scrollToSection('tributes');
    }

    // Show notification
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;

        // Add to body
        document.body.appendChild(notification);

        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'var(--hope-green)' : 'var(--bangladesh-green)'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--radius);
            box-shadow: var(--shadow);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
        `;

        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    // Add scroll functionality
    function addScrollFunctionality() {
        // Add smooth scroll CSS if not present
        if (!document.querySelector('#memorial-scroll-styles')) {
            const style = document.createElement('style');
            style.id = 'memorial-scroll-styles';
            style.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
                html { scroll-behavior: smooth; }
            `;
            document.head.appendChild(style);
        }
    }

    // Scroll to section function (global)
    window.scrollToSection = function(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    // Memorial-specific search functionality
    function initializeMemorialSearch() {
        const searchInput = document.getElementById('globalSearch');
        if (!searchInput) return;

        // Add memorial-specific search placeholder
        searchInput.placeholder = 'Search heroes, martyrs, tributes...';

        // Enhanced search for memorial content
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase().trim();
            
            if (query.length < 2) {
                // Reset view if query is too short
                loadHeroes();
                loadMartyrs();
                loadTributes();
                return;
            }

            // Filter heroes
            const filteredHeroes = liberationWarHeroes.filter(hero => 
                hero.name.toLowerCase().includes(query) ||
                hero.title.toLowerCase().includes(query) ||
                hero.description.toLowerCase().includes(query)
            );

            // Filter martyrs
            const filteredMartyrs = renownedMartyrs.filter(martyr => 
                martyr.name.toLowerCase().includes(query) ||
                martyr.title.toLowerCase().includes(query) ||
                martyr.description.toLowerCase().includes(query)
            );

            // Filter tributes
            const filteredTributes = memorialTributes.filter(tribute => 
                tribute.message.toLowerCase().includes(query) ||
                tribute.author.toLowerCase().includes(query) ||
                tribute.category.toLowerCase().includes(query)
            );

            // Update displays
            updateSearchResults('heroesGrid', filteredHeroes, 'hero');
            updateSearchResults('martyrsGrid', filteredMartyrs, 'martyr');
            updateSearchResults('tributesGrid', filteredTributes, 'tribute');
        });
    }

    // Update search results
    function updateSearchResults(gridId, results, type) {
        const grid = document.getElementById(gridId);
        if (!grid) return;

        if (results.length === 0) {
            grid.innerHTML = `<div class="card" style="text-align: center; color: var(--muted);">
                <i class="fas fa-search fa-2x" style="margin-bottom: 1rem;"></i>
                <p>No ${type}s found matching your search.</p>
            </div>`;
            return;
        }

        if (type === 'hero') {
            grid.innerHTML = results.map(hero => `
                <div class="hero-card fade-in">
                    <div class="hero-image ${hero.hasPhoto ? 'has-photo' : ''}">
                        ${createImageElement(hero, 'hero')}
                    </div>
                    <div class="hero-name">${hero.name}</div>
                    <div class="hero-title">${hero.title}</div>
                    <div class="hero-description">${hero.description}</div>
                </div>
            `).join('');
        } else if (type === 'martyr') {
            grid.innerHTML = results.map(martyr => `
                <div class="martyr-card fade-in">
                    <div class="hero-image ${martyr.hasPhoto ? 'has-photo' : ''}">
                        ${createImageElement(martyr, 'martyr')}
                    </div>
                    <div class="hero-name">${martyr.name}</div>
                    <div class="hero-title">${martyr.title}</div>
                    <div class="hero-description">${martyr.description}</div>
                    <div class="muted" style="margin-top: 1rem; font-size: 0.85rem; font-weight: 600;">
                        Martyred: ${martyr.date}
                    </div>
                </div>
            `).join('');
        } else if (type === 'tribute') {
            grid.innerHTML = results.map(tribute => `
                <div class="tribute-card fade-in">
                    <div class="tribute-message">${tribute.message}</div>
                    <div class="tribute-author">— ${tribute.author}</div>
                    <span class="tribute-category">${getCategoryLabel(tribute.category)}</span>
                </div>
            `).join('');
        }
    }

    // Initialize when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        initializeMemorialPage();
        initializeMemorialSearch();
    });

    // Export functions for external use
    window.MemorialPage = {
        scrollToSection: window.scrollToSection,
        submitTribute: submitTribute,
        loadHeroes: loadHeroes,
        loadMartyrs: loadMartyrs,
        loadTributes: loadTributes
    };

})();
