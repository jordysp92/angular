//Requires
var express = require('express');
var mongoose = require('mongoose');

var HttpStatus = require('http-status-codes');

//inicializar variables
var app = express();

//conexion a base datos
mongoose.connection.openUri('mongodb://localhost:27017/hospital', (err, res) => {
    if (err) throw err;
    console.log("Base datos iniciada: 27017");

})

//Rutas
app.get('/', (req, res, next) => {

    res.status(HttpStatus.OK).json({
        ok: true,
        mensaje: 'Peticion correcta'
    })
});

//Escuchar peticiones
app.listen(3000, () => {
    console.log("Server levantado en puerto: " + 3000);
})