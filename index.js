const CRUD = require('./services/CRUD')
const createModelLibs = require('./libs/model')
const getAll = require('require-all')
const connectDb = require('./libs/connectDb')
const mongoose = require('mongoose')

const configs = getAll({
    dirname: __dirname + "/configs",
})

module.exports = (models, dbConfigs) => {

    let services = {}
    connectDb(null, dbConfigs)

    models.map((modelObj) => {

        mongoose.model(modelObj.name, modelObj.model)
        let modelName = modelObj.name
        let permission = modelObj.permission
        
        let model = createModelLibs(modelName, permission)
        services[modelName] = CRUD(model)

    })

    return {
        configs,
        services
    }

}