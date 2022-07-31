const posts = require("./posts-example.json")

const findAll = () => {
    return posts
}

const save = async (post) => {
    posts.unshift(post)
}

module.exports = {
    save,
    findAll
}