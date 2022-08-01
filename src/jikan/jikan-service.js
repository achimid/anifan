const fetch = require('node-fetch')
const stringSimilarity = require("string-similarity")


const cache = {}

const queryByNameCached = async (name) => {
    const hasCache = cache[toKey(name)]
    if (hasCache) {
        console.log("Is cached ", name)   
        return hasCache
    }

    return null
}

const queryByName = async (name) => {
    console.log(`Realizando busca do detalhe do anime: ${name}`)
    return fetch(`https://api.jikan.moe/v4/anime?q=${name}&limit=5`)
        .then(res => res.json())
        .then(json => json.data)
        .then(storeCache)
        .then(details => selectBestMatch(name, details))
        .catch(err => console.error("Erro ao buscar detalhe: ", err))
}

const selectBestMatch = async (name, details) => {

    for (let i = 0; i < details.length; i++) {
        const detail = details[i];
        const similarity = stringSimilarity.compareTwoStrings(name, detail.title);

        if (similarity > 0.8) {
            return detail
        } else {
            console.log(`Similaridade não bateu: ${name} != ${detail.title}`)
        }
    }

    return details[0]
}


const toKey = (str) => str.toUpperCase().replace(/[^a-zA-Z0-9 ]/g, '').replace(new RegExp(" ", 'g'), "")

const storeCache = (details) => {
    if (!details) return []

    details.map(detail => {
        console.log("Stored cache ", detail.title)
        cache[toKey(detail.title)] = detail
    })    

    return details
}

module.exports = {
    queryByName,
    queryByNameCached
}