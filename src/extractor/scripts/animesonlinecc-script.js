function getAnime(str) {
    let anime = str.replace('Aoashi', 'Ao Ashi')    

    return anime
}

async function extract() {
    const episodes = [...document.querySelectorAll('.item.episodes')].reverse()
    for (let i = 0; i < episodes.length; i++) {
        const $episode = episodes[i]

        const title = $episode.querySelector('.eptitle').innerText
        const anime = getAnime($episode.querySelector('.eptitle').innerText.split(' Episodio')[0].trim())
        const url = $episode.querySelector('a').href
        const episode = parseInt($episode.querySelector('.eptitle').innerText.split(' Episodio')[1].trim().match(/\d+/g))
        const mirrorOnline = url
        
        const post = {
            from: "Animes Online CC",
            url,
            title,
            anime,
            episode,
            data: {
                mirrors: [
                    {
                        description: "Online",
                        url: mirrorOnline
                    }
                ].filter(m => m.url)
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
