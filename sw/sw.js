/* eslint-disable no-undef */
const CACHE_NAME = 'app1-static-v2';

const staticUrls = [];

this.addEventListener('install', async () => {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(staticUrls);
});

this.addEventListener('activate', async () => {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames
      .filter((name) => name !== CACHE_NAME)
      .map((name) => caches.delete(name)),
  );
});

async function staleWhileRevalidate (fetchRequest) {
  return fetch(fetchRequest).then((response) => {
    if (!response || response.status !== 200 || response.type !== 'basic') {
      return response;
    }

    const responseToCache = response.clone();
    caches.open(CACHE_NAME).then((cache) => {
      cache.put(fetchRequest, responseToCache);
    });
    return response;
  });
}

async function cacheFirst (request) {
  const cahced = await caches.match(request);
  const fetchRequest = request.clone();
  return cahced ?? (await staleWhileRevalidate(fetchRequest));
}

this.addEventListener('fetch', (event) => {
  event.respondWith(cacheFirst(event.request));
});
