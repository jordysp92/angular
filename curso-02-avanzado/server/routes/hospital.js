var express = require('express');
var HttpStatus = require('http-status-codes');

var mdAuth = require('../middlewares/autenticacion');


var Hospital = require('../models/hospital');


var app = express();

//Obtener todos los hospitales
app.get('/', (req, res, next) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);

    Hospital.find({})
        .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre email')
        .exec((err, hospitales) => {
            if (err) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    ok: false,
                    mensaje: 'Error al obtener hospitales',
                    error: err
                })
            }
            Hospital.count({}, (err, conteo) => {
                return res.status(HttpStatus.OK).json({
                    ok: true,
                    total: conteo,
                    hospitales
                })

            })
        })

});


//Actualizar hospital
app.put('/:id', mdAuth.verificaToken, (req, res) => {
    var id = req.params.id;

    var body = req.body;


    Hospital.findById(id, (err, hospital) => {
        if (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok: false,
                mensaje: 'Error al buscar hospital',
                error: err
            })
        }
        if (!hospital) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                ok: false,
                mensaje: 'El hospital de id ' + id + ' no existe',
                errors: {
                    message: 'No existe un hospital con ese id'
                }
            })

        }

        hospital.nombre = body.nombre;
        hospital.usuario = req.usuario._id;


        hospital.save((err, hospitalGuardado) => {
            if (err) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    ok: false,
                    mensaje: 'Error al actualizar hospital',
                    error: err
                })
            }


            return res.status(HttpStatus.OK).json({
                ok: true,
                hospitalGuardado
            })
        })


    })


})

//Crear nuevo hospital
app.post('/', mdAuth.verificaToken, (req, res) => {

    var body = req.body;

    var hospital = new Hospital({
        nombre: body.nombre,
        usuario: req.usuario._id

    })

    hospital.save((err, hospitalGuardado) => {
        if (err) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                ok: false,
                mensaje: 'Error al crear hospital',
                error: err
            })
        }
        return res.status(HttpStatus.CREATED).json({
            ok: true,
            hospital: hospitalGuardado
        })
    })


})

//Borrar usuario
app.delete('/:id', mdAuth.verificaToken, (req, res) => {
    var id = req.params.id;

    Hospital.findByIdAndRemove(id, (err, hospitalBorrado) => {
        if (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok: false,
                mensaje: 'Error al borrar hospital',
                error: err
            })
        }
        if (!hospitalBorrado) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                ok: false,
                mensaje: 'No existe hospital con ese id',
                error: { message: 'No existe hospital con ese id' }
            })
        }

        return res.status(HttpStatus.OK).json({
            ok: true,
            hospitalBorrado
        })
    })
})

module.exports = app;