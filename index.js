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

    // connect mongodb
    connectDb(null, dbConfigs, options)

    // create all model
    models.map((modelObj) => {

        // change name to pluralize for correct REST API paths
        let modelName = pluralize.plural(modelObj.name)
        let permission = modelObj.permission

        // create mongoose model
        mongoose.model(modelName, modelObj.model)
        
        // create CRUD function and REST route with controller
        let model = createModelLibs(modelName, permission)
        crudModel = CRUD(model)

        // assign services for export
        services[modelName] = crudModel.services

        // check for auto create route
        if (options && options.autoRouting) {

            // assign controller name to routes
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

    // exports
    return {
        services,
        routes,
        middlewares:configs.middlewares
    }

}

module.exports = {
    connect
}