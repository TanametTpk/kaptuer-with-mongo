
module.exports = (model, payload) => {

    const count = async (req)=> {

        return await model.count(req.query)

    };

    return {
        service: {count},
        route:{
            priority: 1,
            path: "/count",
            method: "get",
            middlewares:["getQuery"],
        }
    }

}