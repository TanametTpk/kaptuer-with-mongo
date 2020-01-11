
module.exports = (model, payload) => {

    const getPagination = async (req)=> {

        return await model.findManyAndPopulate(req.query , req._populate , req._page , req._size );

    };

    return {
        service: {getPagination},
        route:{
            path: "/pages/:page",
            priority: 1,
            method: "get",
            middleware:["getterPagination", "getterPopulate"],
        }
    }

}