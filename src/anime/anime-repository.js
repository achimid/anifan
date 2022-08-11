const Anime = require('./anime-model')
const stringUtils = require('../utils/string-utils')

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

    return selectBestMatch(name, allAnimes)
}

const selectBestMatch = (name, allAnimes) => {

    if (!allAnimes) return null

    const fMapName = (d) => [d.name, ...d.names]

    return stringUtils.selectBestMatch(name, allAnimes, fMapName)
}

module.exports = {
    save,
    update,
    findById,
    findByName,
    findIdByNameSimilarity
}