const pool = require("../db");

function viewRecord(objeto,count,located) {
    let total = count/10>1?count/10:1;
    let next = total == located?total:located+1;
    

    result = {
        first:1,
        next:next,
        located:located,
        last:total,
        data:objeto.rows,
        
    }

	return result;
}

function origenData(body,origen){

    body['origen']=origen;
    return body;
}

module.exports = {
    viewRecord,
    origenData
};