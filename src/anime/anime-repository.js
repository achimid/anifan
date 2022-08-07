const Anime = require('./anime-model')
const stringSimilarity = require('string-similarity')

const cache = []

const save = async (anime) => {
    return anime.save()
}

const findById = async (id) => {
    return Anime.findById(id)
}

const findByName = async (name) => {
    const found = await Anime.findOne({ name })
    
    if (found) return found

    return findIdByNameSimilarity(name)
}

const findIdByNameSimilarity = async (name) => {
    const allAnimes = await Anime.find().lean()

    return selectBestMatch(allAnimes, name)
}

const selectBestMatch = (list, name) => {

    if (!list) return null

    for (let i = 0; i < list.length; i++) {
        const item = list[i];
        const similarity = stringSimilarity.compareTwoStrings(name, item.name);

        if (similarity > 0.7) return item
    }

    return undefined
}

module.exports = {
    save,
    findById,
    findByName,
    findIdByNameSimilarity
}