async function extract() {
    
    const episodes = [...document.querySelectorAll('.home-post .release-item')].reverse()
    for (let i = 0; i < episodes.length; i++) {
        const $episode = episodes[i]

        const url = $episode.querySelector('a').href
        const anime = $episode.querySelector('a').innerText.split('—')[0].trim()
        const episode = parseInt($episode.querySelector('a').innerText.split('—')[1])
        const title = `${anime} - Episódio ${episode}`

        const mirrorTorrent = [...$episode.querySelectorAll('.badge-wrapper a')].filter(e => e.innerText == '1080p')[0].href

        
        const post = {
            from: "Subs Please (ENG)",
            url,
            title,
            anime,
            episode,
            data: {
                mirrors: [
                    {
                        description: "Torrent (ENG)",
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
