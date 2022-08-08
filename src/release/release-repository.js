const Release = require('./release-model')
const mongoose = require('mongoose')

const cache = {}

const findLast = async () => {
    if (cache.last && cache.last.length > 0) return cache.last

    const last = await Release.find().sort({_id: -1}).limit(20).lean()

    cache.last = last
    setTimeout(() => { delete cache.last }, 60000)

    return last
}

const save = async (release) => {
    return release.save()
}

const findByAnimeIdAndEpisode = async (animeId, episode) => {
    return Release.findOne({ 'anime._id': mongoose.Types.ObjectId(animeId) , episode })
}

module.exports = {
    save,
    findLast,
    findByAnimeIdAndEpisode
}