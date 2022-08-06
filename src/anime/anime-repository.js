const Anime = require('./anime-model')

const cache = []

const save = async (anime) => {
    return anime.save()
}

const findById = async (id) => {
    return Anime.findById(id)
}

const findByName = async (name) => {
    const l = await Anime.find()
    return Anime.findOne({ name })
}

module.exports = {
    save,
    findById,
    findByName
}