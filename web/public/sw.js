self.addEventListener('install', event => {
    console.log('SW installed');
});

// show a notification directly (optional)
self.addEventListener('activate', event => {
    event.waitUntil(
        // self.registration.showNotification('Hello from SW!', {
        //     body: 'This works on PC and mobile',
        //     icon: '/icon.png'
        // })
    );
});