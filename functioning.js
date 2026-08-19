/**
 * Chauke Village Portal - JavaScript
 * Features: Mobile menu, smooth scrolling, filtering, search, lightbox, validation
 */

// --- Data Arrays ---

const PLACES_DATA = [
  {
    id: 1,
    name: "Gram Panchayat Bhawan",
    category: "admin",
    description: "The administrative heart of Chauke village where local governance takes place.",
    image: "https://picsum.photos/seed/panchayat/600/400",
    location: "Center of Village"
  },
  {
    id: 2,
    name: "Village Gurdwara Sahib",
    category: "religious",
    description: "A serene place of worship and community gathering for the villagers.",
    image: "https://picsum.photos/seed/gurdwara/600/400",
    location: "Main Street"
  },
  {
    id: 3,
    name: "Local Primary School",
    category: "education",
    description: "Nurturing the future generations of Chauke with quality primary education.",
    image: "https://picsum.photos/seed/school/600/400",
    location: "North Side"
  },
  {
    id: 4,
    name: "Cooperative Society",
    category: "agriculture",
    description: "Supporting local farmers with seeds, fertilizers, and agricultural guidance.",
    image: "https://picsum.photos/seed/agri/600/400",
    location: "Near Fields"
  },
  {
    id: 5,
    name: "Village Playground",
    category: "sports",
    description: "The hub for youth sports activities including Kabaddi and Volleyball.",
    image: "https://picsum.photos/seed/sports/600/400",
    location: "South Entrance"
  },
  {
    id: 6,
    name: "Heritage Peepal Tree",
    category: "nature",
    description: "A centuries-old tree that has witnessed the history of our village.",
    image: "https://picsum.photos/seed/nature/600/400",
    location: "Village Chopal"
  }
];

const EVENTS_DATA = [
  {
    id: 1,
    title: "Vaisakhi Mela",
    date: "April 13-14",
    category: "festival",
    description: "Celebrating the harvest festival with traditional Bhangra and local stalls.",
    image: "https://picsum.photos/seed/mela/600/400",
    location: "Main Mela Ground"
  },
  {
    id: 2,
    title: "Annual Sports Meet",
    date: "February 15",
    category: "sports",
    description: "Inter-village sports competitions including Kabaddi and Athletics.",
    image: "https://picsum.photos/seed/kabaddi/600/400",
    location: "Village Stadium"
  },
  {
    id: 3,
    title: "Guru Nanak Jayanti",
    date: "November (Varies)",
    category: "religious",
    description: "Prakash Parv celebrations with Nagar Kirtan and community Langar.",
    image: "https://picsum.photos/seed/nagar/600/400",
    location: "Village Gurdwara"
  },
  {
    id: 4,
    title: "Cultural Heritage Night",
    date: "October 20",
    category: "cultural",
    description: "Traditional folk singing and storytelling by the village elders.",
    image: "https://picsum.photos/seed/folk/600/400",
    location: "Village Chopal"
  }
];

const GALLERY_DATA = [
  { id: 1, title: "Golden Mustard Fields", category: "agriculture", image: "https://picsum.photos/seed/mustard/800/800" },
  { id: 2, title: "Traditional Punjabi House", category: "culture", image: "https://picsum.photos/seed/house/800/800" },
  { id: 3, title: "Kabaddi Match", category: "sports", image: "https://picsum.photos/seed/game/800/800" },
  { id: 4, title: "Village Entrance Gate", category: "places", image: "https://picsum.photos/seed/gate/800/800" },
  { id: 5, title: "Tractor in Field", category: "agriculture", image: "https://picsum.photos/seed/tractor/800/800" },
  { id: 6, title: "Festival Decorations", category: "festivals", image: "https://picsum.photos/seed/decor/800/800" },
  { id: 7, title: "Village Sunset", category: "nature", image: "https://picsum.photos/seed/sunset/800/800" },
  { id: 8, title: "Community Langar", category: "culture", image: "https://picsum.photos/seed/langar/800/800" },
  { id: 9, title: "Heritage Building", category: "history", image: "https://picsum.photos/seed/history/800/800" },
  { id: 10, title: "Youth Cricket Team", category: "sports", image: "https://picsum.photos/seed/cricket/800/800" },
  { id: 11, title: "Panchayat Meeting", category: "culture", image: "https://picsum.photos/seed/meeting/800/800" },
  { id: 12, title: "Local Market", category: "places", image: "https://picsum.photos/seed/market/800/800" }
];

// --- Initialization ---

document.addEventListener('DOMContentLoaded', () => {
  renderPlaces(PLACES_DATA);
  renderEvents(EVENTS_DATA);
  renderGallery(GALLERY_DATA);
  initApp();
});

// --- Core App Functions ---

function initApp() {
  // Mobile Navigation
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = menuBtn.querySelector('i');
      if (icon) {
        icon.className = navLinks.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
      }
    });
  }

  // Close menu when clicking link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const icon = menuBtn.querySelector('i');
      if (icon) icon.className = 'fas fa-bars';
    });
  });

  // Active Link on Scroll
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 100;
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    sections.forEach(section => {
      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${section.id}`) {
            item.classList.add('active');
          }
        });
      }
    });

    // Header Background Change
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
      header.style.padding = '0.5rem 0';
    } else {
      header.style.padding = '1rem 0';
    }

    // Scroll to Top Button
    const scrollTop = document.querySelector('.scroll-top');
    if (window.scrollY > 500) {
      scrollTop.classList.add('visible');
    } else {
      scrollTop.classList.remove('visible');
    }
  });

  // Reveal Animations
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Search Places
  const searchInput = document.querySelector('.search-box');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase();
      const filtered = PLACES_DATA.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.description.toLowerCase().includes(term)
      );
      renderPlaces(filtered);
    });
  }

  // Event Filtering
  const eventFilterBtns = document.querySelectorAll('.event-filter-btn');
  eventFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      eventFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.dataset.filter;
      const filtered = category === 'all' ? EVENTS_DATA : EVENTS_DATA.filter(e => e.category === category);
      renderEvents(filtered);
    });
  });

  // Gallery Filtering
  const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
  galleryFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      galleryFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.dataset.filter;
      const filtered = category === 'all' ? GALLERY_DATA : GALLERY_DATA.filter(g => g.category === category);
      renderGallery(filtered);
    });
  });

  // Contact Validation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (validateForm()) {
        alert('Thank you! Your message has been sent successfully (Simulated).');
        contactForm.reset();
      }
    });
  }

  // Scroll to Top Click
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    scrollTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// --- Rendering Functions ---

function renderPlaces(data) {
  const container = document.getElementById('placesGrid');
  if (!container) return;
  
  if (data.length === 0) {
    container.innerHTML = '<p class="text-center w-full">No places found.</p>';
    return;
  }

  container.innerHTML = data.map(place => `
    <div class="item-card reveal">
      <div class="item-img">
        <img src="${place.image}" alt="${place.name}" loading="lazy">
      </div>
      <div class="item-info">
        <span class="item-tag">${place.category.toUpperCase()}</span>
        <h3>${place.name}</h3>
        <p>${place.description}</p>
        <p><i class="fas fa-map-marker-alt"></i> ${place.location}</p>
      </div>
    </div>
  `).join('');
  
  // Re-observe new elements
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('active');
    });
  });
  container.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function renderEvents(data) {
  const container = document.getElementById('eventsGrid');
  if (!container) return;

  if (data.length === 0) {
    container.innerHTML = '<p class="text-center w-full">No events found.</p>';
    return;
  }

  container.innerHTML = data.map(event => `
    <div class="item-card reveal">
      <div class="item-img">
        <img src="${event.image}" alt="${event.title}" loading="lazy">
      </div>
      <div class="item-info">
        <span class="item-tag">${event.category.toUpperCase()}</span>
        <h3>${event.title}</h3>
        <p><strong><i class="far fa-calendar-alt"></i> ${event.date}</strong></p>
        <p>${event.description}</p>
        <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
      </div>
    </div>
  `).join('');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('active');
    });
  });
  container.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function renderGallery(data) {
  const container = document.getElementById('galleryGrid');
  if (!container) return;

  container.innerHTML = data.map((item, index) => `
    <div class="gallery-item reveal" onclick="openLightbox(${index}, ${JSON.stringify(data).replace(/"/g, '&quot;')})">
      <img src="${item.image}" alt="${item.title}" loading="lazy">
      <div class="gallery-overlay">
        <p>${item.title}</p>
      </div>
    </div>
  `).join('');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('active');
    });
  });
  container.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// --- Lightbox Functions ---

let currentGallery = [];
let currentIndex = 0;

window.openLightbox = function(index, data) {
  currentGallery = data;
  currentIndex = index;
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  
  lightboxImg.src = currentGallery[currentIndex].image;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeLightbox = function() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('active');
  document.body.style.overflow = 'auto';
};

window.changeLightbox = function(step) {
  currentIndex += step;
  if (currentIndex < 0) currentIndex = currentGallery.length - 1;
  if (currentIndex >= currentGallery.length) currentIndex = 0;
  
  const lightboxImg = document.getElementById('lightboxImg');
  lightboxImg.src = currentGallery[currentIndex].image;
};

// Close lightbox on click outside image
document.getElementById('lightbox')?.addEventListener('click', (e) => {
  if (e.target.id === 'lightbox') closeLightbox();
});

// --- Form Validation ---

function validateForm() {
  let isValid = true;
  const fields = ['name', 'email', 'phone', 'subject', 'message'];
  
  fields.forEach(field => {
    const input = document.getElementById(field);
    const error = document.getElementById(`${field}Error`);
    if (!input.value.trim()) {
      error.style.display = 'block';
      isValid = false;
    } else {
      error.style.display = 'none';
      
      if (field === 'email' && !validateEmail(input.value)) {
        error.textContent = 'Please enter a valid email address';
        error.style.display = 'block';
        isValid = false;
      }
    }
  });
  
  return isValid;
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
