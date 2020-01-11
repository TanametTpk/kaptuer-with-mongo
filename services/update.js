
module.exports = (model, payload) => {

    const update = async (req)=> {

        let target = await model.find({ _id : req._objectId });
        let updatedObj = await model.update(target , req.body);
        return await model.wrap( updatedObj )

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