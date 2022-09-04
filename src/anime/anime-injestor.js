const fetch = require('node-fetch')
const animeService = require('./anime-service')

const loadJobInjestInfo = async () => {
    

    let page = 1
    let hasNextPage = true

    do {
        const json = await fetch(`https://api.jikan.moe/v4/anime?limit=25&page=${page}`).then(res => res.json())        

        try {
            for (const anime of json.data) {
                try {
                    console.log(`Job anime... realizando busca: ${anime.title}`)
    
                    const animeFound = await animeService.findByExactName(anime.title)                    
                    if (!animeFound) await animeService.createByName(anime.title, anime)
                } catch (error) {
                    console.error('Erro no job de buscar animes:', error.message)
                }
                
            }                    
        } catch (error) {
            console.error('Erro no job de buscar animes na API Jikan:', json)
        }
        
        hasNextPage = json.pagination.has_next_page
        page = page + 1

        console.log(`Page: ${page}`)        
        await sleep(500)
    } while (hasNextPage)

}

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

module.exports = {
    loadJobInjestInfo: () => setTimeout(loadJobInjestInfo, 100)
}


