module.exports = (query, field, value ) => {

    if (value.includes("$in")){

        let keyVal = value.split("=")
        if (keyVal.length === 2 && keyVal[0] === "$in"){

            let valQuery = keyVal[1]
            query[field] = valQuery.split(",")

        }

    }

}