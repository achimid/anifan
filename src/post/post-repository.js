const posts = []

const findAll = () => {
    return posts
}

const hasTitle = (title) => {
    return posts.filter(post => post.title == title).length > 0
}

const save = async (post) => {
    posts.unshift(post)
}

module.exports = {
    save,
    findAll,
    hasTitle
}