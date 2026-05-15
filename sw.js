// sw.js — Pediatri App Service Worker
// Version: 2.0 | @dokrifqi

const CACHE_NAME = 'pediatri-app-v2';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/data/index.js',
  // JSON penyakit
  '/data/neonatologi/sepsis-neonatorum.json',
  '/data/neonatologi/hiperbilirubinemia.json',
  '/data/respirasi/asma-anak.json',
  '/data/respirasi/pneumonia-komunitas.json',
  '/data/pencernaan/diare-akut.json',
  '/data/saraf/kejang-demam.json',
  '/data/infeksi/demam-berdarah-dengue.json',
  '/data/infeksi/demam-tifoid.json',
  '/data/infeksi/tb-paru-anak.json',
  '/data/nefrologi/sindrom-nefrotik.json',
];

// Install: Cache semua aset
self.addEventListener('install', event => {
  console.log('[SW] Installing Pediatri App v2...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Caching static assets...');
      return cache.addAll(STATIC_ASSETS).catch(err => {
        console.warn('[SW] Cache partial failure (ok):', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate: Hapus cache lama
self.addEventListener('activate', event => {
  console.log('[SW] Activating Pediatri App v2...');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => {
        console.log('[SW] Deleting old cache:', k);
        return caches.delete(k);
      }))
    ).then(() => self.clients.claim())
  );
});

// Fetch: Cache First untuk JSON, Network First untuk HTML
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Skip non-GET dan external requests
  if (event.request.method !== 'GET') return;
  if (!url.origin.includes(location.origin) &&
      !url.href.includes('fonts.googleapis.com') &&
      !url.href.includes('fonts.gstatic.com')) return;

  // Cache First untuk aset statis (JSON, JS, fonts)
  if (url.pathname.endsWith('.json') || 
      url.pathname.endsWith('.js') ||
      url.href.includes('fonts.googleapis.com') ||
      url.href.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(response => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
          }
          return response;
        }).catch(() => cached);
      })
    );
    return;
  }

  // Network First untuk HTML
  event.respondWith(
    fetch(event.request).then(response => {
      if (response && response.status === 200) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
      }
      return response;
    }).catch(() => caches.match(event.request))
  );
});

// Background Sync (opsional)
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') self.skipWaiting();
});
