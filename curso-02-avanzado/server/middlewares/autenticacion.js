var jwt = require('jsonwebtoken');
var HttpStatus = require('http-status-codes');

var SEED = require('../config/config').SEED;

//Verificar token
exports.verificaToken = (req, res, next) => {
    var token = req.query.token;

    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                ok: false,
                mensaje: 'Token invalido',
                errors: err
            })
        }

        req.usuario = decoded.usuario;

        next();
    })

}