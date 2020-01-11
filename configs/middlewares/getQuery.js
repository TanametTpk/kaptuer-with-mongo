const getAll = require('require-all')

const middlewares = getAll({
    dirname: __dirname + "/../../queries",
})

module.exports = ( req, res, next ) => {

    let {query} = req

    Object.keys(query).map((field) => {

        let value = query[field]

        middlewares.map((middleware) => {

            middleware(query, field, value, {req, res, next})

        })

    })

    return next();

};
