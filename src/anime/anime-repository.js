const Anime = require('./anime-model')
const stringSimilarity = require('string-similarity')

const cache = []

const save = async (anime) => {
    return anime.save()
}

const findById = async (id) => {
    return Anime.findById(id)
}

const update = async (id, data) => {
    const anime = await findById(id, data)

    return save({...anime, data})
}

const findByName = async (name) => {
    const found = await Anime.findOne({  $or: [ { name }, { names: name }] })
    
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
        const similarity = stringSimilarity.compareTwoStrings(name.toUpperCase(), item.name.toUpperCase());

        if (similarity > 0.6) return item
    }

    return undefined
}

module.exports = {
    save,
    update,
    findById,
    findByName,
    findIdByNameSimilarity
}