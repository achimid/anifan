const fs = require('fs')
const path = require('path')
const useProxyI = require('puppeteer-page-proxy')

const readScript = (file) => {
    const script = fs.readFileSync(path.join(__dirname, `./scripts/${file}`), 'utf8')
    
    if (process.env.NODE_ENV == 'production') return script

    return script.replace(new RegExp("https://anifan.com.br", 'g'), "http://localhost:8080")
}

const getSubscribers = () => {
    return [
        // { url: "https://www.anbient.com/", script: readScript("anbient-script.js"), useProxy: false },
        // { url: "https://www.animestc.net", script: readScript("animestelecine-script.js"), useProxy: true },
        // { url: "https://animesonline.cc/episodio/", script: readScript("animesonlinecc-script.js"), useProxy: true },
        { url: "https://goanimes.net/", script: readScript("goanimes-script .js"), useProxy: false },
        { url: "https://www.crunchyroll.com/pt-br/videos/anime/updated", script: readScript("crunchyroll-script.js"), useProxy: false },
        { url: "https://darkmahou.net/", script: readScript("darkanimes-script.js"), useProxy: false },
    ]
} 

const execute = async (url, script, useProxy) => {    
    console.log('Executando extractor...', url)
    
    console.log('Criando pagina web')
    const page = await global.browser.newPage()

    page.setBypassCSP(true)

    const urlProxy = process.env.PAGE_PROXY

    if (useProxy && !!urlProxy) {
        await page.setRequestInterception(true)
        page.on('request', async request => {
            request._client = request.client
            await useProxyI(request, urlProxy)            
        })    
    }

    if (process.env.ENABLE_CONSOLE_LOG === 'true') {
        page.on('console', message => {
            console.log(`${message.type().substr(0, 3).toUpperCase()} ${message.text()}`)
        })    
    }

    try {
        console.log('Navegando para url')
        await page.setDefaultNavigationTimeout(parseInt(process.env.PAGE_TIMEOUT))
        await page.goto(url)

        console.log('Executando script')
        await page.evaluate(script)                                   

    } catch (error) {
        console.error(error)
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
        await execute(sub.url, sub.script, sub.useProxy)
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