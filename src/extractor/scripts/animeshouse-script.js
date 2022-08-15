async function extract() {
    const episodes = [...document.querySelectorAll('.animation-2 .item')].reverse()
    for (let i = 0; i < episodes.length; i++) {
        const $episode = episodes[i]

        const url = $episode.querySelector('a').href
        const anime = $episode.querySelector('.data h3').innerText.trim()
        const episode = parseInt($episode.querySelector('.epi').innerText.trim().match(/\d+/g))
        const title = `${anime} - Episódio ${episode}`
        const mirrorOnline = url
        
        const post = {
            from: "Animes House",
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
