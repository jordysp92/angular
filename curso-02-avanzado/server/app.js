//Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//inicializar variables
var app = express();

//bodyparser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//importar rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');

//conexion a base datos
mongoose.connection.openUri('mongodb://localhost:27017/hospital', (err, res) => {
    if (err) throw err;
    console.log("Base datos iniciada: 27017");

})

//Rutas
app.use('/', appRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/login', loginRoutes);


//Escuchar peticiones
app.listen(3000, () => {
    console.log("Server levantado en puerto: " + 3000);
})