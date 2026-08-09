/**
 * Elvis Multimedia — Central Site Configuration
 * Update contact, social, and brand details here.
 */

export const SITE_CONFIG = {
  brandName: 'ELVIS MULTIMEDIA',
  poweredBy: "Godnel's Studio",
  tagline: 'Creating memories worth keeping.',
  description: 'Photography, film and visual production for people, brands and businesses.',

  contact: {
    address: 'Shop No. 6, Kharodi, Marve Rd, Malad West, Mumbai, Maharashtra 400095',
    phone: '093246 19832',
    phoneHref: '+919324619832',
    whatsapp: 'https://wa.me/919324619832',
    city: 'Mumbai, India'
  },

  social: {
    instagram: 'https://www.instagram.com/elvismultimedia_/',
    youtube: 'https://www.youtube.com/@elvismultimedia/videos',
    linkedin: 'https://www.linkedin.com/company/elvis-multimedia' // Placeholder — update when page is live
  },

  /**
   * FIREBASE CONFIGURATION
   * ──────────────────────────────────────────────────────────────
   * IMPORTANT: Replace all placeholder values below with your
   * actual Firebase project credentials from:
   * https://console.firebase.google.com → Project Settings → Your apps
   *
   * DO NOT commit real credentials to a public repository.
   * For production, use environment variables or Firebase App Check.
   * ──────────────────────────────────────────────────────────────
   */
  firebase: {
    apiKey: "AIzaSyA9Onvm3pfx0gEKdAO-VaVJjNq8qslL5JY",
    authDomain: "elvis-multimedia.firebaseapp.com",
    projectId: "elvis-multimedia",
    storageBucket: "elvis-multimedia.firebasestorage.app",
    messagingSenderId: "1015547132696",
    appId: "1:1015547132696:web:5c049d2dcd1bb0f45dfc6d"
  }
};
