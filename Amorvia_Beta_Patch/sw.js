const CACHE = "amorvia-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/css/styles.css",
  "/js/app.js",
  "/data/scenarios.json",
  "/assets/backgrounds/room.svg",
  "/assets/characters/male_casual.svg",
  "/assets/characters/female_casual.svg",
  "/assets/characters/spirit_calm.svg",
  "/assets/characters/spirit_angry.svg",
  "/manifest.json"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
