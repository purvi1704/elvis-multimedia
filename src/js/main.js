/**
 * Main Application Logic for Elvis Multimedia
 */

import { PORTFOLIO_CATEGORIES, PORTFOLIO_ITEMS } from '../data/portfolioData.js';
import { SERVICES_DATA } from '../data/servicesData.js';
import { SITE_CONFIG } from '../data/siteConfig.js';
import { submitProjectEnquiry, submitAcademySubscriber } from './firebase.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroSlideshow();
  initServices();
  initPortfolio();
  initShowreel();
  initHeritage();
  initTraditionTech();
  initProcess();
  initTeam();
  initAcademy();
  initContactForm();
  initFooter();
});

/* ==========================================================================
   1. NAVBAR & NAVIGATION
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');

  // Scroll header effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile Drawer toggle
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      if (isOpen) {
        mobileDrawer.classList.remove('open');
        mobileToggle.innerHTML = '&#9776;'; // Hamburger
      } else {
        mobileDrawer.classList.add('open');
        mobileToggle.innerHTML = '&#215;'; // Close X
      }
    });

    // Close mobile menu on link click
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.innerHTML = '&#9776;';
      });
    });
  }
}

/* ==========================================================================
   2. HERO SLIDESHOW
   ========================================================================== */
function initHeroSlideshow() {
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length <= 1) return;

  let currentSlide = 0;
  setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 6000);
}

/* ==========================================================================
   3. SERVICES SECTION
   ========================================================================== */
function initServices() {
  const tabsContainer = document.getElementById('services-tabs');
  const contentContainer = document.getElementById('services-content');

  if (!tabsContainer || !contentContainer) return;

  // Render Tabs
  tabsContainer.innerHTML = SERVICES_DATA.map((service, index) => `
    <button class="service-tab-btn ${index === 0 ? 'active' : ''}" data-service-id="${service.id}">
      ${service.title}
    </button>
  `).join('');

  // Render Initial Active Service
  renderServiceContent(SERVICES_DATA[0].id);

  // Tab Click Handler
  tabsContainer.querySelectorAll('.service-tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      tabsContainer.querySelectorAll('.service-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const serviceId = btn.getAttribute('data-service-id');
      renderServiceContent(serviceId);
    });
  });
}

function renderServiceContent(serviceId) {
  const service = SERVICES_DATA.find(s => s.id === serviceId) || SERVICES_DATA[0];
  const container = document.getElementById('services-content');

  container.innerHTML = `
    <div class="service-content-grid">
      <div class="service-meta-card">
        <div class="service-icon-wrap">
          ${getServiceIcon(service.id)}
        </div>
        <h3>${service.title}</h3>
        <div class="service-subtitle-text">${service.subtitle}</div>
        <p>${service.description}</p>
      </div>

      <div class="service-items-grid">
        ${service.items.map(item => `
          <div class="service-item-card">
            <h4>${item.name}</h4>
            <p>${item.detail}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function getServiceIcon(id) {
  switch (id) {
    case 'photography':
      return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>`;
    case 'film':
      return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>`;
    case 'production':
      return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>`;
    default:
      return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>`;
  }
}

/* ==========================================================================
   4. PORTFOLIO & LIGHTBOX
   ========================================================================== */
let activeFilter = 'all';

function initPortfolio() {
  const filtersContainer = document.getElementById('portfolio-filters');
  const gridContainer = document.getElementById('portfolio-grid');

  if (!filtersContainer || !gridContainer) return;

  // Render Filters
  filtersContainer.innerHTML = PORTFOLIO_CATEGORIES.map(cat => `
    <button class="filter-btn ${cat.id === 'all' ? 'active' : ''}" data-filter="${cat.id}">
      ${cat.label}
    </button>
  `).join('');

  // Render Items
  renderPortfolioGrid(activeFilter);

  // Filter click event
  filtersContainer.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filtersContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-filter');
      renderPortfolioGrid(activeFilter);
    });
  });

  // Init Lightbox listener
  initLightbox();
}

function renderPortfolioGrid(filter) {
  const gridContainer = document.getElementById('portfolio-grid');
  const items = filter === 'all' 
    ? PORTFOLIO_ITEMS 
    : PORTFOLIO_ITEMS.filter(item => item.category === filter);

  if (items.length === 0) {
    gridContainer.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--color-cream-muted);">
        <p style="font-size: 1.2rem;">No items found in this category.</p>
      </div>
    `;
    return;
  }

  gridContainer.innerHTML = items.map(item => `
    <div class="portfolio-card" data-item-id="${item.id}">
      <div class="portfolio-img-wrap">
        <span class="portfolio-badge">${item.categoryLabel}</span>
        ${item.isRealAsset ? `<span class="real-asset-tag">Real Capture</span>` : ''}
        ${item.mediaType === 'video'
          ? `<video src="${item.src}" ${item.poster ? `poster="${item.poster}"` : ''} muted preload="none" style="width:100%;height:100%;object-fit:cover;"></video>
             <div class="portfolio-play-icon" aria-hidden="true">&#9658;</div>`
          : `<img src="${item.src}" alt="${item.title}" loading="lazy" />`
        }
      </div>
      <div class="portfolio-card-info">
        <h3 class="portfolio-card-title">${item.title}</h3>
        <div class="portfolio-card-meta">
          <span>${item.location}</span>
          <span>${item.year}</span>
        </div>
      </div>
    </div>
  `).join('');

  // Attach card click event for lightbox
  gridContainer.querySelectorAll('.portfolio-card').forEach(card => {
    card.addEventListener('click', () => {
      const itemId = card.getAttribute('data-item-id');
      openLightbox(itemId);
    });
  });
}

function initLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const closeBtn = document.getElementById('lightbox-close');

  if (!modal) return;

  closeBtn?.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
}

function openLightbox(itemId) {
  const modal = document.getElementById('lightbox-modal');
  const item = PORTFOLIO_ITEMS.find(p => p.id === itemId);
  if (!modal || !item) return;

  const mediaContainer = document.getElementById('lightbox-media-container');
  if (item.mediaType === 'video') {
    mediaContainer.innerHTML = `<video controls autoplay muted playsinline src="${item.src}" ${item.poster ? `poster="${item.poster}"` : ''} style="width:100%;height:100%;max-height:600px;object-fit:contain;background:#000;"></video>`;
  } else {
    mediaContainer.innerHTML = `<img id="lightbox-img" src="${item.src}" alt="${item.title}" style="width:100%;height:100%;max-height:600px;object-fit:contain;" />`;
  }

  document.getElementById('lightbox-category').textContent = item.categoryLabel;
  document.getElementById('lightbox-title').textContent = item.title;
  document.getElementById('lightbox-desc').textContent = item.description;
  document.getElementById('lightbox-location').textContent = item.location;
  document.getElementById('lightbox-client').textContent = item.client;
  document.getElementById('lightbox-year').textContent = item.year;

  modal.classList.add('active');
}

/* ==========================================================================
   5. SHOWREEL — Inline Video Player
   ========================================================================== */
function initShowreel() {
  const playBtn = document.getElementById('showreel-play-btn');
  const showreelBox = document.getElementById('showreel-box');

  if (!playBtn || !showreelBox) return;

  playBtn.addEventListener('click', () => {
    // Replace the poster image with an actual HTML5 video player
    showreelBox.innerHTML = `
      <video
        id="showreel-video"
        src="./assets/refs/elvismultimedia_'s Post.mp4"
        autoplay
        controls
        playsinline
        style="width:100%;height:100%;object-fit:cover;border-radius:var(--radius-md);"
      ></video>
    `;
    const vid = document.getElementById('showreel-video');
    if (vid) vid.play().catch(() => {});
  });
}

/* ==========================================================================
   6. HERITAGE STORY
   ========================================================================== */
function initHeritage() {
  const container = document.getElementById('heritage-paragraphs');
  if (!container) return;

  container.innerHTML = SITE_CONFIG.heritage.paragraphs.map(p => `
    <p>${p}</p>
  `).join('');
}

/* ==========================================================================
   7. TRADITION MEETS TECHNOLOGY
   ========================================================================== */
function initTraditionTech() {
  const container = document.getElementById('trad-tech-container');
  if (!container) return;

  const data = SITE_CONFIG.traditionTech;

  container.innerHTML = `
    <div class="trad-tech-card">
      <h3>Tradition & Craft</h3>
      ${data.traditionPoints.map(pt => `
        <div class="trad-tech-point">
          <h4>${pt.title}</h4>
          <p>${pt.desc}</p>
        </div>
      `).join('')}
    </div>

    <div class="trad-tech-card">
      <h3>Modern Technology</h3>
      ${data.techPoints.map(pt => `
        <div class="trad-tech-point">
          <h4>${pt.title}</h4>
          <p>${pt.desc}</p>
        </div>
      `).join('')}
    </div>
  `;
}

/* ==========================================================================
   8. PRODUCTION PROCESS
   ========================================================================== */
function initProcess() {
  const container = document.getElementById('process-grid-container');
  if (!container) return;

  container.innerHTML = SITE_CONFIG.productionProcess.map(proc => `
    <div class="process-card">
      <div class="process-num">${proc.step}</div>
      <h4>${proc.title}</h4>
      <p>${proc.desc}</p>
    </div>
  `).join('');
}

/* ==========================================================================
   9. TEAM & CAREERS
   ========================================================================== */
function initTeam() {
  const container = document.getElementById('team-grid-container');
  if (!container) return;

  container.innerHTML = SITE_CONFIG.teamMembers.map(member => `
    <div class="team-card">
      <div class="team-img-wrap">
        <img src="${member.image}" alt="${member.name}" loading="lazy" />
      </div>
      <div class="team-info">
        <h3 class="team-name">${member.name}</h3>
        <div class="team-role">${member.role}</div>
        <p class="team-bio">${member.bio}</p>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   10. GODNEL'S ACADEMY
   ========================================================================== */
function initAcademy() {
  const form = document.getElementById('academy-form');
  const alertBox = document.getElementById('academy-alert');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('academy-email').value;

    if (!email) return;

    const btn = form.querySelector('button');
    btn.disabled = true;
    btn.textContent = 'Submitting...';

    const result = await submitAcademySubscriber(email);

    btn.disabled = false;
    btn.textContent = 'Join Waitlist';

    if (result.success) {
      alertBox.style.display = 'block';
      alertBox.className = 'form-alert success';
      alertBox.textContent = 'Thank you for your interest in Godnel’s Academy. We will contact you when registration opens.';
      form.reset();
    }
  });
}

/* ==========================================================================
   11. CONTACT & ENQUIRY FORM (FIREBASE INTEGRATION)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('enquiry-form');
  const alertBox = document.getElementById('form-alert-msg');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById('enquiry-name').value.trim(),
      email: document.getElementById('enquiry-email').value.trim(),
      phone: document.getElementById('enquiry-phone').value.trim(),
      service: document.getElementById('enquiry-service').value,
      details: document.getElementById('enquiry-details').value.trim(),
      preferredDate: document.getElementById('enquiry-date').value,
      budget: document.getElementById('enquiry-budget').value
    };

    if (!formData.name || !formData.email || !formData.service || !formData.details) {
      alertBox.style.display = 'block';
      alertBox.className = 'form-alert error';
      alertBox.textContent = 'Please complete all required fields (Name, Email, Service, and Project Details).';
      return;
    }

    const submitBtn = document.getElementById('enquiry-submit-btn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Transmitting Enquiry...';

    try {
      const res = await submitProjectEnquiry(formData);
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Send Enquiry';

      if (res.success) {
        alertBox.style.display = 'block';
        alertBox.className = 'form-alert success';
        alertBox.innerHTML = `
          <strong>Enquiry Received Successfully!</strong><br/>
          Reference ID: <code>${res.id}</code>. Our production director in Mumbai will reach out within 24 hours.
        `;
        form.reset();
      } else {
        throw new Error("Submission issue");
      }
    } catch (err) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Send Enquiry';
      alertBox.style.display = 'block';
      alertBox.className = 'form-alert error';
      alertBox.textContent = 'Unable to send enquiry right now. Please email us directly at hello@elvismultimedia.com';
    }
  });
}

/* ==========================================================================
   12. FOOTER
   ========================================================================== */
function initFooter() {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
