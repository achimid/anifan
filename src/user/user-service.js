const UserModel = require('./user-model')

const userRepository = require('./user-repository')

const findById = async (id) => {
    return userRepository.findById(id)
}

const create = async (user) => {
    if (user.id) return user
    
    return userRepository.save(new UserModel(user))
}

module.exports = {
    create,
    findById
}