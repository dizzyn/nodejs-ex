
if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push is supported');

  navigator.serviceWorker.register('./service-worker.js')
  .then(function(swReg) {
    console.log('Service Worker is registered', swReg);

    swRegistration = swReg;

    swRegistration.pushManager.getSubscription()
    .then(function(subscription) {
      isSubscribed = !(subscription === null);

      if (isSubscribed) {
        console.log('User IS subscribed.');
            updateSubscriptionOnServer(subscription);
      } else {
        console.log('User is NOT subscribed.');
        subscribeUser();
      }

      //updateBtn();
    });

  })
  .catch(function(error) {
    console.error('Service Worker Error', error);
  });
} else {
  console.warn('Push messaging is not supported');
  pushButton.textContent = 'Push Not Supported';
}

const applicationServerPublicKey = 'BKaGcIOPbGwO8757QK-jk6xDF5gOJcEbOhUeoB5R5chf4X-Z7oQfpQncAxbgZHLKp4AhU791Ip-kD2Ake_yr9RM';

/*

Public Key
==========
BKaGcIOPbGwO8757QK-jk6xDF5gOJcEbOhUeoB5R5chf4X-Z7oQfpQncAxbgZHLKp4AhU791Ip-kD2Ake_yr9RM

Private Key
===========
nQNFW416raOmi4z4Xra3pn_DZS_vQ9qj9Zj2lSkUwlM

*/

function subscribeUser() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
  .then(function(subscription) {
    console.log('User is subscribed:', subscription);

    updateSubscriptionOnServer(subscription);

    isSubscribed = true;

  //  updateBtn();
  })
  .catch(function(err) {
    console.log('Failed to subscribe the user: ', err);
  //  updateBtn();
  });
}

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  };
  return outputArray;
}

function updateSubscriptionOnServer(subscription) {
  // TODO: Send subscription to application server
  console.log("aa")
  const subscriptionJson = document.querySelector('.js-subscription-json');
  const subscriptionDetails =
    document.querySelector('.js-subscription-details');

   if (subscription) {
     subscriptionJson.textContent = JSON.stringify(subscription);
  //   subscriptionDetails.classList.remove('is-invisible');
  // } else {
  //   subscriptionDetails.classList.add('is-invisible');
   }
}
