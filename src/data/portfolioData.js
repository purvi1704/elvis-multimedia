/**
 * Central Portfolio Dataset — Elvis Multimedia
 *
 * HOW TO UPDATE:
 * Place images in /public/assets/refs/ and update the src below.
 * mediaType: 'image' | 'video'
 * category:  'weddings' | 'people' | 'events' | 'corporate' | 'brands' | 'film'
 */

export const PORTFOLIO_CATEGORIES = [
  { id: 'all',       label: 'All' },
  { id: 'weddings',  label: 'Weddings' },
  { id: 'people',    label: 'People' },
  { id: 'events',    label: 'Events' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'brands',    label: 'Brands' },
  { id: 'film',      label: 'Film' }
];

// Asset base path — all HTML pages sit at project root, assets at ./public/assets/
const A = './public/assets/refs/';
const BASE = './public/assets/';

export const PORTFOLIO_ITEMS = [
  {
    id: 'p1',
    title: "The Bride's Solitude",
    category: 'weddings',
    categoryLabel: 'Wedding Photography',
    mediaType: 'image',
    src: A + '587306007_18098091982889785_4183619969143453930_n.jpg',
    location: 'Mumbai',
    year: '2025',
    description: "A dramatic interplay of natural window backlight and interior shadow. The bride's silhouette reaches for her gown — a timeless frame that speaks before words do.",
    featured: true,
    isRealAsset: true,
    tall: true
  },
  {
    id: 'p2',
    title: 'Details of Intimacy',
    category: 'weddings',
    categoryLabel: 'Wedding Photography',
    mediaType: 'image',
    src: A + '587266488_18098091991889785_8715925391744596365_n.jpg',
    location: 'Mumbai',
    year: '2025',
    description: 'Beaded lace, a crystal crown, a bangled wrist. Macro optical capture of the quiet intimacy before the celebration begins.',
    featured: true,
    isRealAsset: true,
    tall: true
  },
  {
    id: 'p3',
    title: 'Architecture & Light',
    category: 'weddings',
    categoryLabel: 'Wedding Details',
    mediaType: 'image',
    src: A + '587291741_18098091970889785_4928293984148159496_n.jpg',
    location: 'Private Estate, Mumbai',
    year: '2025',
    description: 'A bridal gown suspended under a cascade of chandelier light on a grand staircase. Architecture in dialogue with fashion.',
    featured: true,
    isRealAsset: true,
    tall: false
  },
  {
    id: 'p4',
    title: 'Portrait in Gold',
    category: 'people',
    categoryLabel: 'Portrait',
    mediaType: 'image',
    src: A + '474475697_18484168840033140_3309807940444514748_n.jpg',
    location: 'Mumbai',
    year: '2025',
    description: 'Warm key-light portraiture with embellished ivory couture. Soft directional modifiers, natural warmth, and genuine elegance.',
    featured: true,
    isRealAsset: true,
    tall: true
  },
  {
    id: 'p5',
    title: 'Golden Hour Vows',
    category: 'weddings',
    categoryLabel: 'Wedding Photography',
    mediaType: 'image',
    src: A + '710868667_18593570341054127_1199420393040945820_n.jpg',
    location: 'Coastal Goa',
    year: '2026',
    description: 'A coastal ceremony at golden hour — palm trees, a trailing veil, warm backlit sun. The most honest of frames.',
    featured: true,
    isRealAsset: true,
    tall: true
  },
  {
    id: 'p6',
    title: 'Coastal Intimacy',
    category: 'people',
    categoryLabel: 'Pre-Wedding',
    mediaType: 'image',
    src: A + '713043629_18593570314054127_582078363109332409_n.jpg',
    location: 'Coastal Goa',
    year: '2026',
    description: 'Pre-wedding editorial under open blue sky. Natural light, genuine connection, no artifice.',
    featured: true,
    isRealAsset: true,
    tall: false
  },
  {
    id: 'p7',
    title: 'Bridal Silhouette Study',
    category: 'weddings',
    categoryLabel: 'Wedding Photography',
    mediaType: 'image',
    src: BASE + 'elvis_photo_1.jpg',
    location: 'South Mumbai',
    year: '2025',
    description: 'A silhouette study in natural ambient light. Deep contrast, high emotional resonance.',
    featured: false,
    isRealAsset: true,
    tall: false
  },
  {
    id: 'p8',
    title: 'Gown & Chandelier',
    category: 'weddings',
    categoryLabel: 'Wedding Details',
    mediaType: 'image',
    src: BASE + 'elvis_photo_4.jpg',
    location: 'Private Estate, Alibaug',
    year: '2025',
    description: 'Grand interior architecture with warm orb lighting — staircase curves and reflective steel.',
    featured: false,
    isRealAsset: true,
    tall: true
  },
  {
    id: 'p9',
    title: 'Wedding Film',
    category: 'film',
    categoryLabel: 'Wedding Films',
    mediaType: 'video',
    src: A + 'elvis_video_1.mp4',
    poster: A + '587306007_18098091982889785_4183619969143453930_n.jpg',
    location: 'Mumbai',
    year: '2026',
    description: 'A feature cinematic wedding edit — warmth, vows, and light. Colour graded in-house.',
    featured: true,
    isRealAsset: true,
    tall: false
  },
  {
    id: 'p10',
    title: 'Coastal Wedding Film',
    category: 'film',
    categoryLabel: 'Wedding Films',
    mediaType: 'video',
    src: A + 'elvis_video_2.mp4',
    poster: A + '710868667_18593570341054127_1199420393040945820_n.jpg',
    location: 'Coastal India',
    year: '2026',
    description: 'A narrative story reel capturing the mood and motion of a coastal wedding day.',
    featured: true,
    isRealAsset: true,
    tall: false
  }
];
