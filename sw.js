const CACHE = 'fox-cal-v1';
const ASSETS = ['./', './index.html', './manifest.json', './icon.png', './icon-180.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (url.hostname.includes('githubusercontent')) return; // seed fetch: always network
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
