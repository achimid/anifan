const $list = document.querySelector("#accordion")

load()

function load() {

    if (window.ethereum) { fetch("/api/v1/home/wallet") }

    fetch("/api/v1/home")
        .then(res => res.json())
        .then(prepareData)
        .then(json => {
            $list.innerHTML = ""
            json.map(item => { $list.innerHTML = $list.innerHTML + createListItem(item)})    
        })
    
}

function prepareData(json) {
    return json.map(item => {
        if (!item.detail || !item.detail.title) {
            item.detail = {}
            
            fetch('/api/v1/detail', {
                method: 'POST',
                headers: {'Accept': 'application/json','Content-Type': 'application/json'},
                body: JSON.stringify({anime: item.anime})
            })
        }

        if (!item.detail.extra) item.detail.extra = []
        if (!item.detail.title) item.detail.title = 'Título'
        if (!item.detail.image) item.detail.image = '/img/bg.webp'
        if (!item.detail.synopsis) item.detail.synopsis = ''
        if (!item.detail.mal) item.detail.mal = ''
        if (!item.source || !item.source.length) {
            item.source = item.source.map(src => { 
                if (!src.url) src.url = '#'
                if (!src.url) src.title = 'Título'

                return src
            })
        }
        
        return item
    })
}

function createListItem(item) {
    return `
    <article>
        <div class="card list-item">
            <div class="card-header" id="heading${item.id}">                
                <div class="row"> 
                    <div class="col-md-12 col-lg-8">
                        <h2 class="mb-0">
                        <button class="btn btn-block text-left font-weight-bold" type="button" data-toggle="collapse" data-target="#collapse${item.id}" aria-expanded="true" aria-controls="collapse${item.id}">
                            ${item.title}
                        </button>
                        </h2>
                    </div>                  
                    <div class="col-md-12 col-lg-4 text-right">
                        <h5>
                        ${createListItemMirrors(item.mirrors)}
                        </h5>
                    </div>                  
                </div>
            </div>
            ${createItemDetail(item.id, item.detail, item.source)}
        </div>
    </article>
    `
}

function createItemDetail(id, detail, source) {
    return `
        <div id="collapse${id}" class="collapse" aria-labelledby="heading${id}" data-parent="#accordion">
            <div class="card-body">
                <div class="media">
                    <div class="d-none d-lg-block d-xl-block">
                        <img alt="Imagem de capa do anime: ${detail.title}" src="${detail.image}" class="rounded float-left align-self-center card-img mr-3">
                    </div>                    
                    <div class="media-body">
                        <div class="row">
                            <div class="col-md-12 col-lg-8">
                                <h5 class="mt-0 font-weight-bold">${detail.title}</h5>
                                <h6><a href="${detail.mal}" class="badge badge-secondary">My Anime List</a></h6>
                                <p class="text-justify line-clamp">${detail.synopsis}</p>
                            </div>
                            <div class="col-md-12 col-lg-4">
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
        <div class="col-md-6 col-lg-${item.size || 2}">
            <div class="font-weight-bold">${item.key}:</div> ${item.value}
        </div>
    `
}


// setInterval(() => { document.location.reload() }, 60000 * 3)