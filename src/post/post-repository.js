const posts = []

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