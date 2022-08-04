const repository = require("./post-repository")

const pushService = require('../push/push-service')

const animeSubscribers = []
const animeNotified = []

const notifyAnime = (post) => {
    const subscriberToNotify = animeSubscribers
        .filter(s => s.anime == post.anime)
        .filter(s => animeNotified.filter(n => n.userId == s.userId && s.anime == n.anime && post.episode == n.episode).length == 0)

    subscriberToNotify.map(sub => {
        pushService.sendReleasePush(sub.userId, post.title)
        animeNotified.push(post)
    })
}

const subscribeAnime = (userId, anime) => {
    animeSubscribers.push({anime, userId})
}

const getPosts = () => {
    return repository.findAll()
}

const findById = (id) => {
    return repository.findAll().filter(post => post.id == id)[0]
}

const hasTitle = repository.hasTitle

const has = repository.has

const createFromData = async (data) => {

    const hasPost = has(data)

    if (!hasPost) {
        notifyAnime(data)
        return createNewPost(data)
    }

    updatePost(hasPost, data)
}

const updatePost = async (oldPost, newPost) => {

    const source = oldPost.source
    const hasSource = source.filter(s => s.title == newPost.from).length > 0

    if (!hasSource) {
        oldPost.source.push({
            title: newPost.from,
            url: newPost.url
        })
    } else {
        console.log("Post com o Anime e Episódio já cadastrado, ignorado. ", newPost.anime, newPost.episode)
    }

    repository.update(oldPost)
}

const createNewPost = async (data) => {
    const post = {
        id: Math.floor(Math.random() * 100000),
        anime: data.anime,
        title: data.title,
        episode: data.episode,
        mirrors: data.mirrors,
        source: data.source || [{
            title: data.from,
            url: data.url
        }]
    }

    repository.create(post)
}


module.exports = {
    getPosts,
    createFromData,
    hasTitle,
    has,
    findById,
    subscribeAnime
}