/**
 * Shared Navigation + Footer — Elvis Multimedia
 * Injected on every page. Highlights active nav link by matching href.
 */

import { SITE_CONFIG } from '../data/siteConfig.js';

const { social, contact } = SITE_CONFIG;

const PAGES = [
  { href: 'about.html',     label: 'About' },
  { href: 'services.html',  label: 'Services' },
  { href: 'portfolio.html', label: 'Portfolio' },
  { href: 'showreel.html',  label: 'Showreel' },
  { href: 'contact.html',   label: 'Contact' }
];

function currentPage() {
  const path = location.pathname;
  const file = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
  return file;
}

function navLink(href, label) {
  const active = currentPage() === href ? 'class="active"' : '';
  return `<li><a href="${href}" ${active}>${label}</a></li>`;
}

export function renderNav() {
  const html = `
  <header class="site-nav" id="site-nav">
    <div class="nav-inner">
      <a href="index.html" class="nav-logo" aria-label="Elvis Multimedia Home">
        <img src="./public/assets/elvis_logo_badge.jpg" alt="Elvis Multimedia — Powered by Godnel's Studio" />
      </a>
      <nav aria-label="Main navigation">
        <ul class="nav-links">
          ${PAGES.map(p => navLink(p.href, p.label)).join('')}
        </ul>
      </nav>
      <a href="#start-project" class="nav-cta js-open-enquiry">Start a Project</a>
      <button class="nav-burger" id="nav-burger" aria-label="Open menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>

  <!-- Mobile Drawer -->
  <div class="mobile-drawer" id="mobile-drawer" aria-hidden="true">
    <button class="drawer-close" id="drawer-close" aria-label="Close menu">&#215;</button>
    <nav>
      <ul class="drawer-links">
        ${PAGES.map(p => `<li><a href="${p.href}">${p.label}</a></li>`).join('')}
        <li class="drawer-cta-item"><a href="#start-project" class="btn-drawer-cta js-open-enquiry">Start a Project</a></li>
      </ul>
    </nav>
    <div class="drawer-foot">
      <a href="${social.instagram}" target="_blank" rel="noopener" aria-label="Instagram">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
      </a>
      <a href="${social.youtube}" target="_blank" rel="noopener" aria-label="YouTube">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2 29 29 0 0 0-.46 5.25 29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.95-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.47-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
      </a>
    </div>
  </div>
  <div class="drawer-overlay" id="drawer-overlay"></div>
  `;

  const target = document.getElementById('nav-root');
  if (target) target.innerHTML = html;

  // Scroll effect
  const nav = document.getElementById('site-nav');
  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  // Burger
  const burger = document.getElementById('nav-burger');
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('drawer-overlay');
  const closeBtn = document.getElementById('drawer-close');

  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  burger?.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  overlay?.addEventListener('click', closeDrawer);
  drawer?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));
}

export function renderFooter() {
  const year = new Date().getFullYear();
  const html = `
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <a href="index.html" class="footer-logo-link" aria-label="Elvis Multimedia Home">
          <img src="./public/assets/elvis_logo_badge.jpg" alt="Elvis Multimedia Logo" class="footer-logo" />
        </a>
        <p class="footer-tagline">Creating memories worth keeping.</p>
        <p class="footer-location">Mumbai, India</p>
      </div>

      <div class="footer-links-col">
        <h4>Navigate</h4>
        <ul>
          ${PAGES.map(p => `<li><a href="${p.href}">${p.label}</a></li>`).join('')}
        </ul>
      </div>

      <div class="footer-links-col">
        <h4>Contact</h4>
        <ul>
          <li><a href="tel:${contact.phoneHref}">${contact.phone}</a></li>
          <li><a href="${social.instagram}" target="_blank" rel="noopener">Instagram</a></li>
          <li><a href="${social.youtube}" target="_blank" rel="noopener">YouTube</a></li>
          <li><a href="${social.linkedin}" target="_blank" rel="noopener">LinkedIn</a></li>
        </ul>
      </div>

      <div class="footer-cta-col">
        <p>Have a project in mind?</p>
        <button class="btn-footer-cta js-open-enquiry">Start a Project →</button>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; ${year} Elvis Multimedia. Powered by Godnel's Studio.</p>
    </div>
  </footer>
  `;

  const target = document.getElementById('footer-root');
  if (target) target.innerHTML = html;
}
