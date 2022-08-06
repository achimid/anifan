const fetch = require('node-fetch')
const stringSimilarity = require("string-similarity")


const cache = {}

const queryByNameCached = async (name) => {
    const hasCache = cache[toKey(name)]
    if (hasCache) {
        console.log("Is cached ", name)   
        return hasCache
    } else {
        console.log("Is NOT cached!! ", name)
    }

    return null
}

const queryByNameBestMatch = async (name, limit = 10) => {
    return fetch(`https://api.jikan.moe/v4/anime?q=${name}&limit=${limit}`)
        .then(res => res.json())
        .then(json => json.data)
        .then(details => selectBestMatch(name, details))
        .catch(err => console.error("Erro ao buscar detalhe: ", err))
}

const queryByName = async (name) => {
    console.log(`Realizando busca do detalhe do anime: ${name}`)
    return fetch(`https://api.jikan.moe/v4/anime?q=${name}&limit=5`)
        .then(res => res.json())
        .then(json => json.data)
        .then(details => selectBestMatch(name, details))
        .then(detail => storeCache(name, detail))
        .catch(err => console.error("Erro ao buscar detalhe: ", err))
}

const selectBestMatch = async (name, details) => {

    if (!details) return null

    for (let i = 0; i < details.length; i++) {
        const detail = details[i];
        const similarity = stringSimilarity.compareTwoStrings(name, detail.title);

        if (similarity > 0.6) {
            console.log(`Similaridade bateu (${similarity}): ${name} != ${detail.title}`)
            return detail
        } else {
            console.error(`Similaridade não bateu (${similarity}): ${name} != ${detail.title}`)
        }
    }

    return details[0]
}


const toKey = (str) => str.toUpperCase().replace(/[^a-zA-Z0-9 ]/g, '').replace(new RegExp(" ", 'g'), "")

const storeCache = (name, detail) => {
    if (!detail) return null
    
    console.log("Stored cache ", name, detail.title)
    cache[toKey(name)] = detail    

    return detail
}

module.exports = {
    queryByName,
    queryByNameCached,
    queryByNameBestMatch
}