
module.exports = (model, payload) => {

    const getSpecific = async (req)=> {

        let modelTarget = await model.find( {_id: req._objectId } , req._populate );
        modelTarget = await model.wrap( modelTarget );
        return modelTarget
    };

    return {
        service: {getSpecific},
        route:{
            priority: 1,
            path: "/:objectId",
            method: "get",
            middleware:["getterObjectId", "getterPopulate"],
        }
    },

}