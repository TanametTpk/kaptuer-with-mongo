module.exports = (query, field, value ) => {

    if (value.includes("$reg")){

        let keyVal = value.split("=")
        if (keyVal.length === 2 && keyVal[0] === "$reg"){

            let valQuery = keyVal[1]
            let reg = new RegExp(valQuery)
            query[field] = reg

        }

    }

}