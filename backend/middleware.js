let jwt = require('jsonwebtoken');
const config = require('./config.js');

let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'] || req.body['authorization']; // Express headers are auto converted to lowercase


    if (!token) {
        return res.json({
            statusC: 401,
            success: false,
            message: 'Auth token is not supplied'
        });
    } else {
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }

        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.json({
                    statusC: 401,
                    success: false,
                    message: err.message
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    }
};

module.exports = {
    checkToken: checkToken
}