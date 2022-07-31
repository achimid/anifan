const repository = require("./post-repository")

const getPosts = () => {
    return repository.findAll()
}

const createFromData = async (data) => {
    const post = {
        id: Math.floor(Math.random() * 100000),
        anime: data.anime,
        title: data.title,
        mirrors: data.mirrors,
        source: [{
            title: data.from,
            url: data.url
        }]
    }

    repository.save(post)
}


module.exports = {
    getPosts,
    createFromData
}