const webpush = require('web-push')

const publicVapidKey = process.env.PUSH_KEY_PUBLIC
const privateVapidKey = process.env.PUSH_KEY_PRIVATE

webpush.setVapidDetails('mailto:anifan-site@outlook.com', publicVapidKey, privateVapidKey)

const subscribers = {}

const subscribe = (userId, subscription) => {    
    if (!subscribers[userId]) sendPushWellcomeTest(subscription)

    subscribers[userId] = subscription
}

const sendPushWellcomeTest = (subscription) => {
    const payload = JSON.stringify({ 
        title: 'Ani Fan - Bem vindo', 
        options: {
            body: 'Obrigado com nos visitar.\n\nOs próximos lançamentos serão enviados em forma de notificação para esse dispositivo.', 
            data: { url: '/' }
        }
    })

    sendPush(subscription, payload)
}

const sendPush = (subscription, payload) => {
    console.log("Enviando notificação push...")

    webpush.sendNotification(subscription, payload)
        .then(() => console.log("Notificação enviada com sucesso."))
        .catch(error => console.error("Erro ao enviar notificação: ", error.stack))  
}

const sendPushById = (userId, body) => {
    sendPush(subscribers[userId], JSON.stringify(body))
}

const sendReleasePush = (userId, title) => {
    const payload = JSON.stringify({ 
        title: 'Ani Fan - Novo lançamento', 
        options: {
            body: `[${title}] acabou de ser lançado. Hora de assistir!`, 
            data: { url: '/' }
        }
    })
    sendPush(subscribers[userId], payload)
}

module.exports = {
    subscribe,
    sendPushById,
    sendReleasePush
}