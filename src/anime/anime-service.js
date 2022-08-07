const jikanClient = require('./jikan-client')
const Anime = require('./anime-model')

const { save, findById, findByName, findIdByNameSimilarity } = require('./anime-repository')

const findByAnimeName = async (name) => {
    const anime = await findByName(name)

    if (!anime) return createByName(name)

    return anime
}

const createByName = async (name) => {
    return jikanClient.queryByNameBestMatch(name)
        .then(fromJikan)
        .then(save)
}

const fromJikan = (jikan) => {

    if (!jikan) return jikan

    const anime = new Anime({
        url: jikan.url,
        name: jikan.title,
        description: jikan.synopsis,
        image: jikan.images.webp.image_url || jikan.images.jpg.image_url,
        extra: [
            { key: "Episódios",     value: jikan.episodes },
            { key: "Ano"      ,     value: jikan.year },
            { key: "Estúdios" ,     value: jikan.studios.map(i => i.name).join(", ") },
            { key: "Gêneros"  ,     value: jikan.genres.map(i => i.name).join(", "), "size": 4 }
        ],
        source: { 
            mal: jikan 
        }
    })

    return anime
}




module.exports = {
    findById,
    createByName,
    findByAnimeName,
}