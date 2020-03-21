
module.exports = (model, payload) => {

    const count = async (req)=> {

        let count = await model.count(req.query)

        return {
            count
        }

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