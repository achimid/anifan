function getPostInfo($episode) {
    const url = $episode.querySelector('a').href
    const anime = $episode.querySelector('h1').innerText.replace('Dublado', '')
    const episode = parseInt($episode.querySelector('span').innerText.match(/\d+/g))
    const title = `${anime} - Episódio ${episode}`
    
    return {
        from: "AnimesRoll",
        url,
        title,
        anime,
        episode,
    }
}

async function extract() {

    const episodes = [...document.querySelectorAll('html body div#__next div ul:nth-child(3) li')].slice(0, 20).reverse()
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
