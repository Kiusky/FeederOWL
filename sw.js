self.addEventListener("install", (e) => {
  console.log("Service Worker instalado");
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  console.log("Service Worker ativado");
  return self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    fetch(e.request).catch(() => new Response("Você está offline."))
  );
});
