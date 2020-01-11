
module.exports = (model, payload) => {

    const create = async (req)=> {

        return await model.create(req.body);

    };

    return {
        service: {create},
        route:{
            path: "/",
            method: "post",
            middlewares: [],
        }
    }

}