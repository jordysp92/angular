var express = require('express');
var HttpStatus = require('http-status-codes');

var mdAuth = require('../middlewares/autenticacion');


var Medico = require('../models/medico');


var app = express();

//Obtener todos los medicos
app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Medico.find({})
        .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre email')
        .populate('hospital')
        .exec((err, medicos) => {
            if (err) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    ok: false,
                    mensaje: 'Error al obtener medicos',
                    error: err
                })
            }
            Medico.count({}, (err, conteo) => {
                return res.status(HttpStatus.OK).json({
                    ok: true,
                    total: conteo,
                    medicos
                })

            })
        })

});

//Obtener medico
app.get('/:id', (req, res)=>{
    var id = req.params.id;

    Medico.findById( id )
        .populate( 'usuario', 'nombre email img')
        .populate( 'hospital')
        .exec( (err, medico) =>{
            if (err) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    ok: false,
                    mensaje: 'Error al buscar medico',
                    error: err
                })
            }
            if (!medico) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    ok: false,
                    mensaje: 'El medico de id ' + id + ' no existe',
                    errors: {
                        message: 'No existe un medico con ese id'
                    }
                })
    
            }

            return res.status(HttpStatus.OK).json({
                ok: true,
                medico
            })


        })

})


//Actualizar medico
app.put('/:id', mdAuth.verificaToken, (req, res) => {
    var id = req.params.id;

    var body = req.body;


    Medico.findById(id, (err, medico) => {
        if (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok: false,
                mensaje: 'Error al buscar medico',
                error: err
            })
        }
        if (!medico) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                ok: false,
                mensaje: 'El medico de id ' + id + ' no existe',
                errors: {
                    message: 'No existe un medico con ese id'
                }
            })

        }

        medico.nombre = body.nombre;
        medico.usuario = req.usuario._id;
        medico.hospital = body.hospital;


        medico.save((err, medicoGuardado) => {
            if (err) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    ok: false,
                    mensaje: 'Error al actualizar medico',
                    error: err
                })
            }


            return res.status(HttpStatus.OK).json({
                ok: true,
                medico: medicoGuardado
            })
        })


    })


})

//Crear nuevo medico
app.post('/', mdAuth.verificaToken, (req, res) => {

    var body = req.body;

    var medico = new Medico({
        nombre: body.nombre,
        usuario: req.usuario._id,
        hospital: body.hospital

    })

    medico.save((err, medicoGuardado) => {
        if (err) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                ok: false,
                mensaje: 'Error al crear medico',
                error: err
            })
        }
        return res.status(HttpStatus.CREATED).json({
            ok: true,
            medico: medicoGuardado
        })
    })


})

//Borrar usuario
app.delete('/:id', mdAuth.verificaToken, (req, res) => {
    var id = req.params.id;

    Medico.findByIdAndRemove(id, (err, medicoBorrado) => {
        if (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok: false,
                mensaje: 'Error al borrar medico',
                error: err
            })
        }
        if (!medicoBorrado) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                ok: false,
                mensaje: 'No existe medico con ese id',
                error: { message: 'No existe medico con ese id' }
            })
        }

        return res.status(HttpStatus.OK).json({
            ok: true,
            medicoBorrado
        })
    })
})

module.exports = app;