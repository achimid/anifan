async function extract() {

    const episodes = [...document.querySelectorAll('article .bsx')].slice(0, 12).reverse()
    for (let i = 0; i < episodes.length; i++) {
        const $episode = episodes[i]

        const url = $episode.querySelector('a').href
        const anime = $episode.querySelector('.tt').innerText
        const episode = parseInt($episode.querySelector('.epx').innerText.match(/\d+/g))
        const title = `${anime} - Episódio ${episode}`
        
        const post = {
            from: "Rine Cloud",
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
