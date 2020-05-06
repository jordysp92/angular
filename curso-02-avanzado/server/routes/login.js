var express = require('express');
var HttpStatus = require('http-status-codes');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;

var Usuario = require('../models/usuario');

var app = express();

app.post('/', (req, res) => {

    var body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok: false,
                mensaje: 'Error buscar usuario',
                errors: err
            })
        }

        if (!usuarioDB) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                ok: false,
                mensaje: 'Credenciales incorrectas -email',
                errors: err
            })

        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                ok: false,
                mensaje: 'Credenciales incorrectas -password',
                errors: err
            })

        }

        //Crear token aca
        var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14400 })

        usuarioDB = usuarioDB.toObject();
        delete usuarioDB.password;

        return res.status(HttpStatus.OK).json({
            ok: true,
            usuario: usuarioDB,
            token: token,
            id: usuarioDB._id
        })
    })

})

module.exports = app;