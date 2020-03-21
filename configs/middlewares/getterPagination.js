// for import files

module.exports = function( req, res, next ) {

		try {

			req._page = parseInt(req.params.page) - 1;
			req._size = parseInt(req.query._size);

			if (!req._page) req._page = 0
			if (!req._size) req._size = 1000

			delete req.params.page;
			delete req.query._size

	    	return next();

		} catch (err){
			return res.preconditionFailed();
		}

};
