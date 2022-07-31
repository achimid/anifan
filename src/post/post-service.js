const repository = require("./post-repository")

const getPosts = () => {
    return repository.findAll()
}

const create = async (post) => {
    repository.save(post)
}

module.exports = {
    getPosts,
    create
}