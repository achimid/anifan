const fs = require('fs')
const path = require('path')

const readScript = (file) => {
    const script = fs.readFileSync(path.join(__dirname, `./scripts/${file}`), 'utf8')
    
    if (process.env.NODE_ENV == 'production') return script

    return script.replace(new RegExp("https://anifan.com.br", 'g'), "http://localhost:8080")
}

const getSubscribers = () => {
    return [
        { url: "https://www.animestc.net", script: readScript("animestelecine-script.js") }
    ]
} 

const execute = async (url, script) => {    
    console.log('Executando extractor...', url, script)
    
    const page = await global.browser.newPage()
    await page.goto(url)  
    await page.evaluate(script)            
    await page.close()        

    console.log('Execução finalizada...')
}

const execution = async () => {
    const subs = getSubscribers()
    
    for (let i = 0; i < subs.length; i++) {
        const sub = subs[i]
        await execute(sub.url, sub.script)
    }
}

const start = async () => {
    await execution()
    setInterval(execution, parseInt(process.env.EXTRACTOR_INTERVAL) * 60000)
}


module.exports = {
    execute,
    start
}