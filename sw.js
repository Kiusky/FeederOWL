self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("feederowl-cache").then(cache => {
      return cache.addAll([
        "/",
        "/index.html",
        "/styles.css",
        "/script.js",
        "/img/feederowl/logo steam.png",
        "/img/feederowl/logo discord.png"
      ]);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
