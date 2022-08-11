
async function extract() {
    await new Promise(r => setTimeout(r, 1000))

    const episodes = [...document.querySelectorAll('#main_content li.group-item')].reverse()
    for (let i = 0; i < episodes.length; i++) {
        const $episode = episodes[i]

        const url = $episode.querySelector('a').href
        const anime = $episode.querySelector('.series-title').innerText
        const episode = parseInt($episode.querySelector('.series-data').innerText.split(' – ')[0].match(/\d+/g))
        const title = `${anime} - Episódio ${episode}`
        
        const post = {
            from: "Crunchyroll",
            url,
            title,
            anime,
            episode
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
