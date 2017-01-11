self.addEventListener('install', function(event){
	console.log(event);
});

self.addEventListener('activate', function(event){
    console.log("zde")
    console.log(event);
});

self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'Push Codelab';
  const options = {
    body: event.data.text(),
    icon: 'icon.png',
    badge: 'badge.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
