const CACHE = 'callphobia-v1';
const ASSETS = [
  '/test/',
  '/test/index.html',
  '/test/manifest.json',
  '/test/colors_and_type.css',
  '/test/icons/icon-192.svg',
  '/test/icons/icon-512.svg',
  '/test/ui_kits/app/components.jsx',
  '/test/ui_kits/app/onboarding.jsx',
  '/test/ui_kits/app/screens.jsx',
  '/test/ui_kits/app/app.jsx',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
