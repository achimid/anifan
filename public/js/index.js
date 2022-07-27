const $list = document.querySelector("#accordion")

load()

function load() {
    if (ethereum) ethereum.request({ method: 'eth_requestAccounts' })

    fetch("/api/v1/index")
        .then(res => res.json())
        .then(json => {
            $list.innerHTML = ""
            json.map(item => { $list.innerHTML = $list.innerHTML + createListItem(item)})    
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

setInterval(() => { document.location.reload() }, 60000)