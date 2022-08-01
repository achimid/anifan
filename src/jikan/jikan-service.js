const fetch = require('node-fetch')

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
    return fetch(`https://api.jikan.moe/v4/anime?q=${name}&limit=5`)
        .then(res => res.json())
        .then(json => json.data)
        .then(storeCache)
        .then(details => details[0])
}

const toKey = (str) => str.toUpperCase().replace(new RegExp(" ", 'g'), "")

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