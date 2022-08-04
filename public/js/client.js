const publicVapidKey = 'BFmriORysfLRjUGB7Nt5jfFIPBvC1ulYQuHfleLN9xTZlS4XdAEVyrBRYbvYzLsmZU9KvHerIqHluuRH3ZGOV58';

function registerWebPushSafe() {
    return new Promise((resolve, reject) => {
        registerWebPush()
            .then(resolve)
            .catch(() => registerWebPush()
                        .then(resolve)
                        .catch(reject)
            )
            .catch(reject)
    })
}

async function registerWebPush() {
    if ('serviceWorker' in navigator) {
        console.log('Registering service worker');
        const registration = await navigator.serviceWorker.register('/worker.js', { scope: '/' });

        console.log('Registered service worker');

        console.log('Registering push');
        const subscriptionInfo = await registration.pushManager.subscribe({
            
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
        });

        const subscription = {
            userId: getId(),
            subscription: subscriptionInfo
        }

        console.log('Registered push');

        console.log('Sending push');
        await fetch('/api/v1/push/subscribe', {
            method: 'POST',
            body: JSON.stringify(subscription),
            headers: {
                'content-type': 'application/json'
            }
        });

        console.log('Sent push');
    } else {
        console.error('Notificação Web Push não permitida ou não suportada!')
    }
}

function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}  

function createId() {
    if (localStorage.getItem('ani_fan_id')) {
        return getId()
    }
    
    localStorage.setItem('ani_fan_id', uuid.v4())
    return getId()
}

function getId() {
    return localStorage.getItem('ani_fan_id')
}