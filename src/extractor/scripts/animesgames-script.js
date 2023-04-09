function getPostInfo($episode) {
    const url = $episode.querySelector('a').href
    const anime = $episode.querySelector('.tituloEP').innerText.split(' Epis')[0]
    const episode = parseInt($episode.querySelector('.tituloEP').innerText.split(' Epis')[1].match(/\d+/g))
    const title = `${anime} - Episódio ${episode}`
    
    return {
        from: "Animes Games",
        url,
        title,
        anime,
        episode,
    }
}

async function extract() {

    const episodes = [...document.querySelectorAll('.episodioItem')].reverse()
    const list = episodes.map(getPostInfo)
    const post = { list }

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

    await fetch("https://anifan.com.br/api/v1/integration/batch", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}

extract()
