const Integration = require('./integration-model')

const { save } = require('./integration-repository')
const { processRelease } = require('../release/release-service')

const create = async (event) => {
    return Promise.resolve(new Integration(event))
        .then(save)
        .then(processRelease)
}

module.exports = {
    create
}