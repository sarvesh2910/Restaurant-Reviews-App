let cacheVersion = 'restaurant-review-v1';

//Used for fetching the files from the Internet/Cache
self.addEventListener('fetch', function (e) {
    if (e.request.cache === 'only-if-cached' && e.request.mode !== 'same-origin') {
        return;
    }
    e.respondWith(
        caches.match(e.request).then(function (response) {
            if (response) return response;
            return fetch(e.request);
        })
    );
});

//array used to determine which files to store in cache
let urlArray = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/js/dbhelper.js',
    '/js/restaurant_info.js',
    '/js/main.js',
    '/css/styles.css',
    '/data/restaurants.json',
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
    './img/7.jpg',
    './img/8.jpg',
    './img/9.jpg',
    './img/10.jpg'
];

//Used for caching the files when user visits the web-page for the first time.
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(cacheVersion).then(function (cache) {
            console.log('Caching files.');
            return cache.addAll(urlArray);
        })
    );
});

//Used for updating the cached files with newer files
self.addEventListener('activate', function (e) {
    console.log('Service worker activated');
    e.waitUntil(
        caches.keys().then(function (cacheVersions) {
            return Promise.all(cacheVersions.map(function (currentVersion) {
                if (currentVersion !== cacheVersion) {
                    console.log('Older version Service Worker removing cached files from ', currentVersion);
                    return caches.delete(currentVersion);
                }
            }))
        })
    )
});
