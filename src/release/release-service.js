const Release = require('./release-model')
const pushService = require('../push/push-service')
const animeService = require('../anime/anime-service')
const releaseRepository = require('./release-repository')

const findLast = releaseRepository.findLast

const processRelease = async (integration) => {
    const { anime, episode } = integration
    
    const animeId = (await animeService.findByAnimeName(anime))._id.toString()
    const release = await releaseRepository.findByAnimeIdAndEpisode(animeId, episode)

    if (!release) return createFromIntegration(integration).then(pushService.notifyAnime)

    if (!alreadyHasSource(release, integration)) {
        return updateFromIntegration(release, integration).then(pushService.notifyAnime)
    }
    
    console.log(`Discarded integration event. anime=${anime} animeFound=${release.anime.name} episode=${episode}`)
}


const alreadyHasSource = (release, i) => {
    return release.sources.filter(s => s.title == i.from).length > 0
}

const updateFromIntegration = async (release, i) => {
    console.log(`Updating release. anime=${i.anime} episode=${i.episode}`)

    release.sources.push({
        title: i.from,
        url: i.url
    })

    return releaseRepository.save(release)
}

const createFromIntegration = async (i) => {
    console.log(`Creating new release. anime=${i.anime} episode=${i.episode}`)
    
    return releaseRepository.save(new Release({
        title: i.title,
        episode: i.episode,
        anime: await animeService.findByAnimeName(i.anime),
        mirrors: (i.data || {}).mirrors,
        sources: [{ title: i.from, url: i.url }]
    }))
}

module.exports = {
    findLast,
    processRelease
}