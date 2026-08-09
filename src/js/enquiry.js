/**
 * Enquiry Form + WhatsApp Integration — Elvis Multimedia
 *
 * Flow:
 * 1. User fills form → client-side validation
 * 2. Save to Firestore (or localStorage fallback)
 * 3. Format professional WhatsApp message
 * 4. Open WhatsApp with pre-filled message
 */

import { submitEnquiry } from './firebase.js';
import { SITE_CONFIG } from '../data/siteConfig.js';

const WA_NUMBER = SITE_CONFIG.contact.phoneHref; // +919324619832

const SERVICES = [
  'Wedding Photography',
  'Pre-Wedding Photography',
  'Portraits',
  'Corporate Photography',
  'Event Photography',
  'Product Photography',
  'Commercial Photography',
  'Wedding Films',
  'Corporate Films',
  'Brand Films',
  'Advertisements',
  'Music Videos',
  'Event Films',
  'Promotional Content',
  'Multi-Camera Production',
  'Live Events',
  'Corporate Events',
  'Conferences',
  'Stage Productions',
  'Live Streaming',
  'Video Editing',
  'Colour Grading',
  'Motion Graphics',
  'Reels & Social Content',
  'Other / Not sure yet'
];

const BUDGETS = [
  'Flexible / To be discussed',
  'Under ₹50,000',
  '₹50,000 – ₹1,00,000',
  '₹1,00,000 – ₹2,50,000',
  '₹2,50,000 – ₹5,00,000',
  '₹5,00,000+'
];

export function renderEnquiryModal() {
  const existing = document.getElementById('enquiry-modal');
  if (existing) return;

  const modal = document.createElement('div');
  modal.id = 'enquiry-modal';
  modal.className = 'enquiry-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', 'Start a Project enquiry form');
  modal.innerHTML = `
    <div class="enquiry-panel">
      <button class="enquiry-close" id="enquiry-close" aria-label="Close">&#215;</button>
      <div class="enquiry-header">
        <p class="enquiry-label">Elvis Multimedia</p>
        <h2>Start a Project <span>→</span></h2>
        <p class="enquiry-sub">Tell us about your project. We'll follow up within 24 hours.</p>
      </div>

      <div id="enquiry-alert" class="enquiry-alert" style="display:none;"></div>

      <form id="enquiry-form" novalidate>
        <div class="form-row">
          <div class="form-group">
            <label for="eq-name">Full Name *</label>
            <input type="text" id="eq-name" name="name" autocomplete="name" placeholder="Your name" required />
          </div>
          <div class="form-group">
            <label for="eq-email">Email *</label>
            <input type="email" id="eq-email" name="email" autocomplete="email" placeholder="your@email.com" required />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="eq-phone">Phone / WhatsApp *</label>
            <input type="tel" id="eq-phone" name="phone" autocomplete="tel" placeholder="+91 98765 43210" required />
          </div>
          <div class="form-group">
            <label for="eq-service">Service Required *</label>
            <select id="eq-service" name="service" required>
              <option value="" disabled selected>Select a service</option>
              ${SERVICES.map(s => `<option value="${s}">${s}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="eq-date">Preferred Date</label>
            <input type="date" id="eq-date" name="preferredDate" />
          </div>
          <div class="form-group">
            <label for="eq-budget">Budget Range <span class="optional">(optional)</span></label>
            <select id="eq-budget" name="budget">
              <option value="" selected>Flexible / To be discussed</option>
              ${BUDGETS.map(b => `<option value="${b}">${b}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="form-group full">
          <label for="eq-details">Project Details *</label>
          <textarea id="eq-details" name="details" rows="4" placeholder="Tell us about your event, vision, location, and anything else that would help us prepare..." required></textarea>
        </div>
        <button type="submit" class="enquiry-submit" id="enquiry-submit">
          <span id="enquiry-btn-text">Send Enquiry via WhatsApp →</span>
        </button>
      </form>
    </div>
  `;

  document.body.appendChild(modal);

  // Close handlers
  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };
  document.getElementById('enquiry-close').addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // Form submission
  const form = document.getElementById('enquiry-form');
  form.addEventListener('submit', handleSubmit);
}

async function handleSubmit(e) {
  e.preventDefault();

  const btn = document.getElementById('enquiry-submit');
  const btnText = document.getElementById('enquiry-btn-text');
  const alert = document.getElementById('enquiry-alert');

  const data = {
    name:          document.getElementById('eq-name').value.trim(),
    email:         document.getElementById('eq-email').value.trim(),
    phone:         document.getElementById('eq-phone').value.trim(),
    service:       document.getElementById('eq-service').value,
    preferredDate: document.getElementById('eq-date').value,
    budget:        document.getElementById('eq-budget').value,
    details:       document.getElementById('eq-details').value.trim()
  };

  // Validate required fields
  if (!data.name || !data.email || !data.phone || !data.service || !data.details) {
    showAlert('error', 'Please fill in all required fields (name, email, phone, service, and project details).');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    showAlert('error', 'Please enter a valid email address.');
    return;
  }

  // Disable button
  btn.disabled = true;
  btnText.textContent = 'Saving enquiry…';
  alert.style.display = 'none';

  try {
    // 1. Save to Firestore / localStorage
    const result = await submitEnquiry(data);

    // 2. Build WhatsApp message
    const msg = buildWhatsAppMessage(data, result.id);

    // 3. Show success
    showAlert('success', `Thank you, ${data.name}. Your enquiry has been saved (Ref: ${result.id}). WhatsApp is opening to send your message.`);

    // 4. Open WhatsApp
    setTimeout(() => {
      const waURL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
      window.open(waURL, '_blank', 'noopener');
    }, 800);

    // Reset
    document.getElementById('enquiry-form').reset();
  } catch (err) {
    showAlert('error', 'Something went wrong. Please try again or contact us directly on WhatsApp.');
    console.error('[Elvis Enquiry]', err);
  } finally {
    btn.disabled = false;
    btnText.textContent = 'Send Enquiry via WhatsApp →';
  }
}

function buildWhatsAppMessage(data, refId) {
  const date = data.preferredDate
    ? new Date(data.preferredDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    : 'To be confirmed';

  return `Hello Elvis Multimedia,

I would like to enquire about a project.

*Name:* ${data.name}
*Service:* ${data.service}
*Preferred Date:* ${date}
*Project Details:* ${data.details}

*Contact:*
📧 ${data.email}
📱 ${data.phone}
${data.budget ? `*Budget:* ${data.budget}` : ''}

*Ref:* ${refId}

Please advise on availability and next steps. Thank you.`;
}

function showAlert(type, msg) {
  const el = document.getElementById('enquiry-alert');
  el.className = `enquiry-alert ${type}`;
  el.textContent = msg;
  el.style.display = 'block';
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Open modal from any trigger
export function initEnquiryTriggers() {
  document.addEventListener('click', e => {
    if (e.target.closest('.js-open-enquiry')) {
      e.preventDefault();
      const modal = document.getElementById('enquiry-modal');
      if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    }
  });
}
