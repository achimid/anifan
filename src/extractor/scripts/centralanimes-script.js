async function extract() {

    const episodes = [...document.querySelectorAll('.epiItem')].reverse()
    for (let i = 0; i < episodes.length; i++) {
        const $episode = episodes[i]

        const url = $episode.querySelector('a').href
        const anime = $episode.querySelector('.epiAniTitulo').innerText
        const episode = parseInt([...$episode.querySelectorAll('.epiTipo')].map(e => e.innerText).join(' ').match(/\d+/g))
        const title = `${anime} - Episódio ${episode}`
        
        const post = {
            from: "Central Animes TK",
            url,
            title,
            anime,
            episode,
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
