
module.exports = (model, payload) => {

    const get = async (req) => {

        let target = await model.findManyAndPopulate(req.query , req._populate);
        return target;
        
    }

    return {
        service: {get},
        route:{
            path: "/",
            method: "get",
            middleware:["getQuery", "getterPopulate"],
        }
    }

}