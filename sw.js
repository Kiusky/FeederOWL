// Cache name
const CACHE_NAME = 'feederowl-v1';

// Arquivos para armazenar em cache
const assetsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/img/feederowl/logo steam.png',
  '/img/feederowl/logo discord.png',
  '/vid/feederowl/fundo animado.webm',
  '/aud/feederowl/musica fundo.mp3'
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(assetsToCache);
      })
  );
});

// Estratégia: Cache First, depois rede
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      })
  );
});