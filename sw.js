

var cacheName = "appV3";
var contenidoCache = [
  "app.js",
  "crear.html",
  "encontrar.html",
  "firebase.js",
  "index.html",
  "index.js",
  "manifest.webmanifest",
  "sw.js",
  "assets/css/index.css",
  "assets/css/bootstrap.min.css",
  "assets/js/script.js",
];
/*
self.addEventListener("install", (e) => {
  console.log("instalado");
  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      await cache.addAll(contenidoCache);
    })()
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const r = await caches.match(e.request);
      if (r) return r;
      const response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      cache.put(e.request, response.clone());
      return response;
    })()
  );
});

*/

importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
    );

workbox.precaching.precacheAndRoute([
    
    "recomendaciones.html",
    "offline.html",
    "icons/imagenAlgodon.png"
]);

workbox.routing.registerRoute(
    ({request}) => request.destination === 'image',
    new workbox.strategies.NetworkOnly()
);

workbox.routing.registerRoute(
    ({request}) => request.destination === 'document',
    new workbox.strategies.NetworkFirst()
);
//Si hay una respuesta que genere error
workbox.routing.setCatchHandler(async context =>{
    console.log(context);
    console.log(context.request);

    if (context.request.destination ==='image'){
        return workbox.precaching.matchPrecache('icons/imagenAlgodon.png');
    }else if (context.request.destination ==='document'){
        return workbox.precaching.matchPrecache('offline.html');
    }
    return Response.error();

})

