// Precaches this experiment's own page on install, then serves cache-first
// on every request within its scope (this directory only). The versioned
// cache name is what lets a later deploy invalidate the old cache cleanly
// on activate -- the standard fix for the classic "why won't my update
// show up" service worker bug.
const CACHE_NAME = 'pages-lab-03-service-worker-v2';
const PRECACHE_URLS = ['./', './index.html'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
