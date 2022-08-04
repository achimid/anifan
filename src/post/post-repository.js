const posts = []

const findAll = () => {
    return posts
}

const hasTitle = (title) => {
    return posts.filter(post => post.title == title).length > 0
}

const has = ({anime, episode}) => {
    return posts.filter(post => post.anime == anime && post.episode == episode)[0]
}

const create = async (post) => {
    posts.unshift(post)
}

const update = async (post) => {
    for (let i = 0; i < posts.length; i++) {
        const item = posts[i]

        if (post.id === item.id) {
            posts[i] = post
        }        
    }
}

module.exports = {
    create,
    findAll,
    hasTitle,
    has,
    update
}