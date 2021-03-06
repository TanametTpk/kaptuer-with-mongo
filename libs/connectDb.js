const mongoose = require( "mongoose" );

let connectWithRetry = function(uri, option) {
  return mongoose.connect(uri ,{ useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true } , (err) => {

    if (err) {

      console.error('Failed to connect to mongo on startup - retrying in 1 sec', err.message);

      setTimeout(() => {
        connectWithRetry(uri)
      }, 1000);

    }else{
      if (option && option.dbVerbose) console.log("connected");
    }

  })
};

module.exports = function(app, config, option) {

    // assign uri
    let db_auth = (config.username + config.password).length === 0 ? "" : config.username + ":" + config.password + "@";
    let uri =  config.rewrite ? config.rewrite : (config.protocol + "://" + db_auth + config.hostname + "/" + config.database_name);
    
    connectWithRetry(uri, option)
    mongoose.Promise = global.Promise;

	// if ( app ) app.set( "mongoose", mongoose );

}
