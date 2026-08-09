/**
 * Animations — Elvis Multimedia
 * Page transitions, scroll reveals, image scaling.
 * Cinematic, subtle, no gimmicks.
 */

// ── Page entrance (runs on every page) ───────────────────────────────────────
export function initPageEntrance() {
  document.body.classList.add('page-entering');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.classList.remove('page-entering');
      document.body.classList.add('page-entered');
    });
  });
}

// ── Cinematic page-exit before navigation ─────────────────────────────────────
export function initPageExitLinks() {
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    // Only intercept same-origin .html links
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('tel') || href.startsWith('mailto')) return;
    if (!href.endsWith('.html') && href !== '/') return;

    link.addEventListener('click', e => {
      e.preventDefault();
      document.body.classList.add('page-exiting');
      setTimeout(() => { window.location.href = href; }, 400);
    });
  });
}

// ── Scroll reveal with IntersectionObserver ───────────────────────────────────
export function initScrollReveals() {
  if (!('IntersectionObserver' in window)) return;

  const els = document.querySelectorAll('[data-reveal]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, Number(delay));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  els.forEach(el => observer.observe(el));
}

// ── Hero Ken Burns (gentle scale) ─────────────────────────────────────────────
export function initHeroSlideshow(selector = '.hero-slide') {
  const slides = document.querySelectorAll(selector);
  if (slides.length <= 1) return;
  let current = 0;
  const next = () => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  };
  setInterval(next, 6000);
}
