const CRUD = require('./CRUD')
const createModelLibs = require('./libs/model')
const getAll = require('require-all')
const connectDb = require('./libs/connectDb')
const mongoose = require('mongoose')
const pluralize = require('pluralize')

const configs = getAll({
    dirname: __dirname + "/configs",
})

const connect = (models, dbConfigs, options) => {

    let services = {}
    let routes = {}
    connectDb(null, dbConfigs, options)

    models.map((modelObj) => {

        let modelName = pluralize.plural(modelObj.name)
        let permission = modelObj.permission

        mongoose.model(modelName, modelObj.model)
        
        let model = createModelLibs(modelName, permission)
        crudModel = CRUD(model)

        services[modelName] = crudModel.services

        if (options && options.autoRouting) {

            let routesKey = Object.keys(crudModel.routes)
            routes[modelName] =  routesKey.reduce((allRoutes, rkey) => {

                return {
                    ...allRoutes,
                    [rkey]:{
                        ...crudModel.routes[rkey],
                        controller:modelName
                    }
                }

            }, {})

        }

    })

    return {
        services,
        routes,
        middlewares:configs.middlewares
    }

}

module.exports = {
    connect
}