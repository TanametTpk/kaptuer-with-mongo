const CRUD = require('./CRUD')
const createModelLibs = require('./libs/model')
const getAll = require('require-all')
const connectDb = require('./libs/connectDb')
const mongoose = require('mongoose')

const configs = getAll({
    dirname: __dirname + "/configs",
})

module.exports = (models, dbConfigs, options) => {

    let services = {}
    let routes = {}
    connectDb(null, dbConfigs, options)

    models.map((modelObj) => {

        mongoose.model(modelObj.name, modelObj.model)
        let modelName = modelObj.name
        let permission = modelObj.permission
        
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
        configs,
        services,
        routes
    }

}