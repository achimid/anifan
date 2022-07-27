const json = [{"id": "654","title": "Overlord IV - 4ª temporada - Episódio 04","mirrors": [{"description": "Online","url": "https://animesonline.cc/episodio/overlord-4-episodio-4/"},{"description": "Torrent","url": "#"},{"description": "1080p","url": "https://drive.google.com/file/d/1_jn3e3X60c1uJObOPubI9UIJUdIqZvO1/view"},{"description": "720p","url": "https://drive.google.com/file/d/1xSnnZmGG1cEhvhhP37FMjdP7u42zB6Sr/view"},{"description": "MP4","url": "https://drive.google.com/file/d/1O_jR5RD_vSjC8kBJK-Sydpu4gqvYVYIK/view"}],"detail": {"image": "./img/img.jpg","title": "Overlord IV","mal": "https://myanimelist.net/anime/48895/Overlord_IV","sinopse": "A história começa com Yggdrasil, um popular jogo online que está tranquilamente encerrando o seu último dia. Nosso protagonista, Momonga, decidiu ficar até o último momento em seu amado jogo e esperar que seja forçado a fazer o logout. Inesperadamente, isso não acontece e Momonga fica preso em seu corpo esqueleto e é transferido para outro mundo. 'O Poderoso Overlord' precisa agora descobrir um novo mundo e enfrentar os seus desafios contínuos. Não tendo nenhum: Pais, amigos, ou lugar na sociedade, este homem comum se esforça para assumir o novo mundo que o jogo se tornou. Ele é baseado em um Light Novel de mesmo nome.","extra": [{"key": "Gêneros","value": "Ação, Fantasia"},{"key": "Episódios","value": "13"},{"key": "Estúdio","value": "MadHouse"},{"key": "Ano","value": "2015"}]},"source": [{"title": "Animes Telecine","content": [{"key": "1080p","value": ""},{"key": "1080p","value": ""}]},{"title": "Animes Online","url": "#"},{"title": "Crunchroll","url": "#"},{"title": "Eternal Fansub","url": "#"},{"title": "Anbient","url": "#"}]}, {"id": "123456","title": "Overlord IV - 4ª temporada - Episódio 04","mirrors": [{"description": "Online","url": "https://animesonline.cc/episodio/overlord-4-episodio-4/"},{"description": "Torrent","url": "#"},{"description": "1080p","url": "https://drive.google.com/file/d/1_jn3e3X60c1uJObOPubI9UIJUdIqZvO1/view"},{"description": "720p","url": "https://drive.google.com/file/d/1xSnnZmGG1cEhvhhP37FMjdP7u42zB6Sr/view"},{"description": "MP4","url": "https://drive.google.com/file/d/1O_jR5RD_vSjC8kBJK-Sydpu4gqvYVYIK/view"}],"detail": {"image": "./img/img.jpg","title": "Overlord IV","mal": "https://myanimelist.net/anime/48895/Overlord_IV","sinopse": "A história começa com Yggdrasil, um popular jogo online que está tranquilamente encerrando o seu último dia. Nosso protagonista, Momonga, decidiu ficar até o último momento em seu amado jogo e esperar que seja forçado a fazer o logout. Inesperadamente, isso não acontece e Momonga fica preso em seu corpo esqueleto e é transferido para outro mundo. 'O Poderoso Overlord' precisa agora descobrir um novo mundo e enfrentar os seus desafios contínuos. Não tendo nenhum: Pais, amigos, ou lugar na sociedade, este homem comum se esforça para assumir o novo mundo que o jogo se tornou. Ele é baseado em um Light Novel de mesmo nome.","extra": [{"key": "Gêneros","value": "Ação, Fantasia"},{"key": "Episódios","value": "13"},{"key": "Estúdio","value": "MadHouse"},{"key": "Ano","value": "2015"}]},"source": []}]
const $list = document.querySelector("#accordion")

setTimeout(load, 300)


async function load() {
    if (window.ethereum) {
        await window.ethereum.send('eth_requestAccounts')
    }

    $list.innerHTML = ""
    json.map(item => {
        $list.innerHTML = $list.innerHTML + createListItem(item)
    })    
}

function createListItem(item) {
    return `
        <div class="card list-item">
            <div class="card-header" id="heading${item.id}">                
                <div class="row"> 
                <div class="col-sm-8">
                    <h2 class="mb-0">
                    <button class="btn btn-block text-left font-weight-bold" type="button" data-toggle="collapse" data-target="#collapse${item.id}" aria-expanded="true" aria-controls="collapse${item.id}">
                        ${item.title}
                    </button>
                    </h2>
                </div>                  
                <div class="col-sm-4 text-right">
                    <h5>
                        ${createListItemMirrors(item.mirrors)}
                    </h5>
                </div>                  
                </div>
            </div>
            ${createItemDetail(item.id, item.detail, item.source)}
        </div>
    `
}

function createItemDetail(id, detail, source) {
    return `
        <div id="collapse${id}" class="collapse" aria-labelledby="heading${id}" data-parent="#accordion">
            <div class="card-body">
                <div class="media">
                    <img alt="Imagem de capa" src="${detail.image}" class="rounded float-left align-self-center card-img mr-3">
                    <div class="media-body">
                        <div class="row">
                            <div class="col-sm-8">
                                <h5 class="mt-0 font-weight-bold">${detail.title}</h5>
                                <h6><a href="${detail.mal}" class="badge badge-secondary">My Anime List</a></h6>
                                <p class="text-justify">${detail.sinopse}</p>
                            </div>
                            <div class="col-sm-4">
                                <h5 class="mt-0 text-center">Site | Fansub | Origem</h5>
                                <div class="list-group">               
                                    ${createDetailSource(source)}
                                </div>
                            </div>
                        </div>      
                        ${createDetailExtra(detail.extra)}            
                    </div>
                </div>
            </div>
        </div>    
    `
}

function createDetailSource(source) {
    if (source.length == 0) return `<p class="text-center"> Nenhum conteúdo disponível </p>`

    return source.map(item => {
        return `
            <a href="${item.url}" class="btn btn-info btn-sm btn-block mt-2">${item.title}</a>
        `
    }).join("")
}

function createListItemMirrors(mirrors) {
    return mirrors.map(item => {
        return `
            <a href="${item.url}" class="badge badge-info">${item.description}</a>
        `
    }).join("")
}

function createDetailExtra(extra) {
    if (extra.length == 0) return ""

    const extraItem = extra.map(item => createDetailExtraItem(item)).join("")

    return `
        <div class="row">
            ${extraItem}
        </div>
    `
}

function createDetailExtraItem(item) {
    return `
        <div class="col-sm-${item.size || 2}">
            <div class="font-weight-bold">${item.key}:</div> ${item.value}
        </div>
    `
}