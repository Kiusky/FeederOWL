self.addEventListener("install", e => {
  console.log("SW instalado");
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  console.log("SW ativado");
  return self.clients.claim();
});

self.addEventListener("fetch", e => {
  e.respondWith(fetch(e.request).catch(() => new Response("Offline")));
});
