const webpush = require('web-push');

// VAPID keys should only be generated only once.
// const vapidKeys = webpush.generateVAPIDKeys();
//
// webpush.setGCMAPIKey('<Your GCM API Key Here>');
// webpush.setVapidDetails(
//     'mailto:example@yourdomain.org',
//     vapidKeys.publicKey,
//     vapidKeys.privateKey
// );

// This is the same output of calling JSON.stringify on a PushSubscription
const pushSubscription ={"endpoint":"https://fcm.googleapis.com/fcm/send/c-8-icEBM88:APA91bHS7rZiGIdS4bhPqCTJuzJ0UcthPOYZC8VjtA-IxmLcTUn8wy9prSan1YtSH9JS_8wpbSgwCiMgqxrz5ZZxRuSabYa5UGQseR3pC4m_qkq28vTuSVYSEG6pSf0w6cFGsZfECYAR","keys":{"p256dh":"BBytRJaEpgAOVjFwTOGcwvKMl9wcRNeAJBRYy23F1Fi4S8OjGt15S36vt5GSuD1skkCs7SL5r4VbFY62inwoilc=","auth":"Qj88dvVqk5GWVdyibkvh9Q=="}};

try {
    webpush.sendNotification(pushSubscription, 'Ahoj kéééémo');
} catch (e) {
    console.log("a")
}

