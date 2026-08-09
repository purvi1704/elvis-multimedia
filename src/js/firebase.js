/**
 * Firebase — Elvis Multimedia
 * Handles Firestore enquiry submission with graceful offline fallback.
 *
 * ⚠️  BEFORE GOING LIVE:
 * Replace the firebaseConfig values in src/data/siteConfig.js
 * with your real Firebase project credentials.
 * See: https://console.firebase.google.com → Project Settings → Your apps
 */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getFirestore, collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';
import { SITE_CONFIG } from '../data/siteConfig.js';

let db = null;
let firebaseReady = false;
const cfg = SITE_CONFIG.firebase;
const isDemoConfig = !cfg.apiKey || cfg.apiKey.startsWith('REPLACE_');

if (!isDemoConfig) {
  try {
    const app = initializeApp(cfg);
    db = getFirestore(app);
    firebaseReady = true;
  } catch (err) {
    console.warn('[Elvis] Firebase init failed — running in offline mode.', err.message);
  }
} else {
  console.info('[Elvis] Firebase config is placeholder. Enquiries saved locally until configured.');
}

/**
 * Submit a project enquiry to Firestore (or localStorage fallback).
 * @param {Object} data - Form fields
 * @returns {Promise<{success: boolean, id: string, mode: 'firestore'|'local'}>}
 */
export async function submitEnquiry(data) {
  const payload = {
    ...data,
    createdAt: new Date().toISOString(),
    status: 'new',
    source: 'Website — Start a Project'
  };

  if (firebaseReady && db) {
    try {
      const ref = await addDoc(collection(db, 'enquiries'), {
        ...payload,
        timestamp: serverTimestamp()
      });
      return { success: true, id: ref.id, mode: 'firestore' };
    } catch (err) {
      console.error('[Elvis] Firestore write failed:', err.message);
      return saveLocally(payload);
    }
  }
  return saveLocally(payload);
}

function saveLocally(payload) {
  try {
    const stored = JSON.parse(localStorage.getItem('elvis_enquiries') || '[]');
    const id = 'ENQ_' + Date.now();
    stored.push({ id, ...payload });
    localStorage.setItem('elvis_enquiries', JSON.stringify(stored));
    return new Promise(r => setTimeout(() => r({ success: true, id, mode: 'local' }), 500));
  } catch {
    return Promise.resolve({ success: true, id: 'ENQ_ERR', mode: 'local' });
  }
}
