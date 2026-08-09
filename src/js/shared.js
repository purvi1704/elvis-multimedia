/**
 * Elvis Multimedia — Shared Bundle (no ES modules, works on file:// and Firebase Hosting)
 * Contains: nav, footer, enquiry modal, WhatsApp, Firestore, animations, portfolio data.
 * Exposed as window.EM object, called from each page.
 */
(function () {
  'use strict';

  // ── CONSTANTS ──────────────────────────────────────────────────────────────
  const LOGO     = 'public/assets/elvis_logo_badge.jpg';
  const WA_NUM   = '919324619832';
  const PHONE    = '093246 19832';
  const PHONE_H  = '+919324619832';
  const ADDRESS  = 'Shop No. 6, Kharodi, Marve Rd, Malad West,\nMumbai, Maharashtra 400095';

  // ── FIREBASE (real credentials) ────────────────────────────────────────────
  const FB_CONFIG = {
    apiKey:            'AIzaSyA9Onvm3pfx0gEKdAO-VaVJjNq8qslL5JY',
    authDomain:        'elvis-multimedia.firebaseapp.com',
    projectId:         'elvis-multimedia',
    storageBucket:     'elvis-multimedia.firebasestorage.app',
    messagingSenderId: '1015547132696',
    appId:             '1:1015547132696:web:5c049d2dcd1bb0f45dfc6d'
  };
  const INSTA    = 'https://www.instagram.com/elvismultimedia_/';
  const YT       = 'https://www.youtube.com/@elvismultimedia/videos';
  const LINKEDIN = 'https://www.linkedin.com/company/elvis-multimedia';

  const PAGES = [
    { href: 'about.html',     label: 'About' },
    { href: 'services.html',  label: 'Services' },
    { href: 'portfolio.html', label: 'Portfolio' },
    { href: 'showreel.html',  label: 'Showreel' },
    { href: 'contact.html',   label: 'Contact' }
  ];

  const SERVICES_LIST = [
    'Wedding Photography','Pre-Wedding Photography','Portraits',
    'Corporate Photography','Event Photography','Product Photography',
    'Commercial Photography','Wedding Films','Corporate Films','Brand Films',
    'Advertisements','Music Videos','Event Films','Promotional Content',
    'Multi-Camera Production','Live Events','Corporate Events','Conferences',
    'Stage Productions','Live Streaming','Video Editing','Colour Grading',
    'Motion Graphics','Reels & Social Content','Other / Not sure yet'
  ];

  const BUDGETS = [
    'Flexible / To be discussed','Under ₹50,000',
    '₹50,000 – ₹1,00,000','₹1,00,000 – ₹2,50,000',
    '₹2,50,000 – ₹5,00,000','₹5,00,000+'
  ];

  // ── PORTFOLIO DATA ─────────────────────────────────────────────────────────
  const A = 'public/assets/refs/';
  const B = 'public/assets/';
  const CATEGORIES = [
    {id:'all',label:'All'},{id:'weddings',label:'Weddings'},
    {id:'people',label:'People'},{id:'events',label:'Events'},
    {id:'corporate',label:'Corporate'},{id:'brands',label:'Brands'},
    {id:'film',label:'Film'}
  ];
  const PORTFOLIO = [
    {id:'p1',title:"The Bride's Solitude",category:'weddings',categoryLabel:'Wedding Photography',
     mediaType:'image',src:B+'587306007_18098091982889785_4183619969143453930_n.jpg',
     location:'Mumbai',year:'2025',featured:true,
     description:"A dramatic interplay of natural window backlight and interior shadow. The bride's silhouette reaches for her gown — a timeless frame."},
    {id:'p2',title:'Details of Intimacy',category:'weddings',categoryLabel:'Wedding Photography',
     mediaType:'image',src:B+'587266488_18098091991889785_8715925391744596365_n.jpg',
     location:'Mumbai',year:'2025',featured:true,
     description:'Beaded lace, a crystal crown, a bangled wrist. Macro optical capture of quiet intimacy before the celebration begins.'},
    {id:'p3',title:'Architecture & Light',category:'weddings',categoryLabel:'Wedding Details',
     mediaType:'image',src:B+'587291741_18098091970889785_4928293984148159496_n.jpg',
     location:'Private Estate, Mumbai',year:'2025',featured:true,
     description:'A bridal gown suspended under a cascade of chandelier light on a grand staircase. Architecture in dialogue with fashion.'},
    {id:'p4',title:'Portrait in Gold',category:'people',categoryLabel:'Portrait',
     mediaType:'image',src:B+'474475697_18484168840033140_3309807940444514748_n.jpg',
     location:'Mumbai',year:'2025',featured:true,
     description:'Warm key-light portraiture with embellished ivory couture. Soft directional modifiers and genuine elegance.'},
    {id:'p5',title:'Golden Hour Vows',category:'weddings',categoryLabel:'Wedding Photography',
     mediaType:'image',src:B+'710868667_18593570341054127_1199420393040945820_n.jpg',
     location:'Coastal Goa',year:'2026',featured:true,
     description:'A coastal ceremony at golden hour — palm trees, a trailing veil, warm backlit sun. The most honest of frames.'},
    {id:'p6',title:'Coastal Intimacy',category:'people',categoryLabel:'Pre-Wedding',
     mediaType:'image',src:B+'713043629_18593570314054127_582078363109332409_n.jpg',
     location:'Coastal Goa',year:'2026',featured:true,
     description:'Pre-wedding editorial under open blue sky. Natural light, genuine connection, no artifice.'},
    {id:'p7',title:'Bridal Silhouette Study',category:'weddings',categoryLabel:'Wedding Photography',
     mediaType:'image',src:B+'elvis_photo_1.jpg',
     location:'South Mumbai',year:'2025',featured:false,
     description:'A silhouette study in natural ambient light. Deep contrast, high emotional resonance.'},
    {id:'p8',title:'Gown & Chandelier',category:'weddings',categoryLabel:'Wedding Details',
     mediaType:'image',src:B+'elvis_photo_4.jpg',
     location:'Private Estate, Alibaug',year:'2025',featured:false,
     description:'Grand interior architecture with warm orb lighting — staircase curves and reflective steel.'},
    {id:'p9',title:'Wedding Film',category:'film',categoryLabel:'Wedding Films',
     mediaType:'video',src:A+'elvis_video_1.mp4',
     poster:B+'587306007_18098091982889785_4183619969143453930_n.jpg',
     location:'Mumbai',year:'2026',featured:true,
     description:'A feature cinematic wedding edit — warmth, vows, and light. Colour graded in-house.'},
    {id:'p10',title:'Coastal Wedding Film',category:'film',categoryLabel:'Wedding Films',
     mediaType:'video',src:A+'elvis_video_2.mp4',
     poster:B+'710868667_18593570341054127_1199420393040945820_n.jpg',
     location:'Coastal India',year:'2026',featured:true,
     description:'A narrative story reel capturing mood and motion of a coastal wedding day.'}
  ];

  // ── NAV ────────────────────────────────────────────────────────────────────
  function renderNav(currentPage) {
    currentPage = currentPage || (location.pathname.split('/').pop() || 'index.html');
    var links = PAGES.map(function(p){
      var active = currentPage === p.href ? 'class="active"' : '';
      return '<li><a href="'+p.href+'" '+active+'>'+p.label+'</a></li>';
    }).join('');
    var drawerLinks = PAGES.map(function(p){
      return '<li><a href="'+p.href+'">'+p.label+'</a></li>';
    }).join('');

    var html = [
      '<header class="site-nav" id="site-nav">',
        '<div class="nav-inner">',
          '<a href="index.html" class="nav-logo" aria-label="Elvis Multimedia Home">',
            '<img src="'+LOGO+'" alt="Elvis Multimedia — Powered by Godnel\'s Studio" />',
          '</a>',
          '<nav aria-label="Main navigation"><ul class="nav-links">'+links+'</ul></nav>',
          '<button class="nav-cta js-open-enquiry">Start a Project</button>',
          '<button class="nav-burger" id="nav-burger" aria-label="Open menu" aria-expanded="false">',
            '<span></span><span></span><span></span>',
          '</button>',
        '</div>',
      '</header>',
      '<div class="mobile-drawer" id="mobile-drawer" aria-hidden="true">',
        '<button class="drawer-close" id="drawer-close" aria-label="Close menu">&#215;</button>',
        '<nav><ul class="drawer-links">'+drawerLinks+
          '<li class="drawer-cta-item"><button class="btn-drawer-cta js-open-enquiry">Start a Project</button></li>',
        '</ul></nav>',
        '<div class="drawer-foot">',
          '<a href="'+INSTA+'" target="_blank" rel="noopener" aria-label="Instagram">',
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke-width="2"/></svg>',
          '</a>',
          '<a href="'+YT+'" target="_blank" rel="noopener" aria-label="YouTube">',
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.95-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.47-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none"/></svg>',
          '</a>',
        '</div>',
      '</div>',
      '<div class="drawer-overlay" id="drawer-overlay"></div>'
    ].join('');

    var root = document.getElementById('nav-root');
    if (root) root.innerHTML = html;

    // scroll
    var nav = document.getElementById('site-nav');
    window.addEventListener('scroll', function(){
      if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
    }, {passive:true});

    // burger
    var burger  = document.getElementById('nav-burger');
    var drawer  = document.getElementById('mobile-drawer');
    var overlay = document.getElementById('drawer-overlay');
    var closeBtn= document.getElementById('drawer-close');

    function openDrawer(){
      drawer.classList.add('open'); overlay.classList.add('open');
      burger.setAttribute('aria-expanded','true'); document.body.style.overflow='hidden';
    }
    function closeDrawer(){
      drawer.classList.remove('open'); overlay.classList.remove('open');
      burger.setAttribute('aria-expanded','false'); document.body.style.overflow='';
    }
    if(burger)  burger.addEventListener('click', openDrawer);
    if(closeBtn)closeBtn.addEventListener('click', closeDrawer);
    if(overlay) overlay.addEventListener('click', closeDrawer);
    if(drawer)  drawer.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closeDrawer); });
  }

  // ── FOOTER ─────────────────────────────────────────────────────────────────
  function renderFooter() {
    var year = new Date().getFullYear();
    var html = [
      '<footer class="site-footer">',
        '<div class="footer-inner">',
          '<div class="footer-brand">',
            '<a href="index.html"><img src="'+LOGO+'" alt="Elvis Multimedia Logo" class="footer-logo"/></a>',
            '<p class="footer-tagline">Creating memories worth keeping.</p>',
            '<p class="footer-location">Mumbai, India</p>',
          '</div>',
          '<div class="footer-links-col"><h4>Navigate</h4><ul>',
            PAGES.map(function(p){return '<li><a href="'+p.href+'">'+p.label+'</a></li>';}).join(''),
          '</ul></div>',
          '<div class="footer-links-col"><h4>Contact</h4><ul>',
            '<li><a href="tel:'+PHONE_H+'">'+PHONE+'</a></li>',
            '<li><a href="'+INSTA+'" target="_blank" rel="noopener">Instagram</a></li>',
            '<li><a href="'+YT+'" target="_blank" rel="noopener">YouTube</a></li>',
            '<li><a href="'+LINKEDIN+'" target="_blank" rel="noopener">LinkedIn</a></li>',
          '</ul></div>',
          '<div class="footer-cta-col">',
            '<p>Have a project in mind?</p>',
            '<button class="btn-footer-cta js-open-enquiry">Start a Project →</button>',
          '</div>',
        '</div>',
        '<div class="footer-bottom"><p>&copy; '+year+' Elvis Multimedia. Powered by Godnel\'s Studio.</p></div>',
      '</footer>'
    ].join('');
    var root = document.getElementById('footer-root');
    if (root) root.innerHTML = html;
  }

  // ── ENQUIRY MODAL ──────────────────────────────────────────────────────────
  function renderEnquiryModal() {
    var existing = document.getElementById('enquiry-modal');
    if (existing) return;
    var modal = document.createElement('div');
    modal.id = 'enquiry-modal';
    modal.className = 'enquiry-modal';
    modal.setAttribute('role','dialog');
    modal.setAttribute('aria-modal','true');
    modal.innerHTML = [
      '<div class="enquiry-panel">',
        '<button class="enquiry-close" id="enquiry-close" aria-label="Close">&#215;</button>',
        '<div class="enquiry-header">',
          '<p class="enquiry-label">Elvis Multimedia</p>',
          '<h2>Start a Project <span>→</span></h2>',
          '<p class="enquiry-sub">Tell us about your project. We\'ll follow up within 24 hours.</p>',
        '</div>',
        '<div id="enquiry-alert" class="enquiry-alert" style="display:none;"></div>',
        '<form id="enquiry-form" novalidate>',
          '<div class="form-row">',
            '<div class="form-group"><label for="eq-name">Full Name *</label><input type="text" id="eq-name" placeholder="Your name" required/></div>',
            '<div class="form-group"><label for="eq-email">Email *</label><input type="email" id="eq-email" placeholder="your@email.com" required/></div>',
          '</div>',
          '<div class="form-row">',
            '<div class="form-group"><label for="eq-phone">Phone / WhatsApp *</label><input type="tel" id="eq-phone" placeholder="+91 98765 43210" required/></div>',
            '<div class="form-group"><label for="eq-service">Service Required *</label>',
              '<select id="eq-service" required>',
                '<option value="" disabled selected>Select a service</option>',
                SERVICES_LIST.map(function(s){return '<option value="'+s+'">'+s+'</option>';}).join(''),
              '</select>',
            '</div>',
          '</div>',
          '<div class="form-row">',
            '<div class="form-group"><label for="eq-date">Preferred Date</label><input type="date" id="eq-date"/></div>',
            '<div class="form-group"><label for="eq-budget">Budget Range <span class="optional">(optional)</span></label>',
              '<select id="eq-budget">',
                BUDGETS.map(function(b){return '<option value="'+b+'">'+b+'</option>';}).join(''),
              '</select>',
            '</div>',
          '</div>',
          '<div class="form-group full"><label for="eq-details">Project Details *</label>',
            '<textarea id="eq-details" rows="4" placeholder="Tell us about your event, vision, location..." required></textarea>',
          '</div>',
          '<button type="submit" class="enquiry-submit" id="enquiry-submit">',
            '<span id="enquiry-btn-text">Send Enquiry via WhatsApp →</span>',
          '</button>',
        '</form>',
      '</div>'
    ].join('');
    document.body.appendChild(modal);

    function closeModal(){
      modal.classList.remove('open');
      document.body.style.overflow='';
    }
    document.getElementById('enquiry-close').addEventListener('click', closeModal);
    modal.addEventListener('click', function(e){ if(e.target===modal) closeModal(); });
    document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeModal(); });

    document.getElementById('enquiry-form').addEventListener('submit', handleSubmit);
  }

  function handleSubmit(e) {
    e.preventDefault();
    var btn     = document.getElementById('enquiry-submit');
    var btnText = document.getElementById('enquiry-btn-text');
    var data = {
      name:    document.getElementById('eq-name').value.trim(),
      email:   document.getElementById('eq-email').value.trim(),
      phone:   document.getElementById('eq-phone').value.trim(),
      service: document.getElementById('eq-service').value,
      date:    document.getElementById('eq-date').value,
      budget:  document.getElementById('eq-budget').value,
      details: document.getElementById('eq-details').value.trim(),
      createdAt: new Date().toISOString(),
      status: 'new',
      source: 'Website — Start a Project'
    };
    if (!data.name||!data.email||!data.phone||!data.service||!data.details) {
      showAlert('error','Please fill in all required fields (name, email, phone, service, and project details).'); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      showAlert('error','Please enter a valid email address.'); return;
    }
    btn.disabled = true;
    btnText.textContent = 'Saving enquiry…';

    var ref = 'ENQ_' + Date.now();

    // Build WhatsApp message (done before async so always available)
    var dateStr = data.date
      ? new Date(data.date).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})
      : 'To be confirmed';
    var waMsg = 'Hello Elvis Multimedia,\n\nI would like to enquire about a project.\n\n'
      +'*Name:* '+data.name+'\n'
      +'*Service:* '+data.service+'\n'
      +'*Preferred Date:* '+dateStr+'\n'
      +'*Project Details:* '+data.details+'\n\n'
      +'*Contact:*\n\u{1F4E7} '+data.email+'\n\u{1F4F1} '+data.phone+'\n'
      +(data.budget?'*Budget:* '+data.budget+'\n':'')
      +'\n*Ref:* '+ref+'\n\nPlease advise on availability and next steps. Thank you.';

    function finish(savedRef) {
      showAlert('success','Thank you, '+data.name+'. Enquiry saved (Ref: '+savedRef+'). Opening WhatsApp now…');
      btn.disabled = false;
      btnText.textContent = 'Send Enquiry via WhatsApp →';
      setTimeout(function(){
        window.open('https://wa.me/'+WA_NUM+'?text='+encodeURIComponent(waMsg),'_blank','noopener');
        document.getElementById('enquiry-form').reset();
      }, 900);
    }

    function saveLocal() {
      try {
        var stored = JSON.parse(localStorage.getItem('elvis_enquiries')||'[]');
        stored.push(Object.assign({id:ref}, data));
        localStorage.setItem('elvis_enquiries', JSON.stringify(stored));
      } catch(ex){}
      finish(ref);
    }

    // Try Firestore first
    try {
      if (window.firebase && window.firebase.firestore) {
        var db = window.firebase.firestore();
        db.collection('enquiries').add(Object.assign({id:ref}, data))
          .then(function(docRef){ finish(docRef.id); })
          .catch(function(err){ console.warn('[Elvis] Firestore write failed, using local:', err.message); saveLocal(); });
      } else {
        saveLocal();
      }
    } catch(err) {
      saveLocal();
    }
  }

  function showAlert(type, msg) {
    var el = document.getElementById('enquiry-alert');
    el.className = 'enquiry-alert '+type;
    el.textContent = msg;
    el.style.display = 'block';
    el.scrollIntoView({behavior:'smooth',block:'nearest'});
  }

  // ── ANIMATIONS ─────────────────────────────────────────────────────────────
  function initAnimations() {
    // Page entrance
    document.body.classList.add('page-entering');
    requestAnimationFrame(function(){
      requestAnimationFrame(function(){
        document.body.classList.remove('page-entering');
        document.body.classList.add('page-entered');
      });
    });

    // Scroll reveals
    if ('IntersectionObserver' in window) {
      var els = document.querySelectorAll('[data-reveal]');
      var obs = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if (entry.isIntersecting) {
            var delay = Number(entry.target.dataset.delay||0);
            setTimeout(function(){ entry.target.classList.add('revealed'); }, delay);
            obs.unobserve(entry.target);
          }
        });
      }, {threshold:0.1, rootMargin:'0px 0px -50px 0px'});
      els.forEach(function(el){ obs.observe(el); });
    } else {
      document.querySelectorAll('[data-reveal]').forEach(function(el){ el.classList.add('revealed'); });
    }

    // Hero slideshow
    var slides = document.querySelectorAll('.hero-slide');
    if (slides.length > 1) {
      var cur = 0;
      setInterval(function(){
        slides[cur].classList.remove('active');
        cur = (cur+1)%slides.length;
        slides[cur].classList.add('active');
      }, 6000);
    }

    // Page exit transitions
    document.addEventListener('click', function(e){
      var link = e.target.closest('a[href]');
      if (!link) return;
      var href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('tel') || href.startsWith('mailto')) return;
      if (!href.endsWith('.html')) return;
      e.preventDefault();
      document.body.classList.add('page-exiting');
      setTimeout(function(){ window.location.href = href; }, 380);
    });
  }

  // ── ENQUIRY TRIGGERS ───────────────────────────────────────────────────────
  function initEnquiryTriggers() {
    document.addEventListener('click', function(e){
      if (e.target.closest('.js-open-enquiry')) {
        e.preventDefault();
        var modal = document.getElementById('enquiry-modal');
        if (modal) { modal.classList.add('open'); document.body.style.overflow='hidden'; }
      }
    });
  }

  // ── PORTFOLIO (used on portfolio.html) ────────────────────────────────────
  function initPortfolio() {
    var filtersEl = document.getElementById('portfolio-filters');
    var gridEl    = document.getElementById('portfolio-grid');
    var lightbox  = document.getElementById('lightbox');
    var lbMedia   = document.getElementById('lightbox-media');
    if (!filtersEl || !gridEl) return;

    var active = 'all';

    filtersEl.innerHTML = CATEGORIES.map(function(c){
      return '<button class="filter-btn'+(c.id==='all'?' active':'')+'" data-cat="'+c.id+'">'+c.label+'</button>';
    }).join('');

    filtersEl.addEventListener('click', function(e){
      var btn = e.target.closest('.filter-btn');
      if (!btn) return;
      active = btn.dataset.cat;
      filtersEl.querySelectorAll('.filter-btn').forEach(function(b){ b.classList.toggle('active', b===btn); });
      renderGrid();
    });

    function renderGrid(){
      var items = active==='all' ? PORTFOLIO : PORTFOLIO.filter(function(p){return p.category===active;});
      gridEl.innerHTML = items.map(function(item){
        return [
          '<div class="portfolio-card" data-id="'+item.id+'" tabindex="0" role="button" aria-label="View '+item.title+'">',
            '<div class="portfolio-badge">'+item.categoryLabel+'</div>',
            item.mediaType==='video'
              ? '<video src="'+item.src+'"'+(item.poster?' poster="'+item.poster+'"':'')+' muted preload="none" style="width:100%;display:block;"></video><div class="portfolio-play-btn" aria-hidden="true">&#9654;</div>'
              : '<img src="'+item.src+'" alt="'+item.title+'" loading="lazy"/>',
            '<div class="portfolio-card-overlay"><h3>'+item.title+'</h3><span>'+item.location+' · '+item.year+'</span></div>',
          '</div>'
        ].join('');
      }).join('');

      gridEl.querySelectorAll('.portfolio-card').forEach(function(card, i){
        card.style.opacity='0'; card.style.transform='translateY(20px)';
        setTimeout(function(){
          card.style.transition='opacity 0.45s ease,transform 0.45s ease';
          card.style.opacity='1'; card.style.transform='none';
        }, i*55);
      });
    }
    renderGrid();

    function openLightbox(id){
      var item = PORTFOLIO.find(function(p){return p.id===id;});
      if(!item||!lightbox) return;
      var closeBtn = document.getElementById('lightbox-close');
      lbMedia.innerHTML='';
      if(closeBtn) lbMedia.appendChild(closeBtn);
      if(item.mediaType==='video'){
        var vid=document.createElement('video');
        vid.src=item.src; vid.controls=true; vid.autoplay=true; vid.muted=true;
        if(item.poster) vid.poster=item.poster;
        vid.style.cssText='width:100%;height:100%;object-fit:cover;display:block;';
        lbMedia.appendChild(vid);
      } else {
        var img=document.createElement('img');
        img.src=item.src; img.alt=item.title;
        img.style.cssText='width:100%;height:100%;object-fit:cover;display:block;';
        lbMedia.appendChild(img);
      }
      document.getElementById('lb-cat').textContent=item.categoryLabel;
      document.getElementById('lb-title').textContent=item.title;
      document.getElementById('lb-meta').textContent=item.location+' · '+item.year;
      document.getElementById('lb-desc').textContent=item.description;
      lightbox.classList.add('open');
      document.body.style.overflow='hidden';
    }
    function closeLightbox(){
      if(!lightbox) return;
      lightbox.classList.remove('open');
      document.body.style.overflow='';
      lbMedia.querySelectorAll('video').forEach(function(v){v.pause();v.src='';});
    }

    gridEl.addEventListener('click',function(e){
      var c=e.target.closest('.portfolio-card'); if(c) openLightbox(c.dataset.id);
    });
    gridEl.addEventListener('keydown',function(e){
      if(e.key==='Enter'){ var c=e.target.closest('.portfolio-card'); if(c) openLightbox(c.dataset.id); }
    });
    var lbClose=document.getElementById('lightbox-close');
    if(lbClose) lbClose.addEventListener('click', closeLightbox);
    if(lightbox) lightbox.addEventListener('click',function(e){if(e.target===lightbox) closeLightbox();});
    document.addEventListener('keydown',function(e){if(e.key==='Escape') closeLightbox();});
  }

  // ── SHOWREEL ───────────────────────────────────────────────────────────────
  function initShowreel() {
    var btn = document.getElementById('showreel-play-btn');
    var box = document.getElementById('main-showreel-box');
    if (!btn || !box) return;
    btn.addEventListener('click', function(){
      box.innerHTML = '<video autoplay controls style="width:100%;height:100%;object-fit:contain;background:var(--forest-dark);" aria-label="Elvis Multimedia — Showreel"><source src="public/assets/refs/elvis_video_1.mp4" type="video/mp4"/></video>';
    });
  }

  // ── FIREBASE INIT (compat SDK, loaded once) ────────────────────────────────
  function initFirebase() {
    if (window.firebase) {
      // SDK already loaded (e.g. from CDN in HTML head)
      try {
        if (!window.firebase.apps || !window.firebase.apps.length) {
          window.firebase.initializeApp(FB_CONFIG);
        }
      } catch(e){ console.warn('[Elvis] Firebase init:', e.message); }
      return;
    }
    // Dynamically load Firebase compat SDK
    var sdks = [
      'https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js',
      'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore-compat.js'
    ];
    var loaded = 0;
    sdks.forEach(function(src){
      var s = document.createElement('script');
      s.src = src;
      s.onload = function(){
        loaded++;
        if (loaded === sdks.length) {
          try { window.firebase.initializeApp(FB_CONFIG); } catch(e){ console.warn('[Elvis] Firebase init:', e.message); }
        }
      };
      document.head.appendChild(s);
    });
  }

  // ── PUBLIC API ─────────────────────────────────────────────────────────────
  window.EM = {
    renderNav: renderNav,
    renderFooter: renderFooter,
    renderEnquiryModal: renderEnquiryModal,
    initPortfolio: initPortfolio,
    initShowreel: initShowreel,
    PORTFOLIO: PORTFOLIO,
    CATEGORIES: CATEGORIES,
    initAll: function(){
      initFirebase();
      initAnimations();
      initEnquiryTriggers();
    }
  };
})();
