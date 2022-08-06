const Integration = require('./integration-model')

const cache = []

const save = async (integration) => {
    return integration.save()
}

module.exports = {
    save
}