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

var userSchema = Schema({

    name : { type:String, required : true, lowercase : true, trim : true},
    password : { type:String},
	provider_id : { type:String },
	verify: {type:Boolean, default: false}

}, { timestamps: true })

userSchema.index({ email:1 , provider_type:1 } , {unique: true});

let models = [
    {
        model: customer,
        name: "customer"
    },
    {
        model: userSchema,
        name: "user",
        permission:{
            getable:["name","provider_type","verify"],
            updatable:["name"]
        }
    }
]

kaptuer.setup({
    ...kaptuerWithMongo.connect(models, dbConfig, {autoRouting:true, dbVerbose:true}),
    routes,
    services,
    port: <your port>
}).start()

```

# API

## REST route

- create
    - path /<db_name>
    - method POST
    - body
        - <your attributes>

- update
    - path /<db_name>/:objectId
    - method PUT
    - body
        - <your attributes>

- deleteOne
    - path /<db_name>/:objectId
    - method DELETE

- deleteMany
    - path /<db_name>
    - method DELETE
    - query
        - <kaptuer default query>

- getOne
    - path /<db_name>/:objectId
    - method GET
    - query
        - _populate

- getMany
    - path /<db_name>
    - method GET
    - query
        - <kaptuer default query>
        - _populate

- getPagination
    - path /<db_name>/pages/:page
    - method GET
    - params
        - page: INT start with 0
    - query
        - <kaptuer default query>
        - _populate
        - _size

## Query (kaptuer default query)

- between
    - search number between 2 number
    - usage /?<target_field>=$bt=<min_number>,<max_number>
    - example1 find age between 15 and 22 /?age=$bt=15,22
    - example2 find age more than 15 /?age=$bt=15,
    - example3 find age less than 22 /?age=$bt=,22

- date between
    - search date between 2 date
    - usage /?<target_field>=$date=<start_date>,<end_date>
    - start_date and end_date can be everything that can use with -> new Date(<start_date>)

- date equal
    - search date that equal to query
    - usage /?<target_field>=$datee=<start_date>
    - start_date and end_date can be everything that can use with -> new Date(<start_date>)

- date between milisec
    - search date like date between but in milisec
    - usage /?<target_field>=$date=<start_date>,<end_date>
    - start_date and end_date is unix timestamp as milisec

- in
    - search by multiple value
    - usage /?<target_field>=$in=<values seperate with ,>
    - example find rein, ayaka /name=$in=rein,ayaka

- regular
    - search by regular
    - usage /?<target_field>=<reg>
    - example find name with /ab+c/ /?name=$reg=ab+c
    - reg can be anything with new RegExp(reg)