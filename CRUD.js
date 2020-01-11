const templateServices = getAll({
    dirname: __dirname + "/services",
})

module.exports = (model) => {

    let services = {}
    let routes = {}

    templateServices.map((templateService) => {

        let { service, route } = templateService(model)
        services = {
            ...services,
            ...service
        }

        routes = {
            ...routes,
            [Math.random()]:route
        }

    })

    return {
        services,
        routes
    }

}