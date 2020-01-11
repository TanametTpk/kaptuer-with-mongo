module.exports = (modelname, permisstion) => {

    const Model = require( "mongoose" ).model( modelname );

    let allVar = Object.keys(Model.schema.path)
    let modelPermission = {
        getable: allVar,
        updatable: allVar
    }

    if (permisstion){
        modelPermission = permisstion
    }

    const find = (query , populate) => {

        let result = Model.findOne(query)

        if (populate) result = result.populate(populate);
        return result

    }

    const findManyAndPopulate = (query , populate , skip , limit) => {

        if (!skip) skip = 0
        if (!limit) limit = 1000

        let result = Model.find(query , modelPermission.getable.join(",")).limit(limit).skip(skip * limit);

        if (populate) result = result.populate(populate);
        return result

    }

    const create = (data) => {

        const model = new Model(data);
        model.setPassword(data.password)

        return model.save();

    };

    const update = ( model, data ) => {

        const whiteList = modelPermission.updatable
        const currentModel = model;

        whiteList.map((key) => {

            if (data[key] === modelPermission.validateKey){
                currentModel.setPassword(data[key])
                return
            }

            if (data[key]) currentModel._doc[key] = data[key]

        })


        return currentModel.save();

    };

    const deleteObj = ( model ) => model.remove();
    const deleteObjMany = ( query ) => Model.deleteMany(query);

    const wrap = (model) => {

        if (model === null) return {};
        const whiteList = modelPermission.getable

        let wrappedModel = {}
        whiteList.map((key) => {
            wrappedModel[key] = model[key]
        })

        return wrappedModel

    }

    module.exports = {
        find,
        findManyAndPopulate,
        create,
        update,
        deleteObj,
        wrap,
        deleteObjMany
    };


}