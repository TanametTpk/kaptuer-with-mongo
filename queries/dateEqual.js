module.exports = (query, field, value ) => {

    if (value.includes("$datee")){

        let keyVal = value.split("=")
        if (keyVal.length === 2 && keyVal[0] === "$datee"){

            let valQuery = keyVal[1]
            query[field] = new Date(valQuery)

        }

    }

}