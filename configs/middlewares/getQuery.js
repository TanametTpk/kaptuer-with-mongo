// for import files
const getAll = require('require-all')

let queryMiddlewares = getAll({
    dirname: __dirname + "/../../queries",
})

module.exports = function( req, res, next ) {

    let {query} = req

    Object.keys(query).map((field) => {

        let value = query[field]

        Object.values(queryMiddlewares).map((middleware) => {

            middleware(query, field, value, {req, res, next})

        })

    })

    return next();

};
