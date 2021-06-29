/* eslint-disable no-undef */

const CACHE_NAME = 'PACKAGE_NAME-vPACKAGE_VERSION';
const STATIC_CACHE_NAME = `s-${CACHE_NAME}`;
const DYNAMIC_CACHE_NAME = `d-${CACHE_NAME}`;

this.addEventListener('install', async () => {
  const res = await fetch('/assets-manifest.json');
  const staticNames = await res.json();
  if (staticNames) {
    const cache = await caches.open(STATIC_CACHE_NAME);
    staticUrls = Object.values(staticNames).map((name) => `/${name}`);
    staticUrls.push('/');
    await cache.addAll(staticUrls);
  }
});

this.addEventListener('activate', async () => {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames
      .filter((name) => name !== STATIC_CACHE_NAME)
      .filter((name) => name !== DYNAMIC_CACHE_NAME)
      .map((name) => caches.delete(name)),
  );
});

async function staleWhileRevalidate (fetchRequest) {
  return fetch(fetchRequest).then((response) => {
    if (!response || response.status !== 200 || response.type !== 'basic') {
      return response;
    }
    const responseToCache = response.clone();
    caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
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
