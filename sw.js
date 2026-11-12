// Lingo Ders Arkadaşım - Service Worker (Otomatik Güncelleme & Çevrimdışı Destek)
const CACHE_NAME = 'lingo-ders-arkadasim-v3.7.0';
const ASSETS_TO_CACHE = [
  './',
  'index.html',
  'manifest.json',
  'version.json',
  'favicon.ico',
  'icon-192.png',
  'icon-512.png',
  'apple-touch-icon.png',
  'book_astrobot.jpg',
  'book_dinosaurs.jpg',
  'book_starwars.jpg',
  'book_mario.jpg',
  'book_sackboy.jpg',
  'book_ittakestwo.jpg',
  'book_spiderman.jpg',
  'book_batman.jpg',
  'book_sonic.jpg',
  'scene_hero_crossover.jpg',
  'scene_batman_clocktower.jpg',
  'scene_space_alliance.jpg',
  'scene_ittakestwo_dino.jpg',
  'scene_dino_waterfall.jpg',
  'scene_mario_castle.jpg',
  'scene_sackboy_kite.jpg',
  'scene_sonic_emerald.jpg'
];

// 1. Kurulum: Varlıkları önbelleğe al ve beklemeden hemen devreye gir
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn('[SW] Bazı önbellek dosyaları indirilemedi:', err);
      });
    })
  );
});

// 2. Etkinleştirme: Eski önbellekleri temizle ve açık tüm sekmeleri/sayfaları anında kontrol altına al
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            console.log('[SW] Eski önbellek silindi:', name);
            return caches.delete(name);
          })
      );
    }).then(() => {
      return self.clients.claim();
    }).then(() => {
      // Açık sayfalara güncelleme bildirimi gönder
      return self.clients.matchAll({ type: 'window' }).then((clients) => {
        clients.forEach((client) => {
          client.postMessage({ type: 'SW_ACTIVATED', cache: CACHE_NAME, version: '3.7.0' });
        });
      });
    })
  );
});

// 3. İstek Yakalama (Network-First for HTML/Manifest/Version, Stale-While-Revalidate for images)
self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // HTML sayfaları, ana dizin ve sürüm kontrol dosyaları her zaman Ağdan İlk (Network-First) yüklenir.
  // Bu sayede Safari/Chrome ana ekran ikonu açıldığında GitHub'daki en güncel kod doğrudan çekilir!
  const isHtmlOrConfig =
    request.mode === 'navigate' ||
    url.pathname.endsWith('/') ||
    url.pathname.endsWith('index.html') ||
    url.pathname.endsWith('version.json') ||
    url.pathname.endsWith('manifest.json');

  if (isHtmlOrConfig) {
    event.respondWith(
      fetch(request, { cache: 'no-cache' })
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => {
          // İnternet yoksa önbellekten aç
          return caches.match(request).then((cachedResponse) => {
            return cachedResponse || caches.match('index.html') || caches.match('./');
          });
        })
    );
    return;
  }

  // Diğer statik kaynaklar (ikonlar, resimler vb.): Stale-While-Revalidate
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => null);

      return cachedResponse || fetchPromise;
    })
  );
});

// Manuel komut dinleyici (ör. zorla güncelleme çağrısı)
self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
