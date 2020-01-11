const CRUD = require('./services/CRUD')
const createModelLibs = require('./libs/model')
const getAll = require('require-all')

const configs = getAll({
    dirname: __dirname + "/configs",
})

module.exports = (models) => {

    let names = Object.keys(models)
    let services = {}

    names.map((name) => {

        let mongooseLibs = models[name]
        let modelName = mongooseLibs.model.collection.collectionName
        let permisstion = mongooseLibs.permisstion
        let model = createModelLibs(modelName, permisstion)
        services[name] = CRUD(model)

    })

    return {
        configs,
        services
    }

}