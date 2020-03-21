module.exports = (modelname, permission) => {

    const Model = require( "mongoose" ).model( modelname );

    let allVar = Object.keys(Model.schema.paths)
    let modelPermission = {
        getable: allVar,
        updatable: allVar
    }

    if (permission){
        modelPermission = permission
    }

    const find = (query , populate) => {

        let result = Model.findOne(query)

        if (populate) result = result.populate(populate);
        return result

    }

    const findManyAndPopulate = (query , populate , skip , limit) => {

        if (!skip) skip = 0
        if (!limit) limit = 1000

        let result = Model.find(query , modelPermission.getable.join(" , ")).limit(limit).skip(skip * limit);

        if (populate) result = result.populate(populate);
        return result

    }

    const count = (query) => {

        return Model.countDocuments(query)

    }

    const create = (data) => {

        const model = new Model(data);
        return model.save();

    };

    const update = ( query, data ) => {

        const whiteList = modelPermission.updatable
        
        let updateData = whiteList.reduce((all, key) => {

            if (data[key]) return {
                ...all,
                [key]:data[key]
            }
            else return all

        },{})

        return Model.updateOne(query, updateData)

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

    return {
        find,
        findManyAndPopulate,
        create,
        update,
        deleteObj,
        wrap,
        deleteObjMany,
        count,
    };


}