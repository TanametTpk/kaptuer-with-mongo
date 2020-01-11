module.exports = (query, field, value ) => {

    if (value.includes("$date")){

        let keyVal = value.split("=")
        if (keyVal.length === 2 && keyVal[0] === "$date"){

            let valQuery = keyVal[1]
            let qtAndlt = valQuery.split(",")

            let result = {}
            if (qtAndlt[0]) result["$gt"] = new Date(qtAndlt[0])
            if (qtAndlt[1]) result["$lt"] = new Date(qtAndlt[1]) 

            query[field] = result

            if (Object.keys(result).length < 1) delete query[field]

        }

    }

}