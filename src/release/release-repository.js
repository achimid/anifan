const Release = require('./release-model')
const mongoose = require('mongoose')

let cache = []

const findLast = async () => {
    return Release.find().sort({'updatedAt': 1}).limit(15)
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