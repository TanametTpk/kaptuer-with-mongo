module.exports = (model) => {

    const get = async (req) => {

        let target = await model.findManyAndPopulate(req.query , req._populate);
        return target;
        
    };

    const getPagination = async (req)=> {

        return await model.findManyAndPopulate(req.query , req._populate , req._page , req._size );

    };

    const getSpecific = async (req)=> {

        let modelTarget = await model.find( {_id: req._objectId } , req._populate );
        modelTarget = await model.wrap( modelTarget );
        return modelTarget
    };

    const create = async (req)=> {

        return await model.create(req.body);

    };

    const update = async (req)=> {

        let target = await model.find({ _id : req._objectId });
        let updatedObj = await model.update(target , req.body);
        return await model.wrap( updatedObj )

    };

    const del = async (req)=> {

        let target = await model.find({ _id : req._objectId });
        let deletedObj = await model.deleteObj(target);
        return model.wrap( deletedObj );

    };

    const delMany = async (req)=> {

        return await model.deleteObjMany(req.query)

    };

    return {
        get,
        getPagination,
        getSpecific,
        create,
        update,
        del,
        delMany
    }

}