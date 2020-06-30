var express = require('express');
var HttpStatus = require('http-status-codes');


var app = express();

const path = require('path');
const fs = require('fs');

//Rutas
app.get('/:tipo/:img', (req, res, next) => {

    var tipo = req.params.tipo;
    var img = req.params.img;

    var pathImagen = path.resolve( __dirname, `../uploads/${tipo}/${ img}` )

    if(fs.existsSync(pathImagen)){
        return res.sendFile( pathImagen );
    }else{
        var pathNoImage = path.resolve( __dirname, '../assets/no-img.jpg');
        return res.sendFile( pathNoImage );

    }

});

module.exports = app;