async function extract() {
    
    const episodes = [...document.querySelectorAll('tr')].slice(1).slice(0, 20).reverse()
    for (let i = 0; i < episodes.length; i++) {
        const $episode = episodes[i]

        const preTitle = $episode.innerText.split('[1080p]')[0].replace('[Erai-raws]','').trim()
        const url = $episode.querySelector('td:nth-child(2) a').href
        const anime = preTitle.split('-').slice(0, -1).join('-').trim()
        const episode = parseInt(preTitle.split('-').splice(-1))
        const title = `${anime} - Episódio ${episode}`

        const mirrorTorrent = $episode.querySelector('a:nth-child(2)').href

        
        const post = {
            from: "Erai-raws (Nyaa)",
            url,
            title,
            anime,
            episode,
            data: {
                mirrors: [
                    {
                        description: "Torrent (PT-BR)",
                        url: mirrorTorrent
                    }
                ]
            }
        }
        
        console.log(post)

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(post);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch("https://anifan.com.br/api/v1/integration", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        
    }
}

extract()
