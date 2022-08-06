const Release = require('./release-model')

let cache = []

const findLast = async () => {
    return Release.find().sort({'updatedAt': -1}).limit(15)
}

const save = async (release) => {
    return release.save()
}

const findByAnimeNameAndEpisode = async (animeName, episode) => {
    const l = await Release.find()
    const f = await Release.findOne({ 'anime.name': animeName , episode })

    return f
}

module.exports = {
    save,
    findLast,
    findByAnimeNameAndEpisode
}