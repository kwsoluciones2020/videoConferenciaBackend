const jwt = require('jsonwebtoken');

function jwtTokens({id, username}) {
    const user = {id, username};
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'30m'});
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn:'35m'});
    return ({accessToken: accessToken,refreshToken: refreshToken});

}


module.exports = {
    jwtTokens,
}