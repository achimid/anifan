const fs = require('fs')
const path = require('path')
const useProxyI = require('puppeteer-page-proxy')
const cookiesService = require('./cookies/cookies-service')
const statusService = require('./../status/status-service')

const readScript = (file) => {
    const script = fs.readFileSync(path.join(__dirname, `./scripts/${file}`), 'utf8')
    
    if (process.env.NODE_ENV == 'production') return script

    return script.replace(new RegExp("https://anifan.com.br", 'g'), "http://localhost:8080")
}

const getSubscribers = () => {
    return [
        { useProxy: false, skipImage: false, url: "https://www.animestc.net", script: readScript("animestelecine-script.js"), name: "Animes Telecine"},
        { useProxy: false, skipImage: true, url: "https://goanimes.net/", script: readScript("goanimes-script .js"), name: "Go Animes"},
        { useProxy: false, skipImage: false, url: "https://subsplease.org/", script: readScript("subsplease-script.js"), name: "Subs Please (ENG)"},
        { useProxy: false, skipImage: true, url: "https://animesup.biz/episodios/", script: readScript("animesup-script.js"), name: "Animes Up"},
        { useProxy: false, skipImage: true, url: "https://animesonline.cc/episodio/", script: readScript("animesonlinecc-script.js"), name: "Animes Online CC"},
        { useProxy: false, skipImage: true, url: "https://darkmahou.net/", script: readScript("darkanimes-script.js"), name: "Dark Animes"},
        { useProxy: false, skipImage: true, url: "https://www.crunchyroll.com/pt-br/simulcastcalendar?filter=premium", script: readScript("crunchyroll-script.js"), name: "Crunchyroll"},
        // { useProxy: false, skipImage: true, url: "https://www.anbient.com/", script: readScript("anbient-script.js"), name: "Anbient"},
        { useProxy: false, skipImage: true, url: "https://animeshouse.net/", script: readScript("animeshouse-script.js"), name: "Animes House"},
        // { useProxy: false, skipImage: true, url: "https://sakuraanimes.com/home?categoria=1", script: readScript("animeshouse-script.js")}, Sakura Animes
    ]
} 

const execute = async (url, script, useProxy, skipImage, name) => {    
    console.log('Executando extractor...', url)
    
    console.log('Criando pagina web')
    const page = await global.browser.newPage()

    page.setBypassCSP(true)

    const urlProxy = process.env.PAGE_PROXY
    
    await page.setRequestInterception(true)
    page.on('request', async request => {
        if (skipImage && request.resourceType() === 'image') {
            request.abort()
        } else if (useProxy && !!urlProxy) {
            request._client = request.client
            await useProxyI(request, urlProxy)            
        } else {
            request.continue()            
        }
    })    
    

    if (process.env.ENABLE_CONSOLE_LOG === 'true') {
        page.on('console', message => {
            console.log(`${message.type().substr(0, 3).toUpperCase()} ${message.text()}`)
        })    
    }

    try {
        console.log('Navegando para url')
        await page.setDefaultNavigationTimeout(parseInt(process.env.PAGE_TIMEOUT))
                

        const cookies = cookiesService.getCookies(url)
        if (cookies && cookies.length > 0) {
            await page.setCookie(...cookies)
        }

        statusService.updateStatus(name, url, true)

        await page.goto(url)

        console.log('Executando script')
        await page.evaluate(script)                                   

        await cookiesService.saveCookies(url, page)

        statusService.updateStatus(name, url, true)
    } catch (error) {
        console.error(error)
        statusService.updateStatus(name, url, false)
    } finally {
        console.log('Finalizando pagina')        
        await page.close() 
    }

    console.log('Execução finalizada...')
}



const execution = async () => {
    const subs = getSubscribers()
    
    for (let i = 0; i < subs.length; i++) {
        const sub = subs[i]
        await execute(sub.url, sub.script, sub.useProxy, sub.skipImage, sub.name)
    }
}

const start = async () => {
    if (process.env.ENABLE_EXTRACTOR === 'true') {
        await execution()
        setInterval(execution, parseInt(process.env.EXTRACTOR_INTERVAL) * 60000)
    }
}


module.exports = {
    execute,
    start
}