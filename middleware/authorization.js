const jwt = require('jsonwebtoken');
const pool = require("../db");
//const queries = require("./queries");
//const bcrypt = require("bcrypt");
//const { password, rows } = require("pg/lib/defaults");
//const jwt = require("jsonwebtoken");
//const { jwtTokens } = require("../utils/jwt-helper");
//const router = require("./routes");
//const general = require("../utils/general")
const User = pool.user;


async function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']; //Bearrer Token
    const token = authHeader && authHeader.split(' ')[1];
    //console.log('AQUIII', token);
    if(token == null) return res.status(401).json({error: "null token"});

    const usr = await User.findOne({attributes: ['id'], where: { token_access: token } });
    if (usr === null){
        return res.status(401).json({error: "invalido token"});
    }

    req.user = usr
    next();


    /* jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if(error) return res.status(403).json({error:error.message});
        req.user = user;
        next();
    }) */
}

module.exports = {
    authenticateToken,
}