# What is this?

This package work with kaptuer for connect with mongo and help you implement controller faster.

# Installation

`npm i --save kaptuer-with-mongo`

then import

```
const kaptuer = require('kaptuer-open-api')
const kaptuerWithMongo = require('kaptuer-with-mongo')

const dbConfig = {

    protocol: process.env.USE_SRV ? "mongodb+srv" : "mongodb",
  
    hostname: process.env.DB_HOST_PORT_27017_TCP_ADDR || "localhost",
  
    port: process.env.DB_HOST_PORT_27017_TCP_PORT || "27017",
  
    database_name: process.env.DB_NAME || "test",
  
    username: process.env.DB_USER || "",
  
    password: process.env.DB_PASSWORD || "",
  
    rewrite: process.env.DB_REWRITE
  
}

var customer = {

	email : { type:String, required : true},
	password : { type:String, required : true},
	name : { type:String, required : true, trim : true},
	birth : { type:Date},
	hobby : { type:String},
	price : { type:Number},
	created_at : { type:Date , default :Date.now},

}

let models = [
    {
        model: customer,
        name: "customer"
    }
]

kaptuer.setup({
    ...kaptuerWithMongo(models, dbConfig, {autoRouting:true, dbVerbose:true}))
    routes,
    services,
    port: <your port>
}).start()

```