const CACHE_NAME = 'pharmacy-app-v3'; // 👈 غير هذا الرقم مع كل تحديث جديد

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './sw.js'
  // أضف بقية ملفاتك هنا
];

// 1. مرحلة التثبيت: تنزيل الملفات الجديدة فوراً
self.addEventListener('install', (event) => {
  self.skipWaiting(); // تجبر المتصفح على الاعتماد على الـ Service Worker الجديد فوراً
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. مرحلة التنشيط: مسح الكاش القديم تلقائياً
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('حذف الكاش القديم:', cache);
            return caches.delete(cache); // حذف النسخ القديمة كلياً من جهاز الصيدلي
          }
        })
      );
    }).then(() => self.clients.claim()) // استلام التحكم بالصفحة فوراً
  );
});

// 3. جلب الملفات من الكاش أو الشبكة
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});