
module.exports = (model, payload) => {

    const update = async (req)=> {

        let updatedObj = await model.update({ _id : req._objectId } , req.body);
        return updatedObj

    };

    return {
        service: {update},
        route:{
            path: "/:objectId",
            method: "put",
            middlewares: ["getterObjectId"],
        }
    }

}