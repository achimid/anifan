const healthcheck = require('./healthcheck')
const index = require('../index/index-controller')


const prefix = process.env.API_PREFIX + process.env.API_VERSION

module.exports = (app) => {
    console.info(`Registrando rotas...`)

    app.use(`${prefix}`, healthcheck)
    app.use(`${prefix}/index`, index)

    console.info(`Rotas registradas com sucesso...`)

    return app
}