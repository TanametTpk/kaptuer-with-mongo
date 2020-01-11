const getAll = require('require-all')

const templateServices = getAll({
    dirname: __dirname + "/services",
})

module.exports = (model) => {

    let services = {}
    let routes = {}

    Object.values(templateServices).map((templateService) => {

        let { service, route } = templateService(model)
        services = {
            ...services,
            ...service
        }

        let serviceName = Object.keys(service)[0]

        routes = {
            ...routes,
            [serviceName]:{
                ...route,
                action:serviceName
            }
        }

    })

    return {
        services,
        routes
    }

}