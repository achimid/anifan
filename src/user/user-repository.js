const UserModel = require('./user-model')

const cache = {}

const findById = async (id) => {
    const userCache = cache[id]
    if (userCache) return userCache

    const user = await UserModel.findById(id)

    cache[id] = user
    setTimeout(() => { delete cache[id] }, 60000 * 5) // Cache em memória de 5 minutos

    return user
}

const save = async (user) => {
    return user.save()
}

module.exports = {
    findById,
    save
}