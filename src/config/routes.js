const healthcheck = require('./healthcheck')
const home = require('../home/home-controller')


const prefix = process.env.API_PREFIX + process.env.API_VERSION

module.exports = (app) => {
    console.info(`Registrando rotas...`)

    app.use(`${prefix}`, healthcheck)
    app.use(`${prefix}/home`, home)

    console.info(`Rotas registradas com sucesso...`)

    return app
}