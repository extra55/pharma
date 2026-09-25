const CACHE_NAME = 'pharmacy-app-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// تثبيت الـ Service Worker وحفظ الملفات
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// استدعاء البيانات من الـ Cache عند عدم وجود إنترنت
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});