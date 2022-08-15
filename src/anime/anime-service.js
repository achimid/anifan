const jikanClient = require('./jikan-client')
const Anime = require('./anime-model')

const { save, findById, findByName, update, listAnimeNotFound  } = require('./anime-repository')

const findByAnimeName = async (name) => {
    const anime = await findByName(name)

    if (!anime) return createByName(name)

    return anime
}

const createByName = async (name) => {
    return jikanClient.queryByNameBestMatch(name)
        .then(jikan => fromJikan(jikan, name))
        .then(save)
}

const fromJikan = (jikan, nameQuery) => {

    if (!jikan) throw 'Nenhum anime encontrado!! ---------------------- '

    const anime = new Anime({
        url: jikan.url,
        name: jikan.title,
        names: [...new Set([jikan.title, jikan.title_english, jikan.title_japanese, nameQuery, ...jikan.title_synonyms, ...jikan.titles.map(t => t.title)])],
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
    update,
    findById,
    createByName,
    findByAnimeName,
    listAnimeNotFound
}