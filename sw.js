self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("feederowl-cache").then(cache =>
      cache.addAll([ "/", "/index.html", "/styles.css", "/script.js" ])
    )
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});