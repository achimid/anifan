const jikanService = require('../jikan/jikan-service')

const getDetail = async ({ anime }) => jikanService.queryByNameCached(anime).then(mapMalDataToDetail)

const getDetailCreate = async ({ anime }) => jikanService.queryByName(anime).then(mapMalDataToDetail)

const mapMalDataToDetail = (malData) => {
    const detail = {}

    if (!malData) return {extra: []}

    detail.image = malData.images.webp.image_url || malData.images.jpg.image_url
    detail.mal = malData.url
    detail.title = malData.title
    detail.synopsis = malData.synopsis || ""

    detail.extra = []
    detail.extra.push({"key": "Episódios","value": malData.episodes || "(?)"})
    detail.extra.push({"key": "Ano","value": malData.year || "(?)"})
    detail.extra.push({"key": "Estúdios","value": malData.studios.map(i => i.name).join(", ")})
    detail.extra.push({"key": "Gêneros","value": malData.genres.map(i => i.name).join(", "),"size": 4})

    // console.log("Detalhe mapeado: ", detail)

    return detail
}


module.exports = {
    getDetail,
    getDetailCreate
}