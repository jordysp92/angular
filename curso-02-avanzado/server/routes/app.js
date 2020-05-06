var express = require('express');
var HttpStatus = require('http-status-codes');


var app = express();

//Rutas
app.get('/', (req, res, next) => {

    res.status(HttpStatus.OK).json({
        ok: true,
        mensaje: 'Peticion correcta'
    })
});

module.exports = app;