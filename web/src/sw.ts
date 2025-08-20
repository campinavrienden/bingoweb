/// <reference types="vite/client" />
/// <reference lib="webworker" />
self.addEventListener('install', _ => {
    console.log('SW installed');
});

// show a notification directly (optional)
self.addEventListener('activate', event => {
    (event as ExtendableEvent).waitUntil(new Promise(r => {
        console.log("SW activated")
        r(undefined);
    }));
});